 const userAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked!!")
    const token = "xyz";
    const isAdminAuthorized = token ==="xyz"
    if(!isAdminAuthorized){
        res.status(401).send("admin is not authorized/unauthorized request");
    }else{
        next();
    }
}
module.exports = {userAuth,userAuth};