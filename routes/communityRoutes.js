const communityRouter = require("express").Router();
const { pinCommunityPostToDashboard, deleteAComment, likeCommunityPost, CommunityCommentLike, CommunityCommentShare, getAllComments, postAComment, getCommunityPosts, createACommunityPost, getSingleCommunityPost, deleteACommunityPost, editACommunityPost} = require("../controllers/communityController");
const { isAdmin, isAuth } = require("../utils.js");
const expressAsyncHandler = require("express-async-handler");


communityRouter.get("/", expressAsyncHandler(getCommunityPosts)); //i.e get the posts for politics alone

communityRouter.get("/:id", expressAsyncHandler(getSingleCommunityPost));

communityRouter.put("/:id", expressAsyncHandler(likeCommunityPost));

communityRouter.delete("/:id/delete-post",  expressAsyncHandler(deleteACommunityPost));

communityRouter.post("/create-post", expressAsyncHandler(createACommunityPost));

communityRouter.put("/:id/edit-post", isAuth, isAdmin, expressAsyncHandler(editACommunityPost));

communityRouter.put("/:postId/pin", expressAsyncHandler(pinCommunityPostToDashboard));

communityRouter.delete("/:id/comments/delete", expressAsyncHandler(deleteAComment));

communityRouter.post("/:id/comments/:commentId", expressAsyncHandler(postAComment));

communityRouter.get("/:id/comments", expressAsyncHandler(getAllComments));

communityRouter.put("/:id/comments/shares", expressAsyncHandler(CommunityCommentShare));

communityRouter.put("/:id/comments/likes", expressAsyncHandler(CommunityCommentLike));

module.exports = communityRouter;