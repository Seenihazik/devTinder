import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import NavBar from "./components/NavBar"

const Body=()=>{
    return(
       <>
       <NavBar/>
       <Outlet/>
       <Footer/>
       </> 
    )
}

export default Body