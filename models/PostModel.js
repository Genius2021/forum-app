const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required:true,
    },
    actions:[{
        likes: {type: Number, required: false, default: 0},
        isShared: {type: Boolean, required: false, default: false},
        views: { type: Number, required: false, default: 0},
        isPinnedToDashboard:{ type: Boolean, required: false, default: false}
    }],

}, {timestamps: true});

module.exports = mongoose.model("Post", postSchema);