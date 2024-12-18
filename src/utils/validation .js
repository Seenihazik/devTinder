
const validator=require('validator')
const validateSignupData=(req)=>{
    console.log("in validatesignup")
    const {firstName,lastName,emailId,password}=req.body
    console.log("reee",req.body,validator.isEmail(emailId))
    if(!firstName||!lastName){
        throw Error("Name is not Valid")
    }
    else if(!(validator.isEmail(emailId))){
        throw new Error('Please pffut valid email id')
    }
    
    else if(!(validator.isStrongPassword(password))){
        throw new Error('Please puggt valid pasword')
    }
}
const validateProfileData=(req)=>{
    const allowedField=["age","gender","skills","lastName"]
    console.log("re bodyyyyyyyyyyy valid",req.body)
    const isEditAllowed=Object.keys(req.body).every(field=>allowedField.includes(field))
    console.log("isEditAllowed...",isEditAllowed)
return isEditAllowed
}
module.exports={
    validateSignupData,
    validateProfileData
}