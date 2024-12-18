const express=require('express')
const userModal=require('../models/user')
const {validateSignupData}=require('../utils/validation ')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const authRouter=express.Router()
console.log("authrouter")
authRouter.post('/signup',async(req,res)=>{
    try{
      console.log("signupppp")
    validateSignupData(req)
    const password=await bcrypt.hash(req.body.password,10)
    console.log("signupppp password..",password)
const newModal=new userModal({...req.body,password})
await newModal.save()
res.send("User added")
    }
catch(err){
  console.log("error....",err,".sssssss....",err.Error)
    res.status(401).send({ message: err|| "An error occurred" });
}
})


authRouter.post("/login",async(req,res)=>{
 try{
  const {emailId,password}=req.body
  const user=await userModal.findOne({emailId:emailId})
  console.log("user login",user)
  if(!user){
    throw new Error("Emailid is not present in db")
  }
  const isPassword=await bcrypt.compare(password,user.password)
  console.log("....isPassword",isPassword)
  if(isPassword){
    const token= await user.getJWT()
    console.log("Tokkkkkkk",token)
    res.cookie('token',token,{
      expires:new Date(Date.now()+8*3600000)
    })
    res.send("Login Successfull")
  }else{
    res.status(401).send("Password is not correct")
  }


 }catch(err){
  res.status(401).send("Email is not correct")
 }



})


authRouter.post("/logout",(req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now())
  })
  res.send("Logged Out")
})
module.exports=authRouter