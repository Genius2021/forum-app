const postRouter = require("express").Router();
const { isAuth } = require("../utils.js");
const expressAsyncHandler = require("express-async-handler");
const { createPost, getAPost, getAllPosts, editPost , deletePost } = require("../controllers/postController.js");



postRouter.get("/", expressAsyncHandler(getAllPosts));

// postRouter.get("/:id", isAuth, expressAsyncHandler(getAPost));

postRouter.get("/:id", expressAsyncHandler(getAPost));

postRouter.post("/create", isAuth, expressAsyncHandler(createPost));

postRouter.put("/:id/edit", isAuth, expressAsyncHandler(editPost));

// postRouter.delete("/:id/delete", isAuth, expressAsyncHandler(deletePost));
postRouter.delete("/:id/delete", expressAsyncHandler(deletePost));



module.exports = postRouter;