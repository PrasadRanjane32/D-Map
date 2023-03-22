import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import back from '../../../../Assets/Images/gif icons/fast-backward.png'
import del from '../../../../Assets/Images/gif icons/bin.gif'
import edit from '../../../../Assets/Images/gif icons/edit.gif'
import '../../sidestyles.css'
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../../../Toastify/notifyToast";
import { useCookies } from 'react-cookie'
import Loadings from '../../../LoadingPage/Loading'


const UserdetailDash = () => {
    
    const navigate = useNavigate();

    const[Uidcookie,setUidcookie]=useCookies(['user']);

      const [uData, setUdata] = useState();
      const [loading, setloading] = useState(true);

      
      const getUser = async () => {
        try {
        const res = await fetch("/getUserData", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-work": "application/json"
            }
        });
        
        const data = await res.json();
        if(data){
            setUdata(data);
            setloading(false);
        }else{
          return
        }    
    
    }
      catch (err) {
        console.log(err);
      }
      }
      
      const edituserdetail=(userID)=>{
      
            setUidcookie('Edituserid',userID,{path:'/'});
            // localStorage.setItem('Edituserid', JSON.stringify(userID))
            navigate('/EditUser')
            
      }

  
         
      const deluserdetail= async (userID)=>{
        setUidcookie('Deluserid',userID,{path:'/'});
      
        try {
            const res = await fetch("/delUdata", {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                  credentials: "include"
            });
          
            const data = await res.json();
            console.log(data);
         
         
            if ((await res.status) === 400) {
    
                notifyToast("Inavalid User,Data is Not Found", "error");
                

    
                console.log("Invalid Update");
            } else {
                notifyToast("Profile Deleted", "success");
                getUser();
                // navigate("/UserDetailDashBoard");
            }


        }
        catch (err) {
            console.log(err);
            // navigate("/Login");
        }
        
       
  
  }
     
    
      useEffect(() => {
      getUser();
     
    }, []);
    
    
  if (loading) {
    return(
      <>
  
      <Loadings/>
      </>
    )
    } else {
    
      return (
        <>
          <div className='body'>
    
            <div className='container col'>
    
              <div className='dashboard row'>
    
    
    
    
                <div className='col-md-12 d1 d-flex g-3'>
                  <div className='back col-md-2'>
                    <Link to='/Dashboard'>
    
                      <h2 className='btn '>
                        <i class="bi bi-box-arrow-left"></i>
                        Back
                      </h2>
                    </Link>
                  </div>
                  <div className='col-md-6 d1c1'>
                    <h4>User's</h4>
    
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='card c1'>
                          <div className='card-body cb'>
    
    
                            <table class="table">
                              <thead>
                                <tr className='row '>
                                  <th scope="col" className='col-md-1'>Sr.No.</th>
                                  <th scope="col" className='col-md-2'>Name</th>
                                  <th scope="col" className='col-md-3'>Email</th>
                                  <th scope="col" className='col-md-2'>Phone</th>
                                  <th scope="col" className='col-md-2'>Profession</th>
                                  <th scope="col" className='col-md-2'>handle</th>


                                </tr>
                              </thead>
                              <tbody>
                                {uData?.map((curElem) => {
    
    
                                  const { _id, name, email, phone, work } = curElem;
                                  return (
                                    <>
                                      <tr className='row'  key={_id}>
                                        <th scope="row" className='col-md-1'></th>
                                        <td className='col-md-2'>{name}</td>
                                        <td className='col-md-3'>{email}</td>
                                        <td className='col-md-2'>{phone}</td>
                                        <td className='col-md-2'>{work}</td>
                                        <td className='col-md-2 btns'>
    
    
                                          <div className='col-md-5'>
                                          <Link to={'/EditUser'} onClick={()=>edituserdetail(_id)}>
                                            <button className='btn bedit' >
                                              <img src={edit} />
                                            </button>
                                          </Link>
                                          </div>
                                          <div className='col-md-5'>

                                        
                                          <Link to={''} onClick={()=>deluserdetail(_id)}>
                                            <button className='btn bdel'>
                                              <img src={del} />
                                            </button>
                                            </Link>
                                          </div>
    
    
    
                                        </td>
    
                                      </tr>
                                    </>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
    
                    </div>
    
    
                  </div>
    
                </div>
    
    
              </div>
    
            </div>
    
          </div>
        </>
      )
                              }
    }
  
    

export default UserdetailDash