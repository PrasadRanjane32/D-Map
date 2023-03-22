import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import back from '../../../../Assets/Images/gif icons/fast-backward.png'
import del from '../../../../Assets/Images/gif icons/bin.gif'
import edit from '../../../../Assets/Images/gif icons/edit.gif'
import '../../sidestyles.css'
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../../../Toastify/notifyToast";
import { useCookies } from 'react-cookie'
import './feedback.css'
import Loadings from '../../../LoadingPage/Loading'



const FeedDash = () => {


  const navigate = useNavigate();


  const [uData, setUdata] = useState();
  const [loading, setloading] = useState(true);


  const getUser = async () => {
    try {
      const res = await fetch("/getUserData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-work": "application/json"
        }
      });

      const data = await res.json();

      if (data) {
        setUdata(data);

        setloading(false);
      } else {
        return
      }

    }
    catch (err) {
      console.log(err);
    }
  }




 
  const messages1 = uData?.map((e) => e.messages).flat().filter((message) => message.name !== undefined && message.email !== undefined && message.phone !== undefined);




  //       const deluserdetail= async (userID)=>{
  //         setUidcookie('Deluserid',userID,{path:'/'});

  //         try {
  //             const res = await fetch("/delUdata", {
  //                 method: "GET",
  //                 headers: {
  //                     Accept: "*/*",
  //                     "Content-Type": "application/json"
  //                 },
  //                   credentials: "include"
  //             });

  //             const data = await res.json();
  //             console.log(data);


  //             if ((await res.status) === 400) {

  //                 notifyToast("Inavalid User,Data is Not Found", "error");



  //                 console.log("Invalid Update");
  //             } else {
  //                 notifyToast("Profile Deleted", "success");
  //                 getUser();
  //                 // navigate("/UserDetailDashBoard");
  //             }


  //         }
  //         catch (err) {
  //             console.log(err);
  //             // navigate("/Login");
  //         }



  //   }


  useEffect(() => {
    getUser();

  }, []);

  if (loading) {
    return (
      <>

        <Loadings />
      </>
    )
  } else {



    return (
      <div className='body '>

        <div className='back col-md-2'>
          <Link to='/Dashboard'>

            <h2 className='btn '>
              <i class="bi bi-box-arrow-left"></i>
              Back
            </h2>
          </Link>
        </div>
        <div className='feedbackbody'>
          {

            messages1?.map((curElem) => {

              const { _id, name, email, phone, work, message } = curElem;
              console.log(curElem)
              return (
                <>



                  <main key={_id}>
                    <div class="card-layout layout-medium">
                      <div class="content">


                        <h1 class="title">
                          feedback Received
                        </h1>
                        <p>  Name:-{name}
                          <br />
                          Email:-{email}
                          <br />
                          Phone:-{phone}
                          <br />
                          {/* Profession:-{uData.work} */}
                        </p>

                        <textarea name="users-feedback" id="users-feedback" value={message}>

                        </textarea>




                      </div>
                    </div>

                  </main>


                  {/* <div className='col-md-5'>
            <Link to={'/EditUser'} onClick={()=>edituserdetail(_id)}>
              <button className='btn bedit' >
                <img src={edit} />
              </button>
            </Link>
            </div>
            <div className='col-md-5'>

          
            <Link to={''} onClick={()=>deluserdetail(_id)}>
              <button className='btn bdel'>
                <img src={del} />
              </button>
              </Link>
            </div> */}





                </>
              )
            })}










        </div>



      </div>
    )
  }
}

export default FeedDash