import React, { useContext, useEffect, useState } from 'react'
import "./Home.css";
import Logo from '../../Assets/Images/dm.png'
import HomeLang from './HomeLang';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({});
  const [show, setShow ] = useState(false);



  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data);
      setShow(true);


      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    } catch (err) {
      console.log(err);
      // navigate("/Login");
    }
  }
  useEffect(() => {
    userHomePage();
    
  }, []);

  return (
    <>
      <header className="pt-24 sm:pt-32 md:pt-40 pb-56 sm:pb-56 c-header-with-bg ">
        <div className="lg-container flex items-start md:items-center flex-col-reverse md:flex-row">
          <div className="lhs md:items-center lg:items-start md:text-center lg:text-left">
            <h1 className="text-h0 mb-12">

              <span style={{ fontSize: "36px" }}>
                {show ?  'Happy To See You Back 😄,':''}<br></br></span>
              {show ?  <strong style={{ fontSize: "50px", color: "yellowgreen" }}>{userName.name} </strong>:''}

              <br></br>
              Get
              <strong className='leading-none font-bold'> really </strong>
              good at programming.
            </h1>

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
          </div>
          <div className="graphic grid md:hidden lg:grid lg:ml-24 mb-16 lg:mb-0">
            <img role="presentation" alt="" className="c-icon" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/graphics/landing-page-top-74da2134b88efcf34b05e804987fdfb832771716.svg" />
          </div>
        </div>
      </header>
      <HomeLang />
    </>
  )
}

export default Home