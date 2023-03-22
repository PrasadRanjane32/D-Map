import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../Toastify/notifyToast";
// import signp from '../Assets/Images/cmsoon.png'

const Signup = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""

    });

    let name, value;
    const handleChange = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });

    }

    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                name, email, phone, work, password, cpassword

            })
        });
        // const data = await res.json();

        if ((await res.status) === 422) {

            // window.alert("Invalid Registration");
            notifyToast("Inavalid Registration", "error");
            // notifyToast("Data is not Filled Properly","error");


            console.log("Invalid Registration");
        } else {
            // window.alert(" Registration successfull");
            notifyToast("Registration Successful ", "success");

            console.log("successfull Registration");
            navigate("/Login");
        }




    }

    return (
        <>
         <div className='body'>
            <section className="d-flex align-items-center justify-content-center container-fluid signup main-wrap">
            
                <div className="card text-black  form-wrap" style={{ borderRadius: '25px' }}>
                    <div className="card-body  signup-form">
                        <div className='row'>
                            <div className='m-5 col flex-colum align-items-center justify-content-center'>
                                <h2 className="form-title text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-0">Sign Up</h2>
                                <form method='POST' className="register-form form row g-3" id="register-form" autocomplete="off">
                                   
                                    <div className="form-group d-flex flex-row align-items-center col-md-12">
                                        <label htmlfor="name">
                                            <i className="bi bi-person-circle me-3"></i>
                                        </label>
                                        <input type="text" name="name" id="name" autoComplete="off"
                                            value={user.name}
                                            onChange={handleChange}
                                            placeholder="Your Name" className='w-100 border-0 border-bottom border-info' />
                                    </div>

                                    <div className="form-group d-flex flex-row align-items-center col-md-6">
                                        <label htmlfor="email">
                                            <i className="bi bi-envelope-at-fill me-3"></i>
                                        </label>
                                        <input type="text" name="email" id="email" autoComplete="off"
                                            value={user.email}
                                            onChange={handleChange}
                                            placeholder="Your Email" className='w-100 border-0 border-bottom border-info' />
                                    </div>

                                    <div className="form-group d-flex flex-row align-items-center col-md-6">
                                        <label htmlfor="phone">
                                            <i className="bi bi-phone-fill me-3"></i>
                                        </label>
                                        <input type="tel" name="phone" id="phone" autoComplete="off"
                                           
                                            value={user.phone}
                                            onChange={handleChange}
                                            placeholder="Your Phone" className='w-100 border-0 border-bottom border-info' />
                                    </div>

                                    <div className="form-group d-flex flex-row align-items-center col-md-12 ">
                                        <label htmlfor="work">
                                            <i className="bi bi-file-earmark-easel-fill me-3"></i>
                                        </label>
                                        

                                <select
                                    name="work"
                                    value={user.work}
                                    onChange={handleChange} id="work" autoComplete="off" className='form-input mt-3 w-100 border-0 border-bottom border-info form-select'>
                                    <option>---Select Your Profession---</option>
                                    <option value="FrontEnd">Teacher</option>
                                    <option value="BackEnd">Student</option>
                                    <option value="Android">Employee</option>
                                    <option value="Other...">Other...</option>
                                </select>
                                        
                           
                                        {/* <input type="text" name="work" id="work" autoComplete="off"
                                            value={user.work}
                                            onChange={handleChange}
                                            placeholder="Your Profession" className='w-100 border-0 border-bottom border-info' /> */}
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center ">
                                        <label htmlfor="password">
                                            <i className="bi bi-lock-fill me-3"></i>
                                        </label>
                                        <input type="password" name="password" id="password" autoComplete="off"
                                            value={user.password}
                                            onChange={handleChange}
                                            placeholder="Your Password" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-3">
                                        <label htmlfor="cpassword" >
                                            <i className="bi bi-lock-fill me-3"></i>
                                        </label>
                                        <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                            value={user.cpassword}
                                            onChange={handleChange}
                                            placeholder="Confirm Your Password" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className='text-center fw-bold mb-3'>
                                        <input type="submit" name="signup" id="signup" className='form-btn form-submit'
                                            value="Register" onClick={PostData} />
                                    </div>
                                    <br></br>
                                    <Link to='/Login' className='new-act sub-title' style={{ "text-decoration": 'none',"float":'right', "color": 'steelblue', "marginLeft": '5rem', "textSizeAdjust": 'auto' }}> I am Already Registered...?</Link>

                                    {/* <Link to='/Login' className='signup-image-link ' style={{ "text-decoration": 'none', "color": 'steelblue', "paddingLeft": '19rem', "textSizeAdjust": 'auto' }}> I am Already Registered</Link> */}

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

export default Signup