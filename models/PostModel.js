const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique:true,
    },
    description:{
        type: String,
        required:true
    },
    picture:{
        type:String,
        required:false
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    community:{
        type: String,
        required:true,
    },

}, {timestamps: true});

module.exports = mongoose.model("Post", postSchema);