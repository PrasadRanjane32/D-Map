import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
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

        if ((await res.status) === 422 ) {

            window.alert("Invalid Registration");

            console.log("Invalid Registration");
        } else  {
            window.alert(" Registration successfull");
            console.log("successfull Registration");
            navigate("/Login");
        }

       


    }

    return (
        <>
            <section className="d-flex align-items-center justify-content-center container-fluid signup main-wrap">
                <div className="card text-black  form-wrap" style={{ borderRadius: '25px' }}>
                    <div className="card-body  signup-form">
                        <div className='row'>
                            <div className='m-5 col flex-colum align-items-center justify-content-center'>
                                <h2 className="form-title text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-0">Sign Up</h2>
                                <form method='POST' className="register-form form" id="register-form" autocomplete="off">
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
                                        <label htmlfor="name">
                                            <i className="bi bi-person-circle me-3"></i>
                                        </label>
                                        <input type="text" name="name" id="name" autoComplete="off"
                                            value={user.name}
                                            onChange={handleChange}
                                            placeholder="Your Name" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
                                        <label htmlfor="email">
                                            <i className="bi bi-envelope-at-fill me-3"></i>
                                        </label>
                                        <input type="text" name="email" id="email" autoComplete="off"
                                            value={user.email}
                                            onChange={handleChange}
                                            placeholder="Your Email" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
                                        <label htmlfor="phone">
                                            <i className="bi bi-phone-fill me-3"></i>
                                        </label>
                                        <input type="number" name="phone" id="phone" autoComplete="off"
                                            value={user.phone}
                                            onChange={handleChange}
                                            placeholder="Your Phone" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
                                        <label htmlfor="work">
                                            <i className="bi bi-file-earmark-easel-fill me-3"></i>
                                        </label>
                                        <input type="text" name="work" id="work" autoComplete="off"
                                            value={user.work}
                                            onChange={handleChange}
                                            placeholder="Your Profession" className='w-100 border-0 border-bottom border-info' />
                                    </div>
                                    <div className="form-group d-flex flex-row align-items-center mb-2">
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
                                    <div className='form-btn form-group  text-center fw-bold  '>
                                        <input type="submit" name="signup" id="signup" className='btn form-btn'
                                            value="Register" onClick={PostData} />
                                    </div>
                                    <br></br>
                                    <Link to='/Login' className='signup-image-link ' style={{ "text-decoration": 'none', "color": 'steelblue', "paddingLeft": '19rem', "textSizeAdjust": 'auto' }}> I am Already Registered</Link>

                                </form>

                            </div>
                            {/* <div   className='signupimg col col2 order-2'>
                                    <figure>
                                        <img src={signp} alt='Registration ' width="90%" />

                                    </figure>
                                </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup