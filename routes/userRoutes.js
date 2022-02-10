const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { isAuth, isAdmin } = require("../utils.js");
const { userLogin, userRegister, userProfile, deleteUser, createUser, allUsers, oneUser } = require("../controllers/userController.js");

const userRouter = express.Router();

//AuthRoutes
userRouter.get("/:id", expressAsyncHandler(oneUser));

userRouter.get("/", isAuth, isAdmin, expressAsyncHandler(allUsers));

userRouter.post("/login", expressAsyncHandler(userLogin));

userRouter.post("/register", expressAsyncHandler(userRegister));

userRouter.put("/profile", isAuth, expressAsyncHandler(userProfile));

userRouter.delete("/delete", isAuth, expressAsyncHandler(deleteUser));

userRouter.post("/create", isAuth, isAdmin, expressAsyncHandler(createUser));



module.exports = userRouter;