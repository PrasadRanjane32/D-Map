import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './HomeLang.css'
import Loadings from '../LoadingPage/Loading'



const HomeLang = () => {

    const navigate = useNavigate();
    const [sname, setSname] = useState();
    const [loading, setloading] = useState(true);
    const [subcookie, setSubcookie] = useCookies(['user']);
    const callCourse = async () => {
        try {
            const res = await fetch("/getsubData", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
          

            const data = await res.json();
         
            setSname(data);
       
            if (data !== undefined) {
                setloading(false);
            }
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }


        }
        catch (err) {
            console.log(err);
         
        }
    }




    const handle = (subjectID) => {
        setSubcookie('Subjectid', subjectID, { path: '/' });
        localStorage.setItem('Subjectid', JSON.stringify(subjectID))
        navigate('/subjectd')

    }

    useEffect(() => {

        callCourse();

    }, []);
    if (loading) {
        return(
            <>
            <Loadings/>
            </>
        )
    } else {


        return (
            <>
            <div className='body'>
                <section id="skills" className='skills tracks-section pt-40 md:pt-56 mb-40 md:mb-56'>
                    <div className='lg-container'>
                        <div className='heading section-header items-center self-center mb-2 md:mb-12'>
                            <h2 className='text-h1 text-center'>
                                Explore and
                                <strong> get fluent </strong>
                                in
                                <br />
                                programming languages
                            </h2>
                        </div>
                        <hr />
                        {/* Categories languages block */}
                        {/* <div className='section-header items-center self-center mb-8 md:mb-12'>
                            <h2 className='text-h4 text-center'>
                                <strong> Role Based</strong>
                               Roadmap
                                <br />
                            </h2>
                        </div> */}



                        {/* //all languages below */}
                        <div className='section-header items-center self-center mb-2 md:mb-12'>
                            <h2 className='text-h4 text-center'>
                                Skill based Roadmaps
                                <br />
                            </h2>
                        </div>


                        <section className="skills" id="skills">
                            <div className="container">
                                <div className="row" id="skillsContainer">


                                    {sname.map((curElem, index) => {

                                        const { _id, subjectname, icon, link } = curElem;
                                  


                                        return (
                                            <>   {
                                                index <= 11 &&

                                                <a onClick={() => { handle(_id) }} key={_id}>
                                                    <div className="bar">
                                                        <div className="info">
                                                            <img alt={subjectname} src={icon} />
                                                            <div className='title'>{subjectname}</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            }
                                            </>
                                        )


                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                    <div  >

                        <Link className="cta c-prominent-link --with-bg " style={{ "borderRadius": '30px 100px' }} to="/Allpath"><span>See all Language Tracks</span><img role="presentation" alt="" className="c-icon" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/arrow-right-0f5e363467e0c55fe280b4864639a9c677afa0d2.svg" /></Link>

                    </div>
                </section>
                </div>
            </>
        )
    }


}

export default HomeLang

