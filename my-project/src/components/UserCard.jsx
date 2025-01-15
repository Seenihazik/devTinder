import { useState } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../utils/constant"
import { removeUserFromFeed } from "../utils/feedSlice"

const UserCard = ({ user }) => {
  const dispatch=useDispatch()
  const {_id, firstName, lastName, emailId, photoUrl } = user;
  const handleSentRequest = async (status, userId) => {
    try {
      const res=await axios.post(BASEURL + "/request/send/" + status + "/" + userId,{},{
        withCredentials:true
      } )
      dispatch(removeUserFromFeed(userId))
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {emailId && <p>{emailId}</p>}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={()=>handleSentRequest('ignored',_id)}>Reject</button>
            <button className="btn btn-secondary" onClick={()=>handleSentRequest('intrested',_id)}>Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserCard;
