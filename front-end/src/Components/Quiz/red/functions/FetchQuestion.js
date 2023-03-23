/**these is fecth question for fetch data of question and set to store value */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
// import data,{answers} from '../../Database/data';

/**red action */
import * as Action from '../question_reducer';


export const useFetchQuestion = () => {

    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });
    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));


        (async () => {

            
            try {
                const res = await fetch("/getquestions", {
                    method: "GET",
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                    const data = await res.json();
                    console.log(data);

                    const ress = await fetch("/getquestions", {
                        method: "GET",
                        headers: {
                            Accept: "*/*",
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    });
                        const answers = await ress.json();
                        console.log(answers);
                let question = data;
       
                if (question.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({ ...prev, apiData: {question,answers} }));
                    /**dispatch and action */
                    dispatch(Action.startExamAction({question,answers}))
                } else {
                    throw new Error("No Questions Found");
                }

            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }));
                setGetData(prev => ({ ...prev, serverError: error }));

            }
        })();

    }, [dispatch]);

    return [getData,setGetData];

}

 /**Mveaction dispatch function */
 export const moveNextAction=()=>async(dispatch)=>{
    
    try{
        dispatch(Action.moveNextAction())

    }catch(error){
        console.log(error);

    }
 }

 export const movePrevAction=()=>async(dispatch)=>{
    
    try{
        dispatch(Action.movePrevAction())

    }catch(error){
        console.log(error);

    }
 }