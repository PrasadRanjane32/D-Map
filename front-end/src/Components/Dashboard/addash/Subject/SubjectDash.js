import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import back from '../../../../Assets/Images/gif icons/fast-backward.png'
import del from '../../../../Assets/Images/gif icons/bin.gif'
import edit from '../../../../Assets/Images/gif icons/edit.gif'
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../../../../Toastify/notifyToast";
import { useCookies } from 'react-cookie'
import addSub from '../../../../Assets/Images/book.gif'
import Loadings from '../../../LoadingPage/Loading'

import Onwork from '../../../../Assets/Images/gif icons/coding.gif'


const SubjectDash = () => {

  const navigate = useNavigate();

  const [Uidcookie, setUidcookie] = useCookies(['user']);

  const [sname, setSname] = useState();
  const [loading, setloading] = useState(true);

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






  const editsubjdetail = (userID) => {

    setUidcookie('Subjectid', userID, { path: '/' });
    navigate('/EditSubject')

  }



  const delsubdetail = async (userID) => {
    setUidcookie('Delsubjid', userID, { path: '/' });

    try {
      const res = await fetch("/delsubdata", {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);


      if ((await res.status) === 400) {

        notifyToast("Inavalid Subject,Data is Not Found", "error");



        // console.log("Invalid Update");
      } else {
        notifyToast("Subject Deleted", "success");
        callCourse();
        // navigate("/UserDetailDashBoard");
      }


    }
    catch (err) {
      console.log(err);
      // navigate("/Login");
    }



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

          <div className='container col'>

            <div className='dashboard row'>




              <div className='col-md-12 d1 d-flex g-3'>
                <div className='back col-md-2'>
                  <Link to='/Dashboard'>

                    <h2 className='btn '>
                      <i class="bi bi-box-arrow-left"></i>
                      Back
                    </h2>
                  </Link>
                </div>
                <div className='col-md-6 d1c1'>
                  <h4>Subject's</h4>

                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='card c1'>
                        <div className='card-body cb'>
                          <Link to='/SubjectReg'>

                            <h2 className='btn '>
                              <img src={addSub} />

                              {/* <i className="bi bi-stack"></i>  */}
                              Add New Subject's
                            </h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='card c1'>
                        <div className='card-body'>
                          <Link to='/AllSubjectDash' >

                            <h2 className='btn'>
                              <img src={Onwork} />

                              {/* <i className="bi bi-people-fill"></i>  */}
                              Display All Subject's
                            </h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='card c1'>
                        <div className='card-body cb'>


                          <table class="table">
                            <thead>
                              <tr className='row '>
                                <th scope="col" className='col-md-3'>Sr.No.</th>
                                <th scope="col" className='col-md-3'>Subject Name</th>
                                <th scope="col" className='col-md-3'>Technology</th>
                                <th scope="col" className='col-md-3'>Handle</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sname?.map((curElem) => {


                                const { _id, subjectname, icon, link, type } = curElem;
                                return (
                                  <>
                                    <tr className='row' key={_id} >
                                      <th scope="row" className='col-md-3 '></th>
                                      <td className='col-md-3'>{subjectname}</td>
                                      <td className='col-md-3'>{type}</td>
                                      <td className='col-md-3 btns'>


                                        <div className='col-md-5'>
                                          <Link to={'/EditSubject'} onClick={() => editsubjdetail(_id)}>
                                            <button className='btn bedit' >
                                              <img src={edit} />
                                            </button>
                                          </Link>
                                        </div>
                                        <div className='col-md-5'>
                                          <Link to={''} onClick={() => delsubdetail(_id)}>
                                            <button className='btn bdel'>
                                              <img src={del} />
                                            </button>
                                          </Link>
                                        </div>



                                      </td>

                                    </tr>
                                  </>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                  </div>


                </div>

              </div>


            </div>

          </div>

        </div>
      </>
    )
  }
}

export default SubjectDash