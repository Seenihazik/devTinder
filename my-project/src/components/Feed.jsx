import axios from "axios"
import { useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"

const Feed=()=>{
    const dispatch=useDispatch()
    const gotFeeddata=useSelector(state=>state.feed)
    const getFeed=async()=>{
      console.log("in got feed")
        const feedResponse=await axios.get('http://localhost:3000/feed',{withCredentials:true})
        console.log("in feed front res",feedResponse)
        dispatch(addFeed(feedResponse.data.data))

   
    }
    console.log('in feedd store',gotFeeddata)
    useEffect(()=>{
        getFeed()
    },[])
    if(!gotFeeddata) return
    if(gotFeeddata?.length<=0) return <h1 className='flex justify-center my-5'>No data</h1>
    return(
        <>
      { gotFeeddata&& (


        <div className='flex justify-center my-10'>

            <UserCard user={gotFeeddata[0]}/>
        </div>
      )
      
        }
          </>
    )
  
}
export default Feed