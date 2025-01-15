import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/constant";
const Login = () => {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("trump@gmail.com");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isLogin, setisLogin] = useState(true);
  const [password, setPassword] = useState("Trump@123.");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASEURL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data);
    }
  };
  const handleSignup = async () => {
    try{
      const res = await axios.post(
        BASEURL + "/signup",
        {
          emailId,
          password,
          firstName,
          lastName,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    }catch(err){
      console.log(err);
      setError(err?.response?.data);
    }
  }
  console.log("errr", error);
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{isLogin ? "Login" : "Signup"}</h2>
          <div>
            {/* form */}

            {isLogin && (
              <>
                {" "}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">FirstName</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">LastName</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}

            {/* end */}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="card-actions justify-center m-2">
            <button className="btn" onClick={isLogin?handleLogin:handleSignup}>
            {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <div className="text-red-500">{error}</div>
          <div className="m-auto cursor-pointer py-2" onClick={()=>setisLogin((value)=>!value)}>{isLogin?"New User Signup Here":"Existing User?Login Here"}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
