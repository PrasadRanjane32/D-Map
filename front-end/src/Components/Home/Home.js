import React, { useContext, useEffect, useState } from 'react'
import "./Home.css";
import Logo from '../../Assets/Images/dm.png'
import HomeLang from './HomeLang';
import { Link, useNavigate } from 'react-router-dom';
import video from '../../Assets/Images/homeimg.mp4'
import Loadings from '../LoadingPage/Loading'


const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({});
  const [show, setShow ] = useState(false);
  const [sData, setSdata] = useState();
  const [loading, setloading] = useState(true);




  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      if(data){
      setUserName(data);
      setShow(true);


      }
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }else{
      }


    } catch (err) {
      console.log(err);
      // navigate("/Login");
    }finally{
      setloading(false);
    }
  }
  
  console.log(userName);
  const {
    enrolled
  }=userName;
  const passSub = async () => {
    try {
      console.log(enrolled);
        const res = await fetch("/homesub", {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
              userName
          )
        });
        
        const subdata = await res.json();
        // console.log(data);
        // console.log(enrolled);
        setSdata(subdata);
        // console.log(sData);
        if (subdata !== undefined) {
            // setloading(false);
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
  useEffect(() => {
    userHomePage();
passSub();
  }, []);
  if(loading){
    return(
      <>
  
      <Loadings/>
      </>
    )
    }else{
  return (
    <>
    
      <header className="pt-24 sm:pt-32 md:pt-40 pb-56 sm:pb-56 c-header-with-bg ">
        <div className="lg-container flex items-start md:items-center flex-col-reverse md:flex-row">
          <div className="lhs md:items-center lg:items-start md:text-center lg:text-left typewriter">
            <h2 className="text-h0 mb-12">

              <span  style={{ fontSize: "36px" }}>
                {show ?  'Happy To See You Back 😄,':''}<br></br></span>
              {show ?  <h1  style={{ fontSize: "50px", color: "yellowgreen" }}>{userName.name}</h1>:''}
<br/>
              Get
              <strong className='leading-none font-bold'> really </strong>
              good at programming.
            </h2>

            <p className="text-p-xlarge mb-24">
              Develop fluency in
              <em className="not-italic font-medium text-textColor2"> programming languages </em>
              with our unique blend of learning, practice and mentoring.
              D-MAP is fun, effective and
              <strong className="text-textColor2"> 100% free, forever.</strong>
            </p>
            <div className="buttons flex mb-40 flex-col sm:flex-row">
              {show ?'': <Link className="btn-primary btn-l mb-12 sm:mb-0 sm:mr-24 " to="/Signup">Sign up for free</Link> }
              <Link className="btn-secondary btn-l shadow-buttonS" to="/Allpath">Explore languages</Link>

            </div>
            <div className="organisation pt-16 sm:items-center lg:items-start xl:items-center flex-col sm:flex-row lg:flex-col xl:flex-row px-24 sm:pl-32 sm:pr-48 pb-16 sm:pb-32 md:pb-16 lg:pb-16 xl:pb-16">

            </div>
        <div className="text-h0 ">
{/*       
        <span style={{ fontSize: "30px" }}>
        {show ?  'Your Enrolled For,':''}</span> */}
        {/* {enrolled.map((curElem) => {
                                        const { _id,ensub } = curElem;
                                        return (
                                            <>
                                         
                     
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1>{ensub}</h1><br/>
                        
                    </div>
                </div>
                                            </>
                                        )
                                    })} */}

            </div>
          </div>
          <div className="graphic grid md:hidden lg:grid lg:ml-24 mb-16 lg:mb-0">
            {/* <img role="presentation" alt="" className="c-icon" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/graphics/landing-page-top-74da2134b88efcf34b05e804987fdfb832771716.svg"/> */}
            {/* <img role="presentation" alt="" className="c-icon" src="../../Assets/Images/home.gif"/> */}
            <video src={video} width="850" height="600" loop autoplay='true' muted>
     </video>
         
          </div>

        </div>
      </header>
      <HomeLang />
    </>
  )
                                  }
}

export default Home