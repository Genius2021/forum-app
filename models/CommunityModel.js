const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    // creator:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Admin",
    //     required:true,
    // }
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Community", communitySchema);