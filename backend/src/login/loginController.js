const {userModel} = require('./db/dbUsers');
const {room} = require('../room-chat/db/db-rooms')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {z} = require("zod")
const {mongoose} = require("mongoose");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGOOSE_URL = process.env.MONGOOSE_URL;

mongoose.connect(MONGOOSE_URL)
exports.signUp = async (req, res) => {
    try {
        
        const requiredBody = z.object({
                email:z.string().email(),
                username:z.string().min(5).max(20),
                password:z.string().min(10)
            })
        const parseData = requiredBody.safeParse(req.body)
        if(!parseData.success){
            res.status(403).json({
                error:parseData.error.issues.map(issue => issue.message)
            })
            return
        }
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            let error = "";

            if (existingUser.username == username) error+="Username used hai bhai\n";
            if (existingUser.email == email) error+="Email bhi usedhaibhai";

            return res.status(409).json({ Existing:error });
        }
        try{
            const hashPass  = await bcrypt.hash(password,5)
            await userModel.create({
                email:email,
                password:hashPass,
                username:username
            })
            await room.create({
                username:username,
                rooms:{}
            })
            res.status(200).json({
                Success:"Account created"
            })
        }
        catch(e){
            return
    
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.signIn = async (req, res) => {
    try {
        const email = req.body.email;
        const username =  req.body.username
        const password = req.body.password;
        const response = await userModel.findOne({
            email:email,
            username:username
        })
        if(!response){
            res.status(403).json({
                error:"Invalid user or email"
            })
            return ;  
        }
        const found = await bcrypt.compare(password,response.password);
        if(found){
            const token = jwt.sign({
                id:response._id.toString()
            },JWT_SECRET)
            res.status(200).json({
                token:token
            })
        }else{
            res.status(403).json({
                error:"Invalid Password"
            })
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};