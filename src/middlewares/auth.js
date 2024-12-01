const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const {User} = require('../models/user')
dotenv.config();    


const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token ==="xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("unAuthorized request");
    }else{
        next();
    }
};
 
 
 
 const userAuth = async(req,res,next)=>{
    //read the token from the req cookies
    try {
        const {token} = req.cookies;
        if (!token) {
            throw new Error("Token is not valid!!")
        }
    const decodedobj = await jwt.verify(token,process.env.secretkey)
    //validate the token 
    const {_id} = decodedobj;
    const user = await User.findById({_id:_id});
    if(!user){
        throw new Error("user not found");
    }
    req.user = user;
    next();
    } catch (error) {
        res.status(400).send("Error: "+ error.message)
    }
    
    //find the user
}
module.exports = {adminAuth,userAuth};