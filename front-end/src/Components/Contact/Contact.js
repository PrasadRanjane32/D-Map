import React, { useEffect, useState } from 'react'
import './Contact.css'
import contact from '../../Assets/Images/contact.png'
import { useNavigate } from 'react-router-dom'
import Loadings from '../LoadingPage/Loading'
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../Toastify/notifyToast";

const Contact = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const callContactPage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json"
        },
        // credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      if(data!=undefined){

        setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
        setloading(false)
      }
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

    callContactPage();

  }, []);
  //for handling the message in contact
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  }
  // sending data to back end

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;
    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });
    const data = await res.json();
    if (!data) {
      console.log("message Not Send");
      notifyToast("Your message Not Send SuccessFully", "error");

    } else {
     
      notifyToast("Your Message Send SuccessFully", "success");
      setUserData({ ...userData, message: "" });
    }


  }

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
      <section className="contact" id="contact">



        <div className="container">
          <h2 className="heading"> Get in <span>Touch</span></h2>
          <div className="content">
            <div className="image-box">
              <img draggable="false" src={contact} alt="" />
            </div>
            <form method="POST" id="contact-form" action="">

              <div className="form-group">
                <div className="field">
                  <input type="text" name="name" placeholder="Name"
                    value={userData.name}
                    onChange={handleInputs} required />
                  <i className='fas fa-user'></i>
                </div>
                <div className="field">
                  <input type="text" name="email" placeholder="Email"
                    value={userData.email}
                    onChange={handleInputs} required />
                  <i className='fas fa-envelope'></i>
                </div>
                <div className="field">
                  <input type="text" name="phone" placeholder="Phone"
                    value={userData.phone}
                    onChange={handleInputs} required />
                  <i className='fas fa-phone-alt'></i>
                </div>
                <div className="message">
                  <textarea placeholder="Message" name="message"

                    value={userData.message}
                    onChange={handleInputs} required></textarea>
                  <i className="fas fa-comment-dots"></i>
                </div>
              </div>
              <div className="button-area">
                <button type="submit" onClick={contactForm}>
                  Send <i className="fa fa-paper-plane"></i></button>
              </div>
            </form>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
}

export default Contact