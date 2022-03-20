const communityRouter = require("express").Router();
const { CommunityAllCommentsFollow, CommunityCommentFollow, pinCommunityPostToDashboard, deleteAComment, likeCommunityPost, CommunityCommentLike, CommunityCommentShare, getAllComments, postAComment, getCommunityPosts, createACommunityPost, getSingleCommunityPost, deleteACommunityPost, editACommunityPost} = require("../controllers/communityController");
const { isAdmin, isAuth } = require("../utils.js");
const expressAsyncHandler = require("express-async-handler");


communityRouter.get("/", expressAsyncHandler(getCommunityPosts)); //i.e get the posts for politics alone

communityRouter.get("/:postId", expressAsyncHandler(getSingleCommunityPost));

communityRouter.put("/:postId/like", expressAsyncHandler(likeCommunityPost));

communityRouter.delete("/:postId/delete-post",  expressAsyncHandler(deleteACommunityPost));

communityRouter.post("/create-post", expressAsyncHandler(createACommunityPost));

communityRouter.put("/:postId/edit-post", isAuth, isAdmin, expressAsyncHandler(editACommunityPost));

communityRouter.put("/:postId/pin", expressAsyncHandler(pinCommunityPostToDashboard));

communityRouter.put("/:postId/comments/follow", expressAsyncHandler(CommunityAllCommentsFollow));

communityRouter.delete("/:postId/comments/:commentId", expressAsyncHandler(deleteAComment));

communityRouter.post("/:postId/comments/:commentId", expressAsyncHandler(postAComment));

communityRouter.get("/:postId/comments", expressAsyncHandler(getAllComments));

communityRouter.put("/:postId/comments/:commentId/share", expressAsyncHandler(CommunityCommentShare));

communityRouter.put("/:postId/comments/:commentId/like", expressAsyncHandler(CommunityCommentLike));

communityRouter.put("/:postId/comments/:commentId/follow", expressAsyncHandler(CommunityCommentFollow));

module.exports = communityRouter;