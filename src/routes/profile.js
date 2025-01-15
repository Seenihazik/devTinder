const express=require('express')
const profileRouter=express.Router()
const userAuth=require('../middleware/auth')
const {validateProfileData}=require('../utils/validation ')
profileRouter.get('/profile/view',userAuth,(req,res)=>{
    const cookie=req.cookies
    console.log(cookie)
    res.send(req.user)
  })
  profileRouter.post('/profile/edit',userAuth,async (req,res)=>{
    try{
     if(! validateProfileData(req)){
      throw new Error("Invaluid edit request")
     }
     console.log("re bodyyyyyyyyyyy",req.body,"........req.user",req.user)
     const loggerInUser=req.user
     Object.keys(req.body).forEach(e=>loggerInUser[e]=req.body[e])
     loggerInUser.skills=req.body.skills
     console.log("loggerInUser profi le ediyytyttt",loggerInUser)
     await loggerInUser.save()
     res.json({
      message:"profile edited SuccessFully",
      data:loggerInUser
     })
    }catch(e){
      res.status(400).send("ERROR"+e.message)
    }
  })
  module.exports=profileRouter 
  