import React, { useState } from 'react';
import { Await, Link } from 'react-router-dom';

const UpdateSubQue = () => {
    const [question, setQuestion] =useState('');
    const [ans, setAns] = useState('');
    const [subjectname, setSubjectname] = useState('');
    const [subid, setSubid] = useState('');
    const subpassid =subid._id;

    const Updatesubd = async (e) => {
        e.preventDefault();

        const res = await fetch("/upsubintque", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                subpassid, question, ans
            })
        })
        if((await res).status === 201){
            window.alert("Data Added");
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
       
        if((await res).status === 200){
        window.alert("Data Found");
        const data = await res.json();
        console.log(data);
        setSubid(data);
console.log(subid._id);

}else{
    
    window.alert("data not found");
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

                                        <h2 className="row form-title text-center h1 fw-bold mb-5 mx-1 mx-md-6 mt-2"> Add Interview Questions</h2>

                                    </div>
                                    <form method="POST">

                                        <div className='form-input mb-3'>



                                            <input type="text" name="question" id="tname" autocomplete="off"
                                                value={subjectname}
                                                onChange={(e) => setSubjectname(e.target.value)}
                                                placeholder="Subject Name" className='w-100 form-control border-0 border-bottom border-info' />

                                            <div className='form-group'>
                                                <div className='form-btn  text-center fw-bold'>
                                                    <input type="submit" name="signin" id="signin" className='form-submit'
                                                        value="Find Subject"
                                                        onClick={findsubject}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className='form-input mb-3'>



                                            <input type="text" name="question" id="question" autocomplete="off"
                                                value={question}
                                                onChange={(e) => setQuestion(e.target.value)}
                                                placeholder="Question" className='w-100 form-control border-0 border-bottom border-info' />
                                        </div>
                                        <div className='form-input mb-3'>

                                            <input type="text" name="ans" id="ans" autocomplete="off"
                                                value={ans}
                                                onChange={(e) => setAns(e.target.value)}
                                                placeholder="Provide Answer" className='w-100 form-control border-0 border-bottom border-info' />
                                        </div>
                                        <div className='form-group'>
                                            <div className='form-btn  text-center fw-bold'>
                                                <input type="submit" name="signin" id="signin" className='form-submit'
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

export default UpdateSubQue