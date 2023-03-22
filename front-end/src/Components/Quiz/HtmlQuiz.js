import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css'


function HtmlQuiz() {
    const [start, setStart] = useState(false);

    const questions = [
        {
            questionText: 'What does the abbreviation HTML stand for?',
            answerOptions: [
                { answerText: 'HyperText Markup Language', isCorrect: true },
                { answerText: 'HightText Markup Language', isCorrect: false },
                { answerText: 'HyperText Markdown Language', isCorrect: false },
                { answerText: 'None of the Above', isCorrect: false },
            ],
        },
        {
            questionText: 'How many sizes of headers are available in HTML by default?',
            answerOptions: [
                { answerText: '5', isCorrect: false },
                { answerText: '1', isCorrect: false },
                { answerText: '3', isCorrect: false },
                { answerText: '6', isCorrect: true },
            ],
        },
        {
            questionText: 'What is the smallest header in HTML by default?',
            answerOptions: [
                { answerText: 'h1', isCorrect: false },
                { answerText: 'h2', isCorrect: false },
                { answerText: 'h6', isCorrect: true },
                { answerText: 'h4', isCorrect: false },
            ],
        },
        {
            questionText: 'What are the types of lists available in HTML?',
            answerOptions: [
                { answerText: 'Ordered,Unordered Lists', isCorrect: true },
                { answerText: 'Bulleted,Numbered Lists', isCorrect: false },
                { answerText: 'Named,Unnamed Lists', isCorrect: false },
                { answerText: 'None of Above', isCorrect: false },
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

export default HtmlQuiz;