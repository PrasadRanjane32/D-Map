import React, { useEffect, useState } from 'react'
import './About.css'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    } catch (err) {
      console.log(err);
      navigate("/Login");
    }
  }



  useEffect(() => {

    callAboutPage();

  }, []);
  return (
    <>
      <div className='About '>
        <div className="container">
          <form method='GET'>
            <div className='row'>
              {/* <div className='col-md-4'>
                <img src='' alt='123' />
              </div> */}
              <div className='col-md-6'>
                <div className=''>
                  <h5>{userData.name}</h5>
                  <h6>{userData.work}</h6>
                  {/* <p className='profile-rating mt-3 mb-5'>Ranking<span> 1/10 </span></p> */}

                  <ul className='nav nav-tabs' role='tablist'>
                    <li className='nav-item'>
                      <a className='nav-link active' id='home-tab' data-toggle='tab' href='#home' role='tab'>About</a>
                    </li>
                    <li className='nav-item'>
                      <a className='nav-link' id='profile-tab' data-toggle='tab' href='#profile' role='tab'>Timeline</a>
                    </li>
                  </ul>


                </div>
              </div>

              <div className='col-md-2'>
                <input type='submit' className='edit-btn' name='btnAddMore' value='Edit Profile' />
              </div>

            </div>
            <div className='row'>
              {/* left side url */}
              {/* <div className='col-md-4'>
                <div className='profile-work'>
                  <p>Hello Link</p>
                  <p>Hello Link</p>
                  <p>Hello Link</p>
                  <p>Hello Link</p>
                  <p>Hello Link</p>
                  <p>Hello Link</p>
                  <p>Hello Link</p>

                </div>
              </div> */}
              {/* right side data toggle */}
              <div className='col-md-8 pl-5 about-info'>
                <div className='tab-content profile-tab' id='myTabContent'>

                  <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelleby='home-tab'>

                    <div className='row mt-3'>

                      {/* <div className='col-md-6 '>
                        <label>User ID</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData._id + 1}</p>
                      </div> */}

                    </div>

                    <div className='row mt-2'>
                      <div className='col-md-6'>
                        <label>Name</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData.name}</p>
                      </div>
                    </div>

                    <div className='row mt-2'>
                      <div className='col-md-6'>
                        <label>Email</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData.email}</p>
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col-md-6'>
                        <label>Phone</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData.phone}</p>
                      </div>
                    </div>

                    <div className='row mt-2'>
                      <div className='col-md-6'>
                        <label>Profession</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData.work}</p>
                      </div>
                    </div>

                  </div>

                  <div className='tab-pane fade show active' id='profile' role='tabpanel' aria-labelleby='home-tab'>

                    <div className='row mt-3'>

                      <div className='col-md-6 '>
                        <label>Course</label>
                      </div>
                      <div className='col-md-6'>
                        <p>On Board</p>
                      </div>

                    </div>

                    

                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>)
}

export default About