const express=require('express')
const userRouter=express.Router()
const User=require('../models/user')
const userAuth=require('../middleware/auth')
const ConnectionRequest = require('../models/connectionRequest')
userRouter.get('/user/requests/received',userAuth,async(req,res)=>{
    try{
     const loggedInUser=req.user
     const connectionRequest=await ConnectionRequest.find({
        toUserId:loggedInUser,
        status:'intrested'
     }).populate('fromUserId',['firstName','lastName','emailId','photoUrl'])
     res.json({
        message:"Data Fetched SuccessFully",
        data:connectionRequest
     })

    }catch(err){
        res.statusCode(400).send("ERROR "+err.messsage)
    }
})

userRouter.get('/user/connection',userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user
        console.log("loggedInUser",loggedInUser._id)
       const connectionRequests= await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:'accepted'},
                {fromUserId:loggedInUser._id,status:'accepted'}
            ]
        
        }).populate('fromUserId',['firstName','lastName']).populate('toUserId',['firstName','lastName'])

        console.log("Type of ConnectionRequest:", typeof ConnectionRequest); // Should be 'function'
        console.log("Type of query object:", typeof ConnectionRequest.find());
        console.log("connn.....",connectionRequests)
        const data=connectionRequests.map((row)=>{
            console.log("connndd.....",row.fromUserId._id.toString()===loggedInUser._id.toString())

            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
        console.log("in ifff.....")
            
                return row.toUserId
            }
            return row.fromUserId
     })
     console.log("data.....",data)

        res.json({data})
    }catch(e){
        console.log("inside catchhhhhhhhh")
        res.status(400).send({message:e.message})
    }
})

userRouter.get('/feed',userAuth,async(req,res)=>{
    try{
        console.log("in frrd")
       const loggedInUser=req.user 
       const page=parseInt(req.query.page)||1
       const limit=parseInt(req.query.limit)||10
       const skip=(page-1)*limit
     const connectionRequest=await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
        ]
     }).select('fromUserId toUserId')


     const hideFromUserId=new Set()
     connectionRequest.forEach((row)=>{
        hideFromUserId.add(row.toUserId.toString())
        hideFromUserId.add(row.fromUserId.toString())
    
    })
    const users=await User.find({
        $and:[
            {_id:{$nin:Array.from(hideFromUserId)}},
            {_id:{$ne:loggedInUser._id}}
        ]
    }).skip(skip).limit(limit)
     console.log("connectionRequest",connectionRequest)
     res.send({data:users})

    }catch(err){res.status(400).json({message:err.message})}
})
module.exports=userRouter