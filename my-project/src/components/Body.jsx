import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASEURL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body=()=>{
    console.log("inn  bodyyy")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userData=useSelector((state)=>state.user)
    const fetchUser=async()=>{
        try{
            console.log("in fetcg iser")
            if(userData) return
            const res=await axios.get(BASEURL + '/profile/view',{withCredentials:true})
            console.log("in profileee",res.data)
             dispatch(addUser(res.data))       
        }catch(err){
            if(err.status==400){
            navigate('/login')
              
            }
            console.log(err)
        }
    }
    useEffect(()=>{
        console.log("in fetcg iser useeffectg")
        
        fetchUser()
        
    },[])
    return(
       <>
       <NavBar/>
       <Outlet/>
       <Footer/>
       </> 
    )
}

export default Body