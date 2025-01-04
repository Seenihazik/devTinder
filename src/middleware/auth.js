const jwt=require('jsonwebtoken')
const User=require('../models/user')
const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies
        console.log("tokennnnnnn middleware",token)
        if(!token){
          
            throw new Error("User not found")
            
        }
     const decodedObj=await jwt.verify(token,"Dev@Tinder")
     const {_id}=decodedObj
     const user=await User.findById(_id)
     if(!user){
        throw new Error("User not found")

     }
     req.user=user
     console.log("user in middleware",user)
     next()

    }catch(err){
        res.status(400).send('ERR'+err.message)
    }
}

module.exports=userAuth