import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Images/dm.png'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import { UserContext } from '../../App';




const Navbar = () => {
    const {state, dispatch} = useContext(UserContext);
   
const RenderMenu=()=>{
  
      const [userName, setUserName] = useState ( () => {
        const savedItem = localStorage.getItem("username");
       const parsedItem = JSON.parse(savedItem);
       return parsedItem || "";
       });
      const user = "Admin";
    console.log(userName.work);
if(userName.work==user){
    return(
        <>
         <li className="nav-item active">
       
                        <Link className="nav-link" to="/Dashboard">Dashboard</Link>
      
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/About">User Profile</Link>
                    </li>
                   
                    <li className="nav-item">
                        <Link className="nav-link" to="/Logout" >Log Out</Link>
                    </li>
    </>
)
}else if(state){
        return(
            <>
             <li className="nav-item active">
           
                            <Link className="nav-link" to="/">Home</Link>
          
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/About">User Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Contact">Contact</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className="nav-link" to="/Logout" >Log Out</Link>
                        </li>
        </>
    )
   }else{
       return(
           <>
          <li className="nav-item active">
        <Link className="nav-link" to="/">Home</Link>
    </li>
  
        <li className="nav-item">
        <Link className="nav-link" to="/Login">Login</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/Signup">Registration</Link>
    </li>
      </>
    )
   }

}

return (
    <>
            <nav className="p-0 navbar d-flex navbar-expand-lg navbar-light bg-light justify-content-between">
                <Link className="p-1 navbar-brand d-flex  align-items-center " to="/">
                <img src={Logo} width="25" height="25" alt='D-MAP Logo'/>
                <span className='p-1' > D-MAP</span>
                </Link>
                <button className="navbar-toggler ml-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="bi bi-three-dots-vertical"></span>
                </button>
                <div className='justify-content-center align-items-center pb-2'>
                <div className="collapse navbar-collapse justify-content-end  " id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                        <RenderMenu/>
                    </ul>
                </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
