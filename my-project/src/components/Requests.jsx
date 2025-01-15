import axios from "axios";
import { BASEURL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequests } from "../utils/requestsSlice";

const Requests=()=>{
    const dispatch=useDispatch()

    useEffect(()=>{fechRequests()},[])
    const requests=useSelector(state=>state.requests)
    const fechRequests=async()=>{
       try{
      const res=await axios.get(BASEURL + '/user/requests/received',{withCredentials:true})
        console.log("res",res.data.data)
        dispatch(addRequests(res.data.data))
       }catch(err){
        console.log("error in fetching connections",err)
       }
    }
    if(requests?.length==0)  return <h1 className="text-bold text-2xl">No requests found.</h1>

  const reviewRequests=async(status,id)=>{
    console.log("in reviewreq",id)
    try{
     await axios.post(BASEURL + '/request/send/' + status + '/' + id,{},{withCredentials:true})
      dispatch(removeRequests(id))
    }catch(e){
      return e
    }
  }
    return (
      <div className="card bg-base-300 w-96 shadow-xl my-12 mx-auto p-4">
        {/* Title */}
        <h1 className="font-bold text-2xl text-center mb-6">Requests</h1>
        
        {/* Check if there are requests */}
        {requests?.length > 0 ? (
          <ul className="space-y-4">
            {requests.map((connection, index) => (
              <li 
                key={index} 
                className="flex flex-col items-center bg-base-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
              >
                {/* Profile Section */}
                <div className="flex items-center space-x-4 w-full">
                  <img
                    src={connection.fromUserId.photoUrl}
                    className="rounded-full h-12 w-12 object-cover border border-base-200"
                    alt={`${connection.fromUserId.firstName}'s profile`}
                  />
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-lg text-primary">
                      {connection.fromUserId.firstName} {connection.fromUserId.lastName}
                    </h2>
                    <p className="text-sm text-secondary">
                      {connection.fromUserId.emailId}
                    </p>
                  </div>
                </div>
    
                {/* Action Buttons */}
                <div className="flex justify-between w-full mt-4">
                  <button className="btn btn-primary flex-1 mr-2" onClick={()=>reviewRequests('accepted',connection.fromUserId._id)}>Accept</button>
                  <button className="btn btn-secondary flex-1 ml-2" onClick={()=>reviewRequests('ignored',connection.fromUserId._id)}>Reject</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No requests found.</p>
        )}
      </div>
    );
    
}
export default Requests;