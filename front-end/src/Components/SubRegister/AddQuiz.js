import React, { useState } from 'react'
import { Await, Link } from 'react-router-dom';

const UpdateSub = () => {
    const [quizData, setQuizData] = useState({ questionText: '', answerText1: '', answerText2: '', answerText3: '', answerText4: '', isCorrect1: '', isCorrect2: '', isCorrect3: '', isCorrect4: '' });
    // const [desc, setDesc] = useState('');
    const [subjectname, setSubjectname] = useState('');
    const [subid, setSubid] = useState('');
    const subpassid = subid._id;

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuizData({ ...quizData, [name]: value });
    }
    const AddQuiz = async (e) => {
        e.preventDefault();
        const {questionText, answerText1, answerText2, answerText3, answerText4, isCorrect1, isCorrect2, isCorrect3, isCorrect4 } = quizData
        const res = await fetch("/addquizdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                subpassid,
                questionText, answerText1, answerText2, answerText3, answerText4, isCorrect1, isCorrect2, isCorrect3, isCorrect4
            })
        })
        if ((await res).status === 201) {
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

        if ((await res).status === 200) {
            window.alert("Data Found");
            const data = await res.json();
            console.log(data);
            setSubid(data);
            console.log(subid._id);

        } else {

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

                                        <h2 className="row form-title text-center h1 fw-bold mb-5 mx-1 mx-md-6 mt-2"> Add Subject Notes</h2>

                                    </div>
                                    <form method="POST">

                                        <div className='form-input mb-3'>



                                            <input type="text" name="tname" id="tname" autocomplete="off"
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



                                            <input type="text" name="questionText" id="questionText" autocomplete="off"
                                                value={quizData.questionText}
                                                onChange={handleInputs}
                                                placeholder="Topic Name" className='w-100 form-control border-0 border-bottom border-info' />
                                        </div>
                                        <div className='form-input mb-3'>

                                            <input type="text" name="answerText1" id="answerText1" autocomplete="off"
                                                value={quizData.answerText1}
                                                onChange={handleInputs}
                                                placeholder="Put Choices Her" className='w-100 form-control border-0 border-bottom border-info' />
                                            <input
                                                type="checkbox"
                                                id="isCorrect1"
                                                name="isCorrect1"
                                                onChange={handleInputs}
                                                value={quizData.isCorrect1}
                                            />
                                        </div>
                                        <div className='form-input mb-3'>

                                            <input type="text" name="answerText2" id="answerText2" autocomplete="off"
                                                value={quizData.answerText2}
                                                onChange={handleInputs}
                                                placeholder="Put Choices Her" className='w-100 form-control border-0 border-bottom border-info' />
                                                 <input
                                                type="checkbox"
                                                id="isCorrect2"
                                                name="isCorrect2"
                                                onChange={handleInputs}
                                                value={quizData.isCorrect2}
                                            />
                                        </div>
                                        <div className='form-input mb-3'>

                                            <input type="text" name="answerText3" id="answerText3" autocomplete="off"
                                                value={quizData.answerText3}
                                                onChange={handleInputs}
                                                placeholder="Put Choices Her" className='w-100 form-control border-0 border-bottom border-info' />
                                                 <input
                                                type="checkbox"
                                                id="isCorrect3"
                                                name="isCorrect3"
                                                onChange={handleInputs}
                                                value={quizData.isCorrect3}
                                            />
                                        </div>
                                        <div className='form-input mb-3'>

                                            <input type="text" name="answerText4" id="answerText4" autocomplete="off"
                                                value={quizData.answerText4}
                                                onChange={handleInputs}
                                                placeholder="Put Choices Her" className='w-100 form-control border-0 border-bottom border-info' />
                                                 <input
                                                type="checkbox"
                                                id="isCorrect4"
                                                name="isCorrect4"
                                                onChange={handleInputs}
                                                value={quizData.isCorrect4}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <div className='form-btn  text-center fw-bold'>
                                                <input type="submit" name="signin" id="signin" className='form-submit'
                                                    value="Update"
                                                    onClick={AddQuiz}
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