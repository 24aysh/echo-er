const {room} = require('../room-chat/db/db-rooms'); 

const mongoose = require("mongoose");

require('dotenv').config();

const MONGOOSE_URL = process.env.MONGOOSE_URL;
mongoose.connect(MONGOOSE_URL);

exports.loadMessage = async (req,res) => {
  try{
    const {username,to} =  req.query;
    const roomName = [username,to].sort().join("#");  
    const response = await room.findOne({ username: username }, { [`rooms.${roomName}`]: 1 });
  
    if(response){
      res.status(200).json(response.rooms);
    }
    else{
      res.status(403).json({
        message:"Nothing to show"
      })
    }
  }catch(e){
    res.status(500).json({
      error:"Internal Server Error"
    })
  }
}
exports.updateMessage = async (req, res) => {
  try {
    const {fromUser,username,timeStamp,to,message} = req.body;
   
    const RoomName = [fromUser, to].sort().join('#'); 

    const index =  timeStamp.toString() +fromUser;
   
  
    const update = {
      [`rooms.${RoomName}.${index}`]: message,  
    };
    const response = await room.updateOne(
      { username: username },
      { $set: update }
    );
    if (response.modifiedCount === 0) {
      return res.status(404).json({ success: false, error: "Message not updated" });
    }
    return res.status(200).json({ success: true, message: "Success" });
  } catch (e) {
  ;
    res.status(500).json({ error: "Internal Server Error" });
  }
};


