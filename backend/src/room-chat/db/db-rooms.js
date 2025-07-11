const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const Room = new Schema({
    username:{
        type: String,
        unique: true,   
        required: true  
    },
    rooms: {
        type: Map,
        of: Schema.Types.Mixed,
        required: true
    }
})
const room = mongoose.model("room",Room)
module.exports = {
    room
};
