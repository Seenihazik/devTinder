import { useState } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../utils/constant"
import UserCard from "./UserCard"
const EditProfile=({user})=>{
   const dispatch=useDispatch()
    const [firstName,setFirstName]=useState(user.firstName)
    const [lastName,setLastName]=useState(user.lastName)
    const [emailId,setEmail]=useState(user.emailId)
    const [photoUrl,setPhotoUrl]=useState(user.photoUrl)
    const [gender,setGender]=useState('Male')
    const [error,setError]=useState('')
    const [skills,setSkills]=useState('')
    const [toast,showToast]=useState(false)
    const navigate=useNavigate()

const saveProfile=async()=>{
  try{
const res=await axios.post('http://localhost:3000/profile/edit',{
  firstName,
  lastName,
  emailId,
  gender,
  photoUrl,
  skills
},{withCredentials:true})
dispatch(addUser(res.data.data))
showToast(true)
setTimeout(()=>{
  showToast(false)
},3000)

  }catch(e){
    setError(e?.response?.data)
  }
}
    return(
      <>
      <div className='flex justify-center my-10'>
       <div className="flex justify-center my-10">
   <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Profile</h2>
    <div>
    <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">First Name</span>
  </div>
  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}  className="input input-bordered w-full max-w-xs" />
 
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Last Name</span>
  </div>
  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}  className="input input-bordered w-full max-w-xs" />
 
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Email Id</span>
  </div>
  <input type="text" value={emailId} onChange={(e)=>setEmail(e.target.value)}  className="input input-bordered w-full max-w-xs" />
 
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Photo Url</span>
  </div>
  <input type="text" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}  className="input input-bordered w-full max-w-xs" />
 
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Gender</span>
  </div>
  <input type="text" value={gender} onChange={(e)=>setGender(e.target.value)}  className="input input-bordered w-full max-w-xs" />
 
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Skills</span>
  </div>
  <input type="text" value={skills} onChange={(e)=>setSkills(e.target.value)}  className="input input-bordered w-full max-w-xs" />
 
</label>
    </div>
    <div className="card-actions justify-center m-2">
        <button className="btn" onClick={saveProfile}>Save Profile</button>
    </div>
    <div className='text-red-500'>{error}</div>
  </div>
</div>
       </div>
       {firstName&&<UserCard user={{firstName,lastName,emailId,photoUrl}}/>}
       </div> 
       {toast&&<div className="toast toast-top toast-end">
  <div className="alert alert-success">
    <span>Updated successfully.</span>
  </div>
</div>}
      </> 
      )
}

export default EditProfile