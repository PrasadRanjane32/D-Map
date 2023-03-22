import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import Loadings from '../LoadingPage/Loading'


const Logout = () => {
    const {state, dispatch} = useContext(UserContext);

    const [loading, setloading] = useState(true);
    

  const navigate = useNavigate();
    //promises to log out
    useEffect(()=>{
fetch('/logout',{
    method:"GET",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
    credentials:"include"
}).then((res)=>{
    dispatch({type:"USER",payload:false})
    setloading(false);
navigate('/login',{replace:true});

localStorage.clear();

if(res.status != 200){

    
    const error = new Error(res.error);
    throw error;
}

}).catch((err)=>{
console.log(err);
})
    },[]);
  
    if(loading){
        return(
          <>
      
          <Loadings/>
          </>
        )
        }
}
  

export default Logout