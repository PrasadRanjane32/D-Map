
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../../../Toastify/notifyToast";
import '../../../SubRegister/SubReg.css'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';



const EditSubject = () => {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({ question: '', Options: '', answerText1: '', answerText2: '', answerText3: '', answerText4: '', isCorrect: '' });

    const [subjectData, setsubjectData] = useState({ _id: '', subjectname: '', icon: '', link: '', about: '', notes: '', questions: '', tname: '', desc: '', type: '', question: '', ans: '', vlink: '' });
    let name, value;
    const [tname, setTname] = useState('');
    const [desc, setDesc] = useState('');
    const [subjectname, setSubjectname] = useState('');
    const [subid, setSubid] = useState('');


    const handleInputsq = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuizData({ ...quizData, [name]: value });
    }
    const AddQuiz = async (e) => {
        e.preventDefault();
        const { question, answerText1, answerText2, answerText3, answerText4, isCorrect } = quizData;
      
        const res = await fetch("/insertquestions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subpassid,
                quiz: [{
                    question,
                    Options: [answerText1, answerText2, answerText3, answerText4]
                }
                ],
                answers: [isCorrect]
            })
        })
        if ((await res).status === 201) {
          
            window.location.reload(false);
            notifyToast("Subject quiz Inserted", "success");
            setQuizData('');
        } else {
            notifyToast("Subject quiz unable to Inserted", "error");
        }
    };

    const subpassid = subjectData._id;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setsubjectData({ ...subjectData, [name]: value })
        // console.log(subjectData);

    }

    const Updatesubject = async (e) => {
        e.preventDefault();
        const {
            _id,
            subjectname,
            icon,
            about,
            link,
            type,
            vlink,
            tname,
            desc,
            question,
            ans } = subjectData;
        const res = await fetch("/updateSubject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id,
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

            notifyToast("Subject Data Updated", "success");
            navigate("/SubjectDashBoard");
        }
        if ((await res).status === 422) {
            notifyToast("Subject Is Already exists", "error");
        }
        if ((await res).status === 500) {
            notifyToast("Failed to Update the subject", "error");
        }
        if ((await res).status === 400) {
            notifyToast("Data Is not Filled Properly", "error");

            console.log(res);

        }

    };

    const passSub = async (subjectID) => {
        try {
            const res = await fetch("/fsub", {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            setsubjectData({
                ...subjectData, _id: data._id, subjectname: data.subjectname, icon: data.icon, link: data.link, about: data.about, type: data.type, vlink: data.vlink, notes: data.notes, questions: data.questions, tname: data.tname, desc: data.desc, question: data.question, ans: data.ans
            });



            if (data !== undefined) {
                // setloading(false);
                // findsubject();
            }
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }


        }
        catch (err) {
            console.log(err);

        }
    }


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
            notifyToast("Subject Notes Inserted", "success");
            setTname('');
            setDesc('');
        } else {
            notifyToast("Subject Notes unable to Inserted", "error");
        }
    };

    const [question, setQuestion] = useState('');
    const [ans, setAns] = useState('');
    const subQuiid = subjectData._id;

    const UpdateQui = async (e) => {
        e.preventDefault();

        const res = await fetch("/upsubintque", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                subQuiid, question, ans
            })
        })
        if ((await res).status === 201) {
            notifyToast("Subject Questions & Answer Inserted", "success");
            

        } else {
            notifyToast("Subject Questions & Answer unable to Inserted", "error");

        }
    };


    useEffect(() => {
        passSub();


    }, []);


    return (
        <div className='body'>
            <div className='signin '>
                <div className='back col-md-2'>
                    <Link to='/SubjectDashBoard'>

                        <h2 className='btn '>
                            <i class="bi bi-box-arrow-left"></i>
                            Back
                        </h2>
                    </Link>
                </div>

                <div className="subreg">
                    <div className="container main-wrap mb-5">
                        <div className='row  d-flex align-items-center justify-content-center '>


                            <h2 className="row form-title text-center mt-2 fw-bold ">Update Subject Details</h2>


                            <form method="POST" className="register-form form row g-3">
                                <h3>Subject Details</h3>

                                <div className='form-input  col-md-12'>
                                    <select
                                        name="type"
                                        value={subjectData.type}
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
                                        value={subjectData.subjectname}
                                        onChange={handleInputs}
                                        placeholder="Subject Name" className='w-100 form-control border-0 border-bottom border-info' />
                                </div>
                                <div className='form-input col-md-6'>
                                    <input type="text" name="icon" id="name" autocomplete="off"
                                        value={subjectData.icon}
                                        onChange={handleInputs}
                                        placeholder="Your Link of icon" className='w-100 form-control border-0 border-bottom border-info' />
                                </div>
                                <div className='form-input col-md-6'>
                                    <input type="text" name="about" id="name" autocomplete="off"
                                        value={subjectData.about}
                                        onChange={handleInputs}
                                        placeholder="Description About" className='w-100 form-control border-0 border-bottom border-info' />
                                </div>
                                <div className='form-input col-md-6'>
                                    <input type="text" name="link" id="name" autocomplete="off"
                                        value={subjectData.link}
                                        onChange={handleInputs}
                                        placeholder="Your Link of Page" className='w-100 form-control border-0 border-bottom border-info' />
                                </div>
                                <hr />
                                <div className='text-uppercase ' style={{fontSize:"1.55em"}}>
                                    <Accordion className='mt-2' allowZeroExpanded>
                                        <AccordionItem >
                                            <AccordionItemHeading>
                                                <AccordionItemButton >
                                                    Notes
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                             
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
                                                            <input type="submit" name="signin" id="signin" className='text-center btn btn-success'
                                                                value="Add Notes"
                                                                onClick={Updatesubd}
                                                            />
                                                        </div>
                                                    </div>
                                               
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    </Accordion>





                                </div>



                                <hr />
                                <div className='text-uppercase ' style={{fontSize:"1.55em"}}>




                                <Accordion className='mt-2'  allowZeroExpanded>
                                                                        <AccordionItem >
                                                                            <AccordionItemHeading>
                                                                                <AccordionItemButton>
                                                                                  

                                    Interview Questions
                                                                                </AccordionItemButton>
                                                                            </AccordionItemHeading>
                                                                            <AccordionItemPanel>
                                                                              

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
                                        <div className='text-center fw-bold d-flex justify-content-around'>
                                            <input type="submit" name="signin" id="signin" className='text-center btn btn-success'
                                                value="Add Questions & Ans"
                                                onClick={UpdateQui}
                                            />
                                        </div>
                                    </div>

                                                                            </AccordionItemPanel>
                                                                            </AccordionItem>
                                                                    </Accordion>





                                </div>
                                <hr />
                                <div className='text-uppercase ' style={{fontSize:"1.55em"}}>

                                <Accordion className='mt-2'  allowZeroExpanded>
                                                                        <AccordionItem >
                                                                            <AccordionItemHeading>
                                                                                <AccordionItemButton>
                                                                                   
                                        Add Quiz Question & Answer
                                                                                </AccordionItemButton>
                                                                            </AccordionItemHeading>
                                                                            <AccordionItemPanel>
                                                                               

                                    <div className=' mb-3'>


                                        <input type="text" name="question" id="question" autocomplete="off"
                                            value={quizData.question}
                                            onChange={handleInputsq}
                                            placeholder="Question"
                                            className='w-100  form-control border-0 border-bottom border-info' />
                                    </div>
                                    <div className='form-input mb-3 row '>
                                        <div className='col-md-1'>

                                            <input
                                                type="radio"
                                                id="isCorrect"
                                                name="isCorrect"
                                                value={0}
                                                onChange={handleInputsq}
                                            />
                                        </div>
                                        <div className='col-md-11'>
                                            <input type="text" name="answerText1" id="answerText1" autocomplete="off"
                                                value={quizData.answerText1}
                                                onChange={handleInputsq}
                                                placeholder="Add Answer"
                                                className='w-100 form-control border-0 border-bottom border-info col-md-10' />
                                        </div>

                                    </div>

                                    <div className='form-input mb-3 row '>
                                        <div className='col-md-1'>
                                            <input
                                                type="radio"
                                                id="isCorrect"
                                                name="isCorrect"
                                                value={1}
                                                onChange={handleInputsq}
                                            />
                                        </div>
                                        <div className='col-md-11'>
                                            <input type="text" name="answerText2" id="answerText2" autocomplete="off"
                                                value={quizData.answerText2}
                                                onChange={handleInputsq}
                                                placeholder="Add Answer" className='w-100 form-control border-0 border-bottom border-info' />

                                        </div>
                                    </div>

                                    <div className='form-input mb-3 row '>
                                        <div className='col-md-1'>
                                            <input
                                                type="radio"
                                                id="isCorrect"
                                                name="isCorrect"
                                                value={2}
                                                onChange={handleInputsq}
                                            />
                                        </div>

                                        <div className='col-md-11'>
                                            <input type="text" name="answerText3" id="answerText3" autocomplete="off"
                                                value={quizData.answerText3}
                                                onChange={handleInputsq}
                                                placeholder="Add Answer" className='w-100 form-control border-0 border-bottom border-info' />

                                        </div>
                                    </div>

                                    <div className='form-input mb-3 row '>

                                        <div className='col-md-1'>
                                            <input
                                                type="radio"
                                                id="isCorrect"
                                                name="isCorrect"
                                                value={3}
                                                onChange={handleInputsq}
                                            />
                                        </div>

                                        <div className='col-md-11'>
                                            <input type="text" name="answerText4" id="answerText4" autocomplete="off"
                                                value={quizData.answerText4}
                                                onChange={handleInputsq}
                                                placeholder="Add Answer" className='w-100 form-control border-0 border-bottom border-info' />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <div className='text-center fw-bold'>
                                            <input type="submit" name="signin" id="signin" className='text-center btn btn-success'
                                                value="Add Quiz"
                                                onClick={AddQuiz}
                                            />
                                        </div>
                                    </div>

                                                                            </AccordionItemPanel>
                                                                            </AccordionItem>
                                                                    </Accordion>

                                </div>
                                <hr />

                                <div className='form-group'>
                                    <div className='text-center fw-bold d-flex justify-content-around'>
                                        <input type="submit" name="subreg" id="subreg" className='text-center btn btn-success'
                                            value="Update Subject"
                                            onClick={Updatesubject}
                                        />
                                        <Link to='/SubjectDashBoard' className='btn btn-warning'>Cancel</Link>

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



export default EditSubject