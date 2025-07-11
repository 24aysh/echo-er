const {room} = require('./db/db-rooms');

const mongoose = require("mongoose");
require('dotenv').config();

const MONGOOSE_URL = process.env.MONGOOSE_URL;
mongoose.connect(MONGOOSE_URL)

exports.getRoom = async (req, res) => {
    try {
    
        const {username} =  req.query
       
        const response = await room.find({
            username:username
        })
        if(!response){
            res.status(403).json({
                error:"Username not found"
            })
            return ;  
        }
        res.status(200).json(response)
       
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};