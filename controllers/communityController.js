const CommunityModel = require("../models/CommunityModel");



const createCommunity = async (req, res) =>{
    const newCategory = new CommunityModel(req.body);
    try{
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory)
    }catch(error){
        res.status(500).json(err)
    }
}

const getAllCommunities = async (req, res) =>{
    const community = req.query.community;
    try{
        if(community){
            const AllCommunities = await CommunityModel.find({ community }).populate("username")
            res.status(200).json(AllCommunities)
       }

    }catch(error){
        res.status(500).json(err)
    }
}


module.exports ={
    getAllCommunities,
    createCommunity,
}