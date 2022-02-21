const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { isAuth, isAdmin } = require("../utils.js");
const { userLogin, userRegister, userProfile, deleteUser, createUser, allUsers, oneUser } = require("../controllers/userController.js");

const userRouter = express.Router();

//AuthRoutes
userRouter.get("/:id", expressAsyncHandler(oneUser));

// userRouter.get("/", isAuth, isAdmin, expressAsyncHandler(allUsers));
userRouter.get("/", expressAsyncHandler(allUsers));

userRouter.post("/login", expressAsyncHandler(userLogin));

userRouter.post("/register", expressAsyncHandler(userRegister));

userRouter.put("/profile", isAuth, expressAsyncHandler(userProfile));

// userRouter.delete("/delete", isAuth, expressAsyncHandler(deleteUser));
userRouter.delete("/delete", expressAsyncHandler(deleteUser));

//This should be for an Admin. To be able to create a user.
// userRouter.post("/create", isAuth, isAdmin, expressAsyncHandler(createUser));



module.exports = userRouter;