const express=require('express')
const app=express()
const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const requestRouter=require('./routes/requests')
const connect=require('./config/database')
const userModal=require('./models/user')
const userRouter=require('./routes/user')
const cookieparser=require('cookie-parser')
const cors=require('cors')
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Add allowed headers explicitly
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable CORS preflight requests for all routes
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.status(200)
  }
  next();
});
app.use(express.json());
app.use(cookieparser());






app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} request to ${req.url} i app.js`);
  next();
});
console.log('App started');
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/',requestRouter)
app.use('/',userRouter)


// const profileRouter=require('./routes/profile')
// const requestRouter=require('./routes/requests')



// app.get('/user',(req,res)=>console.log("gett userrrr"))clear

// app.use('/',(req,res,next)=>{
//   console.log("innn 1")
//   res.send("Hello dataa")
//    next()
// })

// app.use('/user',(req,res)=>{
//   console.log("insideeeeee")
//   // res.send("Hello dataa22222")
//   })


// // app.use("/",(req,res)=>res.send("Hello woddrld"))

// // app.use('/add',[(req,res,next)=>{
// //     // res.send("Hi1")
// //     next()
// // },
// // (req,res,next)=>res.send("Hi2")])
// app.get('/add',(req,res,next)=>{
//     console.log("1ST HANDLERTRRR")

//     res.send("Hi 11")
//     next()
// }

// )

// app.use('/add',(req,res,next)=>{
//     console.log("2ND HANDLERTRRR")
//     res.send("Hi 2")
//     next()
// }

// )



app.get('/user',async(req,res)=>{
  const cookie=req.cookies
    const user=await userModal.findOne({emailId:'foo@bar.com'})
    res.send(user)
})
connect().then(()=>{console.log("DB Connected")
    app.listen(3000,()=>{console.log("Server listening on 3000")
    })    
}).catch(err=>console.log(err))

console.log("Hii ggggg")