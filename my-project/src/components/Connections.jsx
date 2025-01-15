import axios from "axios";
import { BASEURL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/connectionsSlice";
import { connection } from "mongoose";

const Connections=()=>{
    const dispatch=useDispatch()

    useEffect(()=>{fetchConnections()},[])
    const connections=useSelector(state=>state.connections)
    const fetchConnections=async()=>{
       try{
      const res=await axios.get(BASEURL + '/user/connection',{withCredentials:true})
        console.log("res",res.data.data)
        dispatch(addConnection(res.data.data))
       }catch(err){
        console.log("error in fetching connections",err)
       }
    }
    if(connections?.length==0)  return <h1 className="text-bold text-2xl">No Connections</h1>

  
        return (
            <div className='card bg-base-300 w-96 shadow-xl my-12 mx-auto'>
                <h1 className="text-bold text-2xl px-2">Connections</h1>
              {connections?.map((connection)=>{
                    return  <div className="card bg-base-300 w-96 shadow-xl my-2" key={connection.id}>
                    <div className="card-body">
                        <h2 className="card-title">{connection.firstName} {connection.lastName}</h2>
                        <div className="flex justify-between">
                        <p>{connection.emailId}</p>
                        </div>
                    </div>
                </div>
                
              })}


            </div>
        )
}
export default Connections;