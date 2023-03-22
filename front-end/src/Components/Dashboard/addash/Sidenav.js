import React, {useEffect, useState } from 'react'
import '../sidestyles.css'
import stack from '../../../Assets/Images/gif icons/shelves.gif'
import users from '../../../Assets/Images/gif icons/user.gif'
import Mail from '../../../Assets/Images/consultation.gif'
import Onwork from '../../../Assets/Images/gif icons/coding.gif'
import { Link } from 'react-router-dom'
import Loadings from '../../LoadingPage/Loading'

const Sidenav = () => {
  const [dCount, setCount] = useState(0);
  const [uCount,setUcount] = useState(0);
  const [fCount,setFcount] = useState(0);
const [loading,setLoading] = useState(true);
  
  //  useState();
  const countSub = async () => {
    try {
    const res = await fetch("/getsubData", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    // console.log(res.json());
    
    const data = await res.json();
  
    let count = data.length;
    if(data){
      setCount(count);
      setLoading(false);
    }else{
      setCount(count =0);
    }    

}
  catch (err) {
    console.log(err);
  }
  }
  const countUser = async () => {
    try {
    const res = await fetch("/getUserData", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    
    const data = await res.json();

  console.log();
    let count ;
    const messages1 = data?.map((e) => e.messages).flat().filter((message) => message.name !== undefined && message.email !== undefined && message.phone !== undefined);

  
     
      if(messages1){
        count = messages1.length;
        setFcount(count);
         
      }else{
       
        setFcount(count = 0);
      }
 
    if(data){
      count = data.length;
      setUcount(count);
     
    }else{
      setUcount(count =0);
    }    

}
  catch (err) {
    console.log(err);
  }
  }
  
 

  useEffect(() => {
   countUser();
    countSub();
}, []);
if(loading){
  return(
    <>

    <Loadings/>
    </>
  )
}else{



  return (

      <div className='body'>

      <div className='container col'>
  
        <div className='dashboard row'>
  
  
  
  
          <div className='col-md-12 d1 d-flex g-3'>
  
            <div className='col-md-6 d1c1'>
              <h4>Dashboard</h4>
  
              <div className='row'>
                <div className='col-md-6'>
                  <div className='card c1'>
                    <div className='card-body cb'>
                    <Link to='/SubjectDashBoard'>

                     <h2 className='btn '>
                      <img src={stack}/>
                    {/* <i className="bi bi-stack"></i>  */}
                    Subject's <span> {dCount}</span>
                      </h2>
                    </Link>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='card c1'>
                    <div className='card-body'>
                    <Link to='/UserDetailDashBoard' >

                   <h2 className='btn'>
                    <img src={users}/>

                    {/* <i className="bi bi-people-fill"></i>  */}
                    User's <span>{" "+ uCount}</span>
                      </h2>
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className='row'>
                <div className='col-md-6'>
                  <div className='card c1'>
                    <div className='card-body'>
                    <Link to='/FeedbackDashBoard'>
                   <h2 className='btn'>
                    <img src={Mail}/>

                    {/* <i className="bi bi-people-fill"></i>  */}
                   FeedBack <span>{" "+ fCount}</span>
                      </h2>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='card c1'>
                    <div className='card-body'>
                    <h2 className='btn disabled'>
                    <img src={Onwork}/>

                    {/* <i className="bi bi-people-fill"></i>  */}
                   Loading...
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className='col-md-6 d2 disabled'>
            
                <div className='card c2'>
                <div className='card-body'>
                    <h2 className='btn '>
                    {/* <img src={Onwork}/> */}

                    <i className="bi bi-people-fill"></i> 
                   Loading...
                      </h2>
               
  
                </div>
              </div>
              </div>
  
          </div>
  
        
        </div>
  
      </div>
  
      </div>
    )
  }
}

export default Sidenav