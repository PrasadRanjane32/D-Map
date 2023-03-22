import React, { useEffect, useState } from 'react'
import './MediaView.css'
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../Toastify/notifyToast";
import { Link, useNavigate } from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { useCookies } from 'react-cookie';
import Loadings from '../LoadingPage/Loading'



const MediaView = () => {
    const [sEnrolled, setSenroll] = useState(false);
    const navigate = useNavigate();
    const [lsubjectid, setSubjid] = useState ( () => {
        const savedItem = localStorage.getItem("Subjectid");
       const parsedItem = JSON.parse(savedItem);
       return parsedItem || "";
       });
       const [newEnsubid, setnewSubjid] = useState ( () => {
        const savedid = localStorage.getItem("newenrolledid");
       const parsedItem = JSON.parse(savedid);
       return parsedItem || "";
       });
    const [sData, setSdata] = useState();
    const [loading, setloading] = useState(true);



  
       


    const EnrollSub = async (subjectID) => {
        setloading(true);

        try {
            const res = await fetch("/enrollsub", {
                method: "POST",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
           
            const data = await res.json();
            // console.log(data);
            localStorage.setItem('username', JSON.stringify(data));
            localStorage.setItem('newenrolledid', JSON.stringify(lsubjectid));
           
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            if ((await res.status) === 400) {

                notifyToast("Sorry ,Your not able to Enroll", "error");
                console.log("Invalid Enrollment");
            }
            if ((await res.status) === 201) {
                window.location.reload(false);
                checkenroll();
                notifyToast("Your Enrolled SuccessFully", "success");
               
              
                
            }

        
        }
        catch (err) {
            console.log(err);
            notifyToast("Sorry ,Your need to login First", "error");

            navigate("/Login");

        }finally{
            setloading(false);
          checkenroll();
        }
    }

    const passSub = async (subjectID) => {
        try {
            const res = await fetch("/fsub", {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
          
            const data = await res.json();
         
            setSdata(data);
         
            if (data !== undefined) {
                setloading(false);
              checkenroll();
            }
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }


        }
        catch (err) {
            console.log(err);
            // navigate("/Login");
        }
    }
    
    
    
        const [userName, setUserName] = useState ( () => {
            const savedItem = localStorage.getItem("username");
           const parsedItem = JSON.parse(savedItem);
           return parsedItem || "";
           });
           const enroll = userName.enrolled;
    const checkenroll =()=>{
        enroll?.map((e)=>{
            const enrolledid = e.ensub;
           
            if( enrolledid == lsubjectid || newEnsubid == lsubjectid){
                setSenroll(true);
            }
          
            
        })
     
     }
    


        
        
        
    



    useEffect(() => {
        passSub();
        checkenroll();
    }, []);
    if(loading){
        return(
          <>
      
          <Loadings/>
          </>
        )
        }else{
        const { _id, subjectname, icon, about, type, notes, tname, desc, questions, question, ans, video, vlink } = sData;
        return (
            <>
             <div className='body'>
            
                    <div className='back col-md-2'>
                <Link to='/Allpath'>

                  <h2 className='btn '>
                    <i class="bi bi-box-arrow-left"></i>
                    Back
                  </h2>
                </Link>
                
              </div>
                <div id="tf-main">

                    <div id="page-track-about">

                        <header className="c-track-header "><div className="lg-container container">
                            <div className="flex items-center">
                                <div className="flex-grow">
                                    <div className="flex items-center relative lg:static" >
                                        <div className="c-react-component c-react-wrapper-dropdowns-track-menu" data-react-id="dropdowns-track-menu" data-react-data="{&quot;track&quot;:{&quot;slug&quot;:&quot;awk&quot;,&quot;title&quot;:&quot;AWK&quot;,&quot;course&quot;:false,&quot;num_concepts&quot;:0,&quot;num_exercises&quot;:58,&quot;web_url&quot;:&quot;https://exercism.org/tracks/awk&quot;,&quot;icon_url&quot;:&quot;https://dg8krxphbh767.cloudfront.net/tracks/awk.svg&quot;,&quot;tags&quot;:[&quot;Scripts&quot;,&quot;Procedural&quot;,&quot;Interpreted&quot;,&quot;Standalone executable&quot;,&quot;Weak&quot;,&quot;Linux&quot;,&quot;Mac OSX&quot;,&quot;Windows&quot;],&quot;last_touched_at&quot;:null,&quot;is_new&quot;:false,&quot;links&quot;:{&quot;self&quot;:&quot;https://exercism.org/tracks/awk&quot;,&quot;exercises&quot;:&quot;https://exercism.org/tracks/awk/exercises&quot;,&quot;concepts&quot;:&quot;https://exercism.org/tracks/awk/concepts&quot;}},&quot;links&quot;:{&quot;repo&quot;:&quot;https://github.com/exercism/awk&quot;,&quot;documentation&quot;:&quot;https://exercism.org/docs/tracks/awk&quot;}}" data-react-hydrate="false"></div>
                                        <img alt={subjectname} className="c-track-icon mr-16 lg:mr-20 " src={icon} />
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <div className="text-h1 md:mr-24">{subjectname}</div>
                                            <div className="items-center">
                                                {type}
                                            </div>
                                            <div className="tags lg:hidden mt-8"></div>
                                        </div>
                                    </div>



                                    <ul className='nav nav-pills nav-fill col-sm-12' role='tablist'>
                                        <li className='nav-item'

                                        >

                                            <a className="c-tab-2 nav-link active p-3  d-flex justify-content-center gap-2" id='about-tab' data-toggle='tab' href='#about' role='tab'>
                                                <i className="bi bi-exclamation-circle"></i>
                                                <span> About</span>
                                            </a>
                                        </li>
                                        {sEnrolled ?  
                                                        <>
                                        <li className='nav-item'>


                                            <a className="c-tab-2 nav-link p-3  d-flex justify-content-center gap-2" id='notes-tab' data-toggle='tab' href='#notes' role='tab'>
                                                <i className="bi bi-journal-code"></i>
                                                <span> Notes</span>
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a className="c-tab-2 nav-link p-3  d-flex justify-content-center gap-2" id='interview-tab' data-toggle='tab' href='#interview' role='tab'>
                                                <i className="bi bi-journal-bookmark"></i>
                                                <span> interview Questions</span>
                                            </a>
                                        </li>
                                        </>
                                                   
                                                   :
                                                   <li className='nav-item'>
                                            <a className="c-tab-2 nav-link p-3 disabled" id='about-tab' data-toggle='tab' href='#about' role='tab' >
                                                <i className="bi bi-cone-striped"></i>
                                                <span> Enroll TO Get  Notes & Interview Questions</span>
                                            </a>
                                        </li>
                                                  
                                  }
                                    </ul>
                                 

                                </div>

                                <div className="mr-84 hidden lg:flex items-center ml-auto">
                                    <div className="tags mr-32"></div>
                                    <div className='  text-center fw-bold d-flex justify-content-around' >
                                   
                                   {sEnrolled ?  <input type="submit" name="signup" id="signup" className='text-center btn btn-success'
                value="Enrolled" disabled/> :<input type="submit" name="signup" id="signup" className='text-center btn btn-success'
                value="Enroll To Course" onClick={EnrollSub} />
                                   }
                                   {sEnrolled ?  '' :''
                                   }
                                    </div>

                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-md-8 pl-5 about-info'>
                                    <div className='tab-content about-tab' id='myTabContent'>
                                        <div className='tab-pane fade show active selected' id='about' role='tabpanel' aria-labelleby='about-tab'>
                                            <div className='row mt-3'>
                                            </div>
                                            <h1 class="text-h1">About {subjectname}</h1>
                                            <p>
                                                {about}
                                            </p>

                                        </div>
                                        <div className='tab-pane fade ' id='notes' role='tabpanel' aria-labelleby='notes-tab'>

                                            <div className='row mt-12'>

                                                <div className='row'>
                                                    <div className='col-sm-12'>
                                                   
                                                        {notes?.map((curElem) => {
                                                            const { _id, tname, desc } = curElem;
                                                            return (
                                                                <>
                                                                    
                                                                    <Accordion className='mt-2' key={_id} allowZeroExpanded>
                                                                        <AccordionItem >
                                                                            <AccordionItemHeading>
                                                                                <AccordionItemButton>
                                                                                    {tname}
                                                                                </AccordionItemButton>
                                                                            </AccordionItemHeading>
                                                                            <AccordionItemPanel>
                                                                                <p>
                                                                                    {desc}
                                                                                </p>
                                                                            </AccordionItemPanel>
                                                                            </AccordionItem>
                                                                    </Accordion>
                                                                </>
                                                            )
                                                        })}
                                                  

                                                    </div>
                                                </div>

                                            </div>



                                        </div>
                                        <div className='tab-pane fade ' id='interview' role='tabpanel' aria-labelleby='interview-tab'>

                                            <div className='row mt-12'>

                                                <div className='row'>
                                                    <div className='col-sm-12'>
                                                   
                                                        {questions?.map((curElem) => {
                                                            const { _id, question, ans } = curElem;
                                                            return (
                                                                <>
                                                                <Accordion className='mt-2' key={_id} allowZeroExpanded>
                                                                        <AccordionItem>
                                                                            <AccordionItemHeading>
                                                                                <AccordionItemButton>
                                                                                {question}
                                                                                </AccordionItemButton>
                                                                            </AccordionItemHeading>
                                                                            <AccordionItemPanel>
                                                                                <p>
                                                                                {ans}
                                                                                </p>
                                                                            </AccordionItemPanel>
                                                                            </AccordionItem>
                                                                    </Accordion>

                                                                   
                                                                </>
                                                            )
                                                        })}
                                   

                                                    </div>
                                                </div>

                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        </header>
                    </div>
</div>
                </div>
            </>
        )
    }
}

export default MediaView