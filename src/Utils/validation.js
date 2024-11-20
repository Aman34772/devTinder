const validator = require("validator");

const validateSignupData = (req,res)=>{
    const {firstName,lastName, emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not Valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("please set a strong password");
    }

}
module.exports = {
    validateSignupData,
}