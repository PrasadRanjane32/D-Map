import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css'


function JavaQuiz() {
    const [start, setStart] = useState(false);

    const questions = [
        {
            questionText: 'Number of primitive data types in Java are?',
            answerOptions: [
                { answerText: '8', isCorrect: true },
                { answerText: '7', isCorrect: false },
                { answerText: '6', isCorrect: false },
                { answerText: '9', isCorrect: false },
            ],
        },
        {
            questionText: 'What is the size of float and double in java?',
            answerOptions: [
                { answerText: '32 and 32', isCorrect: false },
                { answerText: '32 and 64', isCorrect: true },
                { answerText: '64 and 64', isCorrect: false },
                { answerText: '64 and 32', isCorrect: false },
            ],
        },
        {
            questionText: 'Automatic type conversion is possible in which of the possible cases?',
            answerOptions: [
                { answerText: 'Bute to Int', isCorrect: false },
                { answerText: 'Int to Long', isCorrect: true },
                { answerText: 'Long to Int', isCorrect: false },
                { answerText: 'Short to Int', isCorrect: false },
            ],
        },
        {
            questionText: 'Select the valid statement.',
            answerOptions: [
                { answerText: 'char[] ch = new char(5)', isCorrect: false },
                { answerText: 'char[] ch = new char[5]', isCorrect: true },
                { answerText: 'char[] ch = new char()', isCorrect: false },
                { answerText: 'char[] ch = new char[]', isCorrect: false },
            ],
        },
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const handleAnswerButtonClick = (isCorrect) => {
        if (isCorrect === true) {
            setScore(score + 1);
        }

        const nextQuetions = currentQuestion + 1;

        if (nextQuetions < questions.length) {
            setCurrentQuestion(nextQuetions);
        }
        else {
            setShowScore(true)
        }
    }

    function refreshPage() {
        window.location.reload(false);
      }

    return (
        <>
            <h1 className='Qheader'>Quiz</h1>
            

            <div className="Qapp">
            
               
                    {
                        showScore?(<>
                            {/* <div className='row'>

<button className='restart' onClick={refreshPage}>Replay</button>
<button className='quit' to={'/'}>Quit</button>
 </div>
                        
                    <div className = 'Qscore-section' >
                                You scored { score } out of { questions.length
                    }
                    </div> */}

                    <div className="result_box">
        <div className="icon">
            <i className="fas fa-crown"></i>
        </div>
        <div className="complete_text">You've completed the Quiz!</div>
        <div className="score_text">
            {/* <!-- Here I've inserted Score Result from JavaScript --> */}
            You scored { score } out of { questions.length
                    }
        </div>
        <div className="buttons  m-5 align-items-center" >
            <button onClick={refreshPage} className="restart p-2" style={{border:"1px solid white",borderRadius:"15px"}}>Replay Quiz</button>
            <Link to={'/'}>

            <button className="quit m-3 p-2" style={{border:"1px solid lightgreen",borderRadius:"15px"}}>Quit Quiz</button>
            </Link>
        </div>
    </div>
                    

                    </>
            )
            :
            (
            <>

                <div className='Qquestion-section'>
                    <div className='Qquestion-count'>
                        <span>Question {currentQuestion + 1} of </span>{questions.length}
                    </div>

                    <div className='Qquestion-text'>
                        {questions[currentQuestion].questionText}
                    </div>
                </div>

                <div className='Qanswer-section Q'>
                    {
                        questions[currentQuestion].answerOptions.map((answerOptions) => (
                            <button onClick={() => handleAnswerButtonClick(answerOptions.isCorrect)}>{answerOptions.answerText}</button>
                        ))
                    }
                </div>
            </>
                    )}
            
           

        </div>
        </>
    );
}

export default JavaQuiz;