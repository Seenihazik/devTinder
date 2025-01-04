import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  console.log("user from redux", user);
  const handleLogout=async()=>{
    try{
      console.log("Inn log")
      await axios.post('http://localhost:3000/logout',{},{withCredentials:true})
       dispatch(removeUser())
       navigate('/')

    }catch(err){
      console.log("error in logout",err)
    }
 
  }
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <div className="form-control">
              <p>Welcome {user.firstName}</p>
            </div>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to='/profile' className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logzzzout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;