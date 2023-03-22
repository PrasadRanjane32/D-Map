
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie';

const DsAllsub = () => {
    
   
        const navigate = useNavigate();
        const [sname, setSname] = useState();
        const[loading,setloading]=useState(true); 
        const[subcookie,setSubcookie]=useCookies(['user']);
        const callCourse = async () => {
            try {
            const res = await fetch("/getsubData", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
            // console.log(res.json());
            
            const data = await res.json();
            console.log(data);
            setSname(data);
            console.log(sname);
            if(data!==undefined){
                setloading(false);
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
        
       
    
    
        const handle= (subjectID)=>{
    setSubcookie('Subjectid',subjectID,{path:'/'});
    localStorage.setItem('Subjectid', JSON.stringify(subjectID))
    navigate('/subjectd')
    
        }
    
        useEffect(() => {
      
            callCourse();
      
        }, []);
        if(loading){
            <></>
        }else{
    
            
            return (
                <>
                <div className='body'>
                    <section id="skills" className='skills tracks-section pt-40 md:pt-56 mb-40 md:mb-56'>
                    <div className='back col-md-2'>
                <Link to='/SubjectDashBoard'>

                  <h2 className='btn '>
                    <i class="bi bi-box-arrow-left"></i>
                    Back
                  </h2>
                </Link>
              </div>
                        <div className='lg-container'>
                            <div className='section-header items-center self-center mb-8 md:mb-12'>
                                <h2 className='text-h4 text-center'>
                                Available Subject's
                                    <br />
                                </h2>
                            </div>
    
    
                            <section className="skills" id="skills">
                                <div className="container">
                                    <div className="row" id="skillsContainer">
                                        {sname.map((curElem) => {
                                            const { _id, subjectname, icon, link } = curElem;
                                            return (
                                                <>
                                                {/* href={curElem.link}  target="_self"*/}
                                                    <a  onClick={()=>{handle(_id)}} key={_id}>
                                                        <div className="bar">
                                                            <div className="info">
                                                                <img alt={subjectname} src={icon} />
                                                                <div className='title'>{subjectname}</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                    </div>
                </>
                )
            }
    
    }
    

export default DsAllsub