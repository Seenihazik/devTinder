const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userSchema=mongoose.Schema(
    {
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:58
    },
    lastName:{
        type:String
    },
    emailId:{
      type:String,
      lowercase:true,
      required:true,
      unique:true,
      trim:true,
     validate:{
        validator:async function(email){
            const user=await this.constructor.findOne({email})
            if(user) {
                if(this.id === user.id) {
                  return true;
                }
                return false;
        }
     }
    },
    required:true

    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }

},
{
    timestamps:true
})
userSchema.methods.getJWT=async function(){
    const user=this
    const token=await jwt.sign({_id:user._id},'Dev@Tinder',{
        expiresIn:'7d'
    })
    return token
}
userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this
    const passwordHash=this.password
    const iusPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash)
    return iusPasswordValid
} 

const userModal=mongoose.model("User",userSchema)
module.exports=userModal