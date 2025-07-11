const {room} = require('../room-chat/db/db-rooms')
const bcrypt = require("bcrypt")
const {mongoose} = require("mongoose");
require('dotenv').config();

const MONGOOSE_URL = process.env.MONGOOSE_URL;
mongoose.connect(MONGOOSE_URL)

exports.home = async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        try{
            const hashPass  = await bcrypt.hash(password,5)
            await userModel.create({
                email:email,
                password:hashPass,
                username:username
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

