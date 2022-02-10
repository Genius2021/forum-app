const postRouter = require("express").Router();
const { isAuth } = require("../utils.js");
const expressAsyncHandler = require("express-async-handler");
const { createPost, getAPost, getAllPosts, editPost , deleteUser } = require("../controllers/postController.js");



postRouter.get("/", expressAsyncHandler(getAllPosts));

// postRouter.get("/:id", isAuth, expressAsyncHandler(getAPost));

postRouter.get("/:id", expressAsyncHandler(getAPost));

postRouter.post("/create", isAuth, expressAsyncHandler(createPost));

postRouter.put("/:id/edit", isAuth, expressAsyncHandler(editPost));

postRouter.post("/:id/delete", isAuth, expressAsyncHandler(deleteUser));



module.exports = postRouter;