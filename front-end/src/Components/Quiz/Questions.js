import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../LoadingPage/Loading';



/** Custome Functions */
import { useFetchQuestion } from './red/functions/FetchQuestion'
import { updateResult } from './red/functions/setResult';


const Questions = ({onChecked}) => {
    
    
    const [checked, setchecked] = useState(undefined);
    const [{ isLoading, apiData, serverError }, setGetData] = useFetchQuestion();
   
 
    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const trace = useSelector(state=>state.questions.trace)
    const result = useSelector(state=>state.result.result)

    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(updateResult({trace,checked}));
    },[checked])




    const onSelect = (i) => {
onChecked(i);
setchecked(i);
dispatch(updateResult({trace,checked}));

    }
    if (isLoading) {return <><Loading /></>}
    if (serverError) return <>{serverError || "unknown Error"}</>
    return (
        <>

            <div className='qcontainer'>
                <div className='questions'>
                    <h2 className='text'>{questions?.question}</h2>
                    <ul key={questions?.id}>
                        {
                            questions?.Options.map((q, index) => (
                                <li key={index}>
                                    <input
                                        type="radio"
                                        value={true}
                                        name="options"
                                        id={`q${index}-option`}
                                        onChange={()=> onSelect(index)}
                                    />
                                    <label className='text-prim' htmlFor={`q${index}-option`}>{q}</label>
                                    <div className={`check ${result[trace]== index ? 'checked':''}`}></div>

                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>

        </>
    )
}

export default Questions