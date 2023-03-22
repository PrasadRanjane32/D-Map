import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loadings from '../LoadingPage/Loading'
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../Toastify/notifyToast";
// import signp from '../Assets/Images/cmsoon.png'

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);

    const [userData, setUserData] = useState({_id:"", name: "", email: "", phone: "", work: "", password: "", cpassword: ""});
  
    const callContactPage = async () => {
      try {
        const res = await fetch('/getdata', {
          method: "GET",
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json"
          },
          // credentials: "include"
        });
  
        const data = await res.json();
        console.log(data);
        setUserData({ ...userData,_id:data._id, name: data.name, email: data.email, phone: data.phone , work: data.work, password: data.password, cpassword:data.cpassword });
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
  
  
      } catch (err) {
        console.log(err);
        navigate("/about");
      }
    }
  
  
  
    useEffect(() => {
  
      callContactPage();
  
    }, []);
    
    // handling profile update

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value });
      }

    const PostData = async (e) => {
        e.preventDefault();
        const {_id, name, email, phone, work, password, cpassword } = userData;

        const res = await fetch("/updateProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                _id,name, email, phone, work, password, cpassword

            })
        });
        // const data = await res.json();

        if ((await res.status) === 422) {

            // window.alert("Invalid Registration");
            notifyToast("Inavalid Update,Data is Not Filled Properly", "error");
            // notifyToast("Data is not Filled Properly","error");


            console.log("Invalid Update");
        } else {
            // window.alert(" Registration successfull");
            notifyToast("Profile Updated", "success");

            console.log("successfull Registration");
            navigate("/about");
        }




    }
    if(loading){
        return(
          <>
      
          <Loadings/>
          </>
        )
      }else{

    return (
        <>
        <div className='body'>
            <section className="d-flex align-items-center justify-content-center container-fluid signup main-wrap">
                <div className="card text-black  form-wrap" style={{ borderRadius: '25px' }}>
                    <div className="card-body  signup-form">
                        <div className='row'>
                            <div className='m-5 col flex-colum align-items-center justify-content-center'>
                                <h2 className="form-title text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-0">Update Profile</h2>
                                <form method='POST' className="register-form form" id="register-form" autocomplete="off">
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
                                        <label htmlfor="name">
                                            <i className="bi bi-person-circle me-3"></i>
                                        </label>
                                        <input type="text" name="name" id="name" autoComplete="off"
                                            value={userData.name}
                                            onChange={handleInputs}
                                            placeholder="Your Name" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
                                        <label htmlfor="email">
                                            <i className="bi bi-envelope-at-fill me-3"></i>
                                        </label>
                                        <input type="text" name="email" id="email" autoComplete="off"
                                            value={userData.email}
                                            onChange={handleInputs}
                                            placeholder="Your Email" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
                                        <label htmlfor="phone">
                                            <i className="bi bi-phone-fill me-3"></i>
                                        </label>
                                        <input type="tel" name="phone" id="phone" autoComplete="off"
                                           
                                            value={userData.phone}
                                            onChange={handleInputs}
                                            placeholder="Your Phone" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
                                        <label htmlfor="work">
                                            <i className="bi bi-file-earmark-easel-fill me-3"></i>
                                        </label>
                                        <input type="text" name="work" id="work" autoComplete="off"
                                            value={userData.work}
                                            onChange={handleInputs}
                                            placeholder="Your Profession" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
                                        <label htmlfor="password">
                                            <i className="bi bi-lock-fill me-3"></i>
                                        </label>
                                        <input type="password" name="password" id="password" autoComplete="off"
                                            value={userData.password}
                                            onChange={handleInputs}
                                            placeholder="Your Password" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-3">
                                        <label htmlfor="cpassword" >
                                            <i className="bi bi-lock-fill me-3"></i>
                                        </label>
                                        <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                            value={userData.cpassword}
                                            onChange={handleInputs}
                                            placeholder="Confirm Your Password" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className='  text-center fw-bold d-flex justify-content-around'>
                                        <input type="submit" name="signup" id="signup" className='text-center btn btn-success'
                                            value="Update" onClick={PostData} />
                                            <Link to='/about' className='btn btn-danger'>Cancel</Link>
                                    </div>
                                    

                                </form>

                            </div>
                          
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </>
    )
      }
}

export default Signup