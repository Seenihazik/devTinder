const express=require('express')
const app=express()
console.log('App started');
app.use((req,res)=>res.send("Hello woddrld"))
app.listen(3000,()=>console.log("Server listening on 3000"))
console.log("Hii ggggg")