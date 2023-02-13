import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signin from '../../Assets/Images/contact1.png'
import { UserContext } from '../../App'
const Login = () => {

    const {state, dispatch} = useContext(UserContext);




    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');


    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email, password
            })
        })
        
        if ((await res).status === 400) {
            window.alert("Inavalid Credential");
            
        } else {
            dispatch({type:"USER", payload:true})
            window.alert("Login Successfull");
            navigate("/");
            console.log(res);
            
        }

    };

    return (

        <>
            <div className='signin'>
                <div className="container main-wrap mb-5">
                    <div className='row  d-flex align-items-center justify-content-center '>


                        <div className='col-md-6'>
                            <div className='card  px-5 py-5'>


                                <div className='mt-3 '>

                                    <div className='col-md-6 text-center'>

                                        <h2 className="row form-title text-center h1 fw-bold mb-5 mx-1 mx-md-6 mt-2"> Sign In</h2>

                                    </div>
                                    <form method="POST">

                                        <div className='form-input mb-3'>

                                            <i className="bi bi-envelope-at-fill"></i>

                                            <input type="text" name="email" id="email" autocomplete="off"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Your Email" className='w-100 form-control border-0 border-bottom border-info' />
                                        </div>
                                        <div className='form-input mb-3'>
                                            <label htmlfor="password">
                                                <i className="bi bi-key-fill me-3"></i>
                                            </label>
                                            <input type="password" name="password" id="password" autocomplete="off"
                                                value={password}
                                                onChange={(e) => setpassword(e.target.value)}
                                                placeholder="Your Password" className='w-100 form-control border-0 border-bottom border-info' />
                                        </div>
                                        <div className='form-group'>
                                            <div className='form-btn  text-center fw-bold'>
                                                <input type="submit" name="signin" id="signin" className='form-submit'
                                                    value="Log In"
                                                    onClick={loginUser}
                                                />
                                            </div>
                                            <Link to='/Signup' className='sub-title' style={{ "text-decoration": 'none', "color": 'steelblue', "marginLeft": '5rem', "textSizeAdjust": 'auto' }}> Create an Account.</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* <div className="card text-black  form-wrap" style={{ borderRadius: '25px' }}>
                    <div className="card-body signin-form">
                        <div className='row'>
                            <div className='col-md-6 justify-content-center align-items-center' style={{"marginTop":'12%' ,"justifyContent":'center',"alignItems":'center',"padding":'2rem'}}>
                                <figure>
                                    <img  src={signin} alt='Registration ' width="99%" draggable="false"/>

                                </figure>
                            </div>
                            <div className='m-5 col-md-6 order-2 order-lg-1 flex-colum align-items-center justify-content-center'>
                                <h2 className="row form-title text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">Sign In</h2>
                                <form className="register-form form" id="register-form">

                                    <div className="form-group d-flex  mb-4">
                                        <label htmlfor="email">
                                            <i className="bi bi-envelope-at-fill me-3"></i>
                                        </label>
                                        <input type="text" name="email" id="email" autocomplete="off"
                                            placeholder="Your Email" className='form-control border-0 border-bottom border-info' />
                                    </div>

                                    <div className="form-group d-flex flex-row align-items-center mb-4">
                                        <label htmlfor="password">
                                            <i className="bi bi-key-fill me-3"></i>
                                        </label>
                                        <input type="text" name="password" id="password" autocomplete="off"
                                            placeholder="Your Password" className='w-100 border-0 border-bottom border-info' />
                                    </div>

                                    <div className='form-group form-btn text-center fw-bold mb-2 mx-1 mx-md-4 mt-2 '>
                                        <input type="submit" name="signin" id="signin" className='btn form-submit '
                                            value="Log In" />
                                    </div>
                                    <Link to='/Signup' className='signin-image-link' style={{ "text-decoration": 'none', "color": 'steelblue',"marginLeft":'5rem',"textSizeAdjust":'auto' }}> Create an Account.</Link>

                                </form>
                                

                            </div>

                        </div>
                    </div>
                </div> */}
                </div>
            </div>
        </>
    )
}

export default Login