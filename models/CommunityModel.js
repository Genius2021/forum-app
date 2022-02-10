const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Community", communitySchema);