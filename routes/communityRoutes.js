const communityRouter = require("express").Router();
const { getAllCommunities, createCommunity } = require("../controllers/communityController");
const { isAdmin, isAuth } = require("../utils");
const expressAsyncHandler = require("express-async-handler");


communityRouter.post("/", isAuth, expressAsyncHandler(getAllCommunities));

communityRouter.post("/create", isAuth, isAdmin, expressAsyncHandler(createCommunity));


module.exports = communityRouter;