const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET, { expiresIn: "7d", })
}


const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid token" })
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: "No token" });
    }
}

const isAdmin = (req, res, next) =>{
   if(req.user && req.user.isAdmin){
       next();
   }else{
       res.status(401).send({message: "Invalid Admin Token"});
   }
}


const capitalize = (string) =>{
    const lowercase = string?.toLowerCase();
    const capitalize = lowercase[0].toUpperCase();
     const answer = lowercase.replace(lowercase[0], capitalize)
    return answer;
}

module.exports = {
    isAdmin,
    isAuth,
    generateToken,
    capitalize
}