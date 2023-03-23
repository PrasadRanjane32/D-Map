import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from './red/result_reducer'
import './main.css'
import './MainQ.css'
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../Toastify/notifyToast";

const Main = () => {


    const [userName, setUserName] = useState ( () => {
        const savedItem = localStorage.getItem("username");
       const parsedItem = JSON.parse(savedItem);
       return parsedItem || "";
       });
  

    const inputRef = userName.name;
    const dispatch = useDispatch()


   const startQuiz=()=>{
        if(inputRef){
            dispatch(setUserId(inputRef))
        }else{
            notifyToast("Sorry ,Your need to login First", "error");
        }
    }
  return (
  <div className='body'>
     <div className='qcontainer'>
        <h1 className='title '>Quiz Application</h1>

        <ol>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <div className='start'>
            <Link className='btn' to={'/onquiz'} onClick={startQuiz}>Start Quiz</Link>
            
        </div>

    </div>
  </div>
  )
}

export default Main