import React, { useState } from 'react'
import { Await, Link } from 'react-router-dom';
import './SubReg.css'
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../Toastify/notifyToast";
const UpdateSub = () => {
    const [tname, setTname] = useState('');
    const [desc, setDesc] = useState('');
    const [subjectname, setSubjectname] = useState('');
    const [subid, setSubid] = useState('');
    const subpassid = subid._id;


    const Updatesubd = async (e) => {
        e.preventDefault();

        const res = await fetch("/upsubdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                subpassid, tname, desc
            })
        })
        if ((await res).status === 201) {
            // window.alert("Data Added");
            notifyToast("Subject Data Inserted", "success");
        }
    };
    const findsubject = async (e) => {
        e.preventDefault();
        const res = await fetch("/fsubu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subjectname
            })
        })

        if ((await res).status === 200) {
            notifyToast("Subject Data Found", "success");
            notifyToast("Insert the Notes Below", "success");
            // window.alert("Data Found");
            const data = await res.json();
            console.log(data);
            setSubid(data);
            console.log(subid._id);

        } else {

            // window.alert("data not found");
            notifyToast("Subject Data not found", "error");
        }
    }
    return (
        <>
            <div className='signin'>
                <div className="container main-wrap mb-5">
                    <div className='row  d-flex align-items-center justify-content-center '>


                        <div className='col-md-6'>
                            <div className='card  px-5 py-5'>


                                <div className='mt-3 '>

                                    <div className='col-md-6 text-center'>

                                        <h2 className="row form-title text-center h1 mt-2">Add Notes</h2>

                                    </div>
                                    <form method="POST" className="register-form form row g-3 ">
                                        <div className="input-group">
                                            <input type="text" name="tname" id="tname" autocomplete="off"
                                                value={subjectname}
                                                onChange={(e) => setSubjectname(e.target.value)}
                                                placeholder="Subject Name" className="form-control border-bottom border-info"  aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                            <button className="btn btn-outline-secondary  border-bottom border-info bi bi-binoculars" type="button" name="signin" id="button-addon2" 
                                                        value="Find Subject"
                                                        onClick={findsubject}>Find</button>
                                        </div>
<h3>Notes</h3>
                                        <div className='form-input '>



                                            <input type="text" name="tname" id="tname" autocomplete="off"
                                                value={tname}
                                                onChange={(e) => setTname(e.target.value)}
                                                placeholder="Topic Name" className='w-100 form-control border-0 border-bottom border-info' />
                                        </div>
                                        <div className='form-input '>

                                            <input type="text" name="description" id="desc" autocomplete="off"
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                                placeholder="Description" className='w-100 form-control border-0 border-bottom border-info' />
                                        </div>
                                        <div className='form-group'>
                                            <div className='text-center fw-bold'>
                                                <input type="submit" name="signin" id="signin" className='form-btn form-submit'
                                                    value="Update"
                                                    onClick={Updatesubd}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default UpdateSub