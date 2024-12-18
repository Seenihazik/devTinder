const express=require('express')
const mongoose=require('mongoose')

const app=express()
const requestRoute=express.Router()
const userAuth=require('../middleware/auth')
const ConnectionRequest = require('../models/connectionRequest')
const userModal = require('../models/user')

requestRoute.get('/sendConnectionRequest',userAuth,(req,res)=>{
    const user=req.user
    if (user) {
      res.status(200).send(`Connection request sent by ${user.name}`); // Sending a response
  } else {
      res.status(400).send('User authentication failed');
  }
  })
  requestRoute.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
    try{
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>REQ")
        const fromUserId=(req.user._id)
        const toUserId=(req.params.toUserId)
        const status=req.params.status
        console.log("re")
        console.log("..fromUserId",fromUserId,"...toUserId",toUserId,"....status",status)
        const allowedRequest=['ignored',"intrested"]
        if(!allowedRequest.includes(status)){
          return res.status(400).json({
            message:"Invalid Status type"+status
          })
        }
        const toUserExist=await userModal.findById(toUserId)
        console.log("toUserExist.........",toUserExist)
        if(!toUserExist){
          return res.status(404).json({
            message:'user not found'
          })
        }
        const existingConnecctionRequest=await ConnectionRequest.findOne({
          $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
          ]
        })
        console.log("...existingConnecctionRequest/////",existingConnecctionRequest)
        if(existingConnecctionRequest){
          console.log("innnnnnn existingConnecctionRequest")
        return  res.status(400).send({message:'Connection already exist'})
        }
        console.log("outtttt existingConnecctionRequest")
        
        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        console.log("...connectionRequest",connectionRequest)
    const data=await connectionRequest.save()
    console.log(".....dtate",data)
    res.json({
        message:`${req.user.firstName }+ " is " + ${status} + " in " + ${toUserExist.firstName},`,
        data
    })

    }catch(err){
        res.status(400).send("ERROR"+err.message)
    }
  })
  requestRoute.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
  
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      } else {
        console.log("Status is allowed");
      }
  
      console.log("hii");
      console.log("Searching for connection request with:", {
        _id:new mongoose.Types.ObjectId(requestId),
        fromUserId:new mongoose.Types.ObjectId(loggedInUser._id),
        status: "intrested"
      });
  
      const connectioRequest = await ConnectionRequest.findOne({
        _id: new mongoose.Types.ObjectId(requestId),
        fromUserId: new mongoose.Types.ObjectId(loggedInUser._id),
        status: "accepted"
      });
  
      console.log("...connectioRequest", connectioRequest);
      if (!connectioRequest) {
        return res.status(404).json({ message: "Connection request not found" });
      }
  
      connectioRequest.status = status;
      const data = await connectioRequest.save();
  
      res.json({
        message: "Connection request " + status,
        data
      });
    } catch (err) {
      console.error("Error occurred:", err);
      return res.status(400).json({ message: "Connection request not found" });
    }
  });
  
  module.exports=requestRoute 