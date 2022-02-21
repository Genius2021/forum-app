const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign({
        user_id: user.user_id,
        firstname: user.firstname,
        username: user.username,
        is_admin: user.is_admin,
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
   if(req.user && req.user.is_admin){
       next();
   }else{
       res.status(401).send({message: "Invalid Admin Token"});
   }
}


const capitalize = (string) =>{
    const lowercase = string?.toLowerCase();
    const capital = lowercase[0].toUpperCase();
    const answer = lowercase.replace(lowercase[0], capital)
    return answer;
}


function capitalizeStringWithDash(string){
    if(string.includes('-')){
         const ans = string.split("-").map(x =>{
            if(x === "and"){
                return "and"
            }else{           
                return capitalize(x);
            }
            
        })
        return ans.join(" ").toString();
    }else{
        return capitalize(string);

    }
        
}

function capitalizeLowercaseStringWithSpace(string){
    if(string.includes('-')){
        const ans = string.split(" ").map(x =>{
            if(x === "and"){
                return "and"
            }else{
                return capitalize(x);
       
            }
            
        })
        return ans.join(" ").toString();

    }else{
        return capitalize(string);
 
    }
    

}




module.exports = {
    isAdmin,
    isAuth,
    generateToken,
    capitalize,
    capitalizeStringWithDash,
    capitalizeLowercaseStringWithSpace,
}