const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const User = new Schema({
    email:{
        type: String,
        unique: true,   
        required: true  
    },
    password:{
        type: String,
        required: true  
    },
    username:{
        type: String,
        unique: true,   
        required: true  
    }

})

const userModel = mongoose.model("user",User)

module.exports = {
    userModel: userModel
};
