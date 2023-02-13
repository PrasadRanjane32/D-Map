import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css'


function ReactQuiz() {
    const [start, setStart] = useState(false);

    const questions = [
        {
            questionText: 'Which of the following is used in React.js to increase performance?',
            answerOptions: [
                { answerText: 'Virtual DOM', isCorrect: true },
                { answerText: 'Original DOM', isCorrect: false },
                { answerText: 'Both A and B', isCorrect: false },
                { answerText: 'None of the Above', isCorrect: false },
            ],
        },
        {
            questionText: 'What is ReactJS',
            answerOptions: [
                { answerText: 'Server-side framework', isCorrect: false },
                { answerText: 'User interface framework ', isCorrect: true },
                { answerText: 'Both A and B ', isCorrect: false },
                { answerText: ' None of the Above', isCorrect: false },
            ],
        },
        {
            questionText: 'Identify the one which is used to pass data to components from outside',
            answerOptions: [
                { answerText: 'Render with arguments', isCorrect: false },
                { answerText: 'props', isCorrect: true },
                { answerText: 'setState', isCorrect: false },
                { answerText: 'PropTypes', isCorrect: false },
            ],
        },
        {
            questionText: 'Who created React.js?',
            answerOptions: [
                { answerText: 'Jordan Mike', isCorrect: false },
                { answerText: 'Jordan Walke', isCorrect: true },
                { answerText: 'Time Lee', isCorrect: false },
                { answerText: 'Jordan Lee', isCorrect: false },
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

export default ReactQuiz;