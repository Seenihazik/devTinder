const mongoose=require('mongoose')
const connectionRequestySchema=new mongoose.Schema({
   
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        status:{
            type:String,
            enum:{
                values:["ignore","intrested","accepted","rejected"],
                message:"{VALUE} is incorrect status type",
            }
        }
},

        {
            timestamps:true
        })
        connectionRequestySchema.index({fromUserId:1,toUserId:1},{unique:true})

    connectionRequestySchema.pre("save",function(next){
        const connection=this
        if(connection.fromUserId.equals(connection.toUserId)){
            throw new Error("No ability to send connect to yourself")
        }
        next()
    })
    const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestySchema)
    module.exports=ConnectionRequest