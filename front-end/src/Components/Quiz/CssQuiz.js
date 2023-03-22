import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css'


function CssQuiz() {
    const [start, setStart] = useState(false);

    const questions = [
        {    
            questionText: 'The full form of CSS is:',
            answerOptions: [
                { answerText: 'Cascading Style Sheets', isCorrect: true },
                { answerText: 'Coloured Special Sheets', isCorrect: false },
                { answerText: 'Color and Style Sheets', isCorrect: false },
                { answerText: 'None of the Above', isCorrect: false },
            ],
        },
        {
            questionText: 'How can we change the background color of an element?',
            answerOptions: [
                { answerText: 'Background-color', isCorrect: true  },
                { answerText: 'Color ', isCorrect: false },
                { answerText: 'Both A and B ', isCorrect: false },
                { answerText: ' None of the Above', isCorrect: false },
            ],
        },
        {
            questionText: 'How can we change the text color of an element?',
            answerOptions: [
                { answerText: '1', isCorrect: false  },
                { answerText: '2', isCorrect: false },
                { answerText: '3', isCorrect: true },
                { answerText: '4', isCorrect: false },
            ],
        },
        {
            questionText: 'In how many ways can CSS be written in?',
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

export default CssQuiz;