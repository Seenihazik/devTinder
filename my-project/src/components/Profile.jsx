import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"

const Profile=()=>{
   const feeduser=useSelector(state=>state.user)
   console.log("edit...",feeduser)
    return(
       <>
        {feeduser&&  <EditProfile user={feeduser}/>
}
   
       </> 
    )
}

export default Profile