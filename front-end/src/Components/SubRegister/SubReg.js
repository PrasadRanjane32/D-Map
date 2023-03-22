import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../Toastify/notifyToast";
import Loadings from '../LoadingPage/Loading'

import './SubReg.css'

const SubReg = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);

    const [userData, setUserData] = useState({ subjectname: '', icon: '',about:'', link: '', type: '', vlink: '', tname: '', desc: '', question: '', ans: '' });
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUserData({ ...userData, [name]: value })
        // console.log(userData);

    }
 

    const subjectRegister = async (e) => {
        e.preventDefault();
        setloading(true);

        const {
            subjectname,
            icon,
            about,
            link,
            type,
            vlink,
            tname,
            desc,
            question,
            ans } = userData;
        const res = await fetch("/subregister", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subjectname,
                icon,
                about,
                link,
                type,
                video: { vlink },
                notes: { tname, desc },
                questions: { question, ans }
            })
        })
        if ((await res).status === 201) {

            notifyToast("Subject Data Inserted", "success");
            setloading(false);

            navigate("/SubjectDashBoard");
          
        }
        if ((await res).status === 422) {
            notifyToast("Subject Is Already exists", "error");
            setloading(false);

        }
        if ((await res).status === 500) {
            notifyToast("Failed to register the subject", "error");
            setloading(false);

        }
        if ((await res).status === 400) {
            notifyToast("Data Is not Filled Properly", "error");
            setloading(false);


            console.log(res);

        }

    };
    if(loading){
        return(
          <>
      
          <Loadings/>
          </>
        )
      }else{
      
    return (
        <div className='body'>

        
        <div className='signin'>
                        <div className='back col-md-2'>
                <Link to='/SubjectDashBoard'>

                  <h2 className='btn '>
                    <i class="bi bi-box-arrow-left"></i>
                    Back
                  </h2>
                </Link>
              </div>
            <div className="subreg ">
                <div className="container main-wrap mb-5">
                    <div className='row  d-flex align-items-center justify-content-center '>


                        <h2 className="row form-title text-center mt-2 fw-bold ">Add New Subject </h2>

                        <form method="POST" className="register-form form row g-3">
                        <h3>Subject Details</h3>

                            <div className='form-input  col-md-12'>
                                <select
                                    name="type"
                                    value={userData.type}
                                    onChange={handleInputs}
                                    className='form-input mt-3 w-100 border-0 border-bottom border-info form-select'>
                                    <option>---Select Subject Type---</option>
                                    <option value="Programming Language">Programming Language</option>
                                    <option value="FrontEnd">FrontEnd</option>
                                    <option value="BackEnd">BackEnd</option>
                                    <option value="Android">Android</option>
                                    <option value="Web">Web</option>
                                </select>
                            </div>
                            <div className='form-input col-md-6'>
                                <input type="text" name="subjectname" id="name" autocomplete="off"
                                    value={userData.subjectname}
                                    onChange={handleInputs}
                                    placeholder="Subject Name" className='w-100 form-control border-0 border-bottom border-info' />
                            </div>
                            <div className='form-input col-md-6'>
                                <input type="text" name="icon" id="name" autocomplete="off"
                                    value={userData.icon}
                                    onChange={handleInputs}
                                    placeholder="Your Link of icon" className='w-100 form-control border-0 border-bottom border-info' />
                            </div>
                            <div className='form-input col-md-6'>
                                <input type="text" name="about" id="name" autocomplete="off"
                                    value={userData.about}
                                    onChange={handleInputs}
                                    placeholder="Description About" className='w-100 form-control border-0 border-bottom border-info' />
                            </div>
                            <div className='form-input col-md-6'>
                                <input type="text" name="link" id="name" autocomplete="off"
                                    value={userData.link}
                                    onChange={handleInputs}
                                    placeholder="Your Link of Page" className='w-100 form-control border-0 border-bottom border-info' />
                            </div>
                            <hr />
                            <div className='form-input col-md-6'>
                                <input type="text" name="vlink" id="name" autocomplete="off"
                                    value={userData.vlink}
                                    onChange={handleInputs}
                                    placeholder="Paste Video Link" className='w-100 form-control border-0 border-bottom border-info' />
                            </div>
                            <h3>Notes</h3>
                            <div className='form-input col-md-6'>
                                <input type="text" name="tname" id="name" autocomplete="off"
                                    value={userData.tname}
                                    onChange={handleInputs}
                                    placeholder="Your Topic Name" className='w-100 form-control border-0 border-bottom border-info' />
                            </div>
                            <div className='form-input col-md-6'>
                                <input type="text" name="desc" id="name" autocomplete="off"
                                    value={userData.desc}
                                    onChange={handleInputs}
                                    placeholder="Description Of Topic" className='w-100 form-control border-0 border-bottom border-info' />
                            </div>
                            <hr />
                            <h3>Question</h3>
                            <div className='form-input col-md-6'>
                                <input type="text" name="question" id="name" autocomplete="off"
                                    value={userData.question}
                                    onChange={handleInputs}
                                    placeholder="Questions of Topic" className='w-100 form-control border-0 border-bottom border-info' />
                            </div>
                            <div className='form-input col-md-6'>
                                <input type="text" name="ans" id="name" autocomplete="off"
                                    value={userData.ans}
                                    onChange={handleInputs}
                                    placeholder="Ans Of Question" className='w-100 form-control border-0 border-bottom border-info' />
                            </div>
                            <div className='form-group'>
                                <div className='text-center fw-bold'>
                                    <input type="submit" name="subreg" id="subreg" className='text-center btn btn-success'
                                        value="Register Subject"
                                        onClick={subjectRegister}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        </div>
    )
      }
}

export default SubReg