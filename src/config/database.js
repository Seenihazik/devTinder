const mongoose=require('mongoose')
const connect=async()=>{
    await mongoose.connect('mongodb+srv://seenihazik9095:HUsc9kwKz9g3KITU@backenddb.cjezc.mongodb.net/devTinder?retryWrites=true&w=majority&appName=BackendDB')
}
module.exports=connect

