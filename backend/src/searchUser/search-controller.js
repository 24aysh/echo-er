const {room} = require('../room-chat/db/db-rooms'); 
const { userModel } = require('../login/db/dbUsers');
const mongoose = require("mongoose");
require('dotenv').config();

const MONGOOSE_URL = process.env.MONGOOSE_URL;
mongoose.connect(MONGOOSE_URL)

exports.findUser = async (req, res) => {
    try {
    
        const {username} =  req.query
       
        const response = await userModel.find({
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.addUser = async (req, res) => {
  try {
    const username = req.body.username;
    const newRoomName = req.body.newRoomName;
    const otherPerson = req.body.to;

    if (!username || !newRoomName) {
      return res.status(400).json({ error: "Missing username or newRoomName" });
    }

    const timeStamp = String(Date.now()) + otherPerson;
    const update = {
      [`rooms.${newRoomName}`]: {
        [timeStamp]: `This is your new chat with ${otherPerson}` ,
      },
    };

    const response = await room.updateOne(
      {
        username: username,
        [`rooms.${newRoomName}`]: { $exists: false } 
      },
      {
        $set: update
      }
    );

    if (response.modifiedCount === 0) {
      return res.status(409).json({ error: "Room already exists or user not found" });
    }

    return res.status(200).json({ message: "Room added successfully" });
  } catch (e) {
    console.error("Error adding room:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
