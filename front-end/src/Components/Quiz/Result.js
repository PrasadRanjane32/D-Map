import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Result.css'
import ResultTable from './ResultTable'
import { attemps_Number,earnPoints_Number,flagResult } from './helper/helper'

/**all action import */
import { resetAllaction } from './red/question_reducer'
import { resetResultaction } from './red/result_reducer'



const Result = () => {

    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state);
    useEffect(() => {
        console.log(flag);
    })
    const totalPoints = queue.length * 10;
    const attempts = attemps_Number(result)
    const earnPoints = earnPoints_Number(result,answers,10)
    const flag = flagResult(totalPoints,earnPoints)

    const dispatch = useDispatch();
    const onRestart = () => {
        dispatch(resetResultaction())
        dispatch(resetAllaction())

    }

    return (

        <>
            <div className='body'>

                <div className='qcontainer'>
                    <h1 className='title'>Quiz</h1>
                    <div className='result flex-center'>

                        <div className='flex'>
                            <span>UserName :</span>
                            <span className='bold'>{userId}</span>
                        </div>

                        <div className='flex'>
                            <span>Total Quiz Points :</span>
                            <span className='bold'>{totalPoints||0}</span>
                        </div>

                        <div className='flex'>
                            <span>Total Questions :</span>
                            <span className='bold'>{queue.length||0}</span>
                        </div>

                        <div className='flex'>
                            <span>Total Attempts :</span>
                            <span className='bold'>{attempts||0}</span>
                        </div>

                        <div className='flex'>
                            <span>Total Earn Points :</span>
                            <span className='bold'>{earnPoints||0}</span>
                        </div>

                        <div className='flex'>
                            <span>Quiz Result :</span>
                            <span style={{color:`${flag?"#2aff95":"#ff2a66"}`}} className='bold'>{flag ? "Passed":"Failed"}</span>
                        </div>

                    </div>
                    <div className='start'>
                        <Link className='btn' to={'/startquiz'} onClick={onRestart}>Restart</Link>
                    </div>
                </div>
                <div className='qcontainer'>
                    {/* <ResultTable /> */}
                </div>
            </div>
        </>
    )
}

export default Result