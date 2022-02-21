const communityRouter = require("express").Router();
const { getCommunityPosts, createACommunityPost, getSingleCommunityPost, deleteACommunityPost, editACommunityPost} = require("../controllers/communityController");
const { isAdmin, isAuth } = require("../utils.js");
const expressAsyncHandler = require("express-async-handler");


communityRouter.get("/", expressAsyncHandler(getCommunityPosts)); //i.e get the posts for politics alone

communityRouter.get("/:id", expressAsyncHandler(getSingleCommunityPost));

communityRouter.post("/create-post", isAuth, isAdmin, expressAsyncHandler(createACommunityPost));

communityRouter.delete("/delete-post", isAuth, isAdmin, expressAsyncHandler(deleteACommunityPost));

communityRouter.put("/edit-post", isAuth, isAdmin, expressAsyncHandler(editACommunityPost));


module.exports = communityRouter;