const communityRouter = require("express").Router();
const { CommunityCommentLike, CommunityCommentShare, getAllComments, postAComment, getCommunityPosts, createACommunityPost, getSingleCommunityPost, deleteACommunityPost, editACommunityPost} = require("../controllers/communityController");
const { isAdmin, isAuth } = require("../utils.js");
const expressAsyncHandler = require("express-async-handler");


communityRouter.get("/", expressAsyncHandler(getCommunityPosts)); //i.e get the posts for politics alone

communityRouter.get("/:id", expressAsyncHandler(getSingleCommunityPost));

communityRouter.post("/create-post", expressAsyncHandler(createACommunityPost));

communityRouter.delete("/delete-post", isAuth, isAdmin, expressAsyncHandler(deleteACommunityPost));

communityRouter.put("/edit-post", isAuth, isAdmin, expressAsyncHandler(editACommunityPost));

communityRouter.post("/:id/comments/:commentId", expressAsyncHandler(postAComment));

communityRouter.get("/:id/comments", expressAsyncHandler(getAllComments));

communityRouter.post("/:id/comments/shares", expressAsyncHandler(CommunityCommentShare));

communityRouter.post("/:id/comments/likes", expressAsyncHandler(CommunityCommentLike));


module.exports = communityRouter;