const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generateToken, capitalize } = require("../utils.js");


//find all users
//find user by id
//find user by username
const allUsers = async (req, res) =>{
    const id = req.query.id;
    const username = req.query.username;

    if(id){
        const userById = await User.find({ id });
        res.status(200).send(userById);
    }

    if(username){
        const userByUsername = await User.find({ username });
        res.staus(200).send(userByUsername);
    }

    const users = await User.find({});
    res.status(200).send(users);
}



//find single user
    const oneUser = async (req, res) =>{
    try{
        const users = await User.findById(req.params.id);
        res.status(200).send(users)
    } catch (error) {
        res.status(404).json("Post not found");
    }

}



const userLogin = async (req, res) =>{
    console.log("backend userlogin")
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).send({
                    _id: user._id,
                    firstname: user.firstname,
                    email: user.email,
                    picture: user.picture,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                    message: `Welcome back Big Boss! ${capitalize(user.username)}, you are now logged in!`,
                });

            }else{
                res.status(403).send({ message: "Invalid password" });
            }
        }else{
            res.status(204).send({ message: "No User with such credentials exist!" });
        }
    
}

const userRegister = async (req, res) =>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            picture: req.body.profilePic,
            password: hashedPass,
            isAdmin: req.body.isAdmin,
        });
    
        const createdUser = await user.save();
        res.status(201).send({
            _id: createdUser._id,
            firstname: createdUser.firstname,
            email: createdUser.email,
            picture: createdUser.picture,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
            message: `Congratulations ${createdUser.firstname}, you have successfully registered! Now, proceed to Log in.`
        });
    }catch(error){
        res.status(500).json(error)
    }
}


const userProfile = async (req, res) =>{
    const user = await User.findById(req.user._id);
    if (user) {
        if (req.body.currentPassword){
            if (bcrypt.compareSync(req.body.currentPassword, user.password)){
                const salt = await bcrypt.genSalt(10)
                const hashedPass = await bcrypt.hash(req.body.password, salt);
                user.firstname = req.body.newFirstname || user.firstname;
                user.lastname = req.body.newLastname || user.lastname;
                user.password = hashedPass || user.password;
                user.picture = req.body.filename || user.picture;

                try {
                       const updatedUser = await User.findByIdAndUpdate(req.user._id, {
                           $set: user,
                       }, {new: true});

                        //    OR
                    // const updatedUser = await user.save();

                    res.status(200).send({
                        _id: updatedUser._id,
                        firstname: updatedUser.firstname,
                        email: updatedUser.email,
                        picture: updatedUser.picture,
                        isAdmin: updatedUser.isAdmin,
                        token: generateToken(updatedUser),
                        message: "Boss!, you have successfully updated your profile.",
                    });

                } catch (error) {
                    res.status(500).json(error)
                }

            }else{
                res.status(403).send({ message:  "You entered an incorrect current password!" });
            }
        
        }else{
            res.status(403).send({ message:  "You must enter a valid current password to make any updates!" });
        }

    }else{
        res.status(401).send({ message: "Oops! User, Was Not Found." });
    }

}

const deleteUser = async (req, res) =>{
    const user = await User.findById(req.user._id);
    if (user) {
        await User.findByIdAndDelete(req.user._id);
        res.status(200).send({message: "You have successfully deleted your account. Tell us more, why you left."})
    }else{
        res.status(204).send({message: "User does not exist!"});
    }  
}

module.exports = {
    oneUser,
    allUsers,
    userLogin,
    userRegister,
    userProfile,
    deleteUser,
}