import React, { useEffect, useState } from 'react'
import Questions from './Questions';
import { moveNextAction,movePrevAction } from './red/question_reducer';
import { PushAnswer } from './red/functions/setResult';
/**redu store inport */
import { useSelector,useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';




const Quiz = () => {


const [check,setChecked] = useState(undefined);

    const result = useSelector(state=>state.result.result)
    const { queue,trace} = useSelector(state=>state.questions)
    const dispatch = useDispatch();

   

    // next button handler
    const onNext = () => {
        if(trace < queue.length){

            /**update trace value by 1 */
           
                   dispatch(moveNextAction());
                   /** isert a new result in array */
                if(result.length<=trace){
                    /** finished exam after last question  */
                    dispatch(PushAnswer(check));

                }
                }
                /**reset the value of the checked question*/
setChecked(undefined);
    }

    // Prev button handler
    const onPrev = () => {
        if(trace>0){

            /**update trace value by - 1 */
              dispatch(movePrevAction());
              
        }
    }

const onChecked=(check)=>{
setChecked(check);
}

if(result.length && result.length >= queue.length)
{
    
   return <Navigate to={'/result'} replace="true"></Navigate>
}

    return (
        <>
            <div className='body'>
                <div className='qcontainer'>
                    <h1 className='title'>Quiz</h1>
                    {/* Disaplay questions */}
                    <Questions onChecked={onChecked}/>
                    <div className='grid'>
                    {trace>0? <button className='btn prev' onClick={onPrev}>Prev</button>:<div></div>
}
                        <button className='btn next' onClick={onNext}>Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quiz