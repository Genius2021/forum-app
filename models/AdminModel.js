const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    profilePic:{
        type: String,
        default: ""
    },
    isAdmin:{
        type: Boolean,
        default: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: false,
    },
    community:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: false,
    }
}, {timestamps: true});

module.exports = mongoose.model("Admin", adminSchema);