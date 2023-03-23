import React, { createContext, useReducer } from 'react'
import './App.css'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Contact from './Components/Contact/Contact'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Logout from './Components/LogOut/Logout'
import Erropage from './Components/ErrorPage/Erropage'
import { initialState, reducer } from './reducer/UseReducer'
import LangPage from './Components/Languages/LangPage'

import MediaView from './Components/pages/MediaView'
import SubjectReg from './Components/SubRegister/SubReg'
import AddQuiz from './Components/SubRegister/AddQuiz'
import SubjectDash from './Components/Dashboard/addash/Subject/SubjectDash'
import UserdetailDash from './Components/Dashboard/addash/Subject/UserdetailDash'
import    EditUser from './Components/Dashboard/addash/User/EditUser'
import AllSubjectDash from './Components/Dashboard/addash/Subject/DsAllsub'
// import SubjectReg from './Components/SubRegister/SubReg'
import { ToastContainer } from "react-toastify";
import UpdateSub from './Components/SubRegister/UpdateSub'
import UpdateSubQue from './Components/SubRegister/UpdateSubQue'
import UpUserPro from './Components/UserProfile/UpUserPro'
import AdmDash from './Components/Dashboard/addash/AdmDash'
import EditSubject from './Components/Dashboard/addash/Subject/EditSubject'
import FeedDash from './Components/Dashboard/addash/Subject/FeedDash'
import Loading from './Components/LoadingPage/Loading'
import Main from './Components/Quiz/Main'
import Quiz from './Components/Quiz/Quiz'
import Result from './Components/Quiz/Result'
import { CheckUserExist } from './Components/Quiz/helper/helper'




// context api
export const UserContext = createContext();
// const Routing = () => {
//   return (

//   )
// }

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (

    <>

      <UserContext.Provider value={{ state, dispatch }}>
        {/* <Routing /> */}
        <Router>
          {/* navbar */}
          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Logout' element={<Logout />} />
           

            <Route path='/startquiz' element={ <Main/>}/>
            
            <Route path='/onquiz' element={<CheckUserExist><Quiz/></CheckUserExist>}/>
            <Route path='/subjectd' element={<MediaView />} />
            <Route path='/SubjectReg' element={<SubjectReg />} />
            <Route path='/UpdateSub' element={<UpdateSub />} />
            <Route path='/updateSubQue' element={<UpdateSubQue />} />
            <Route path='/addquiz' element={<AddQuiz />} />
            <Route path='*' element={<Erropage />} />
            <Route path='/Allpath' element={<LangPage />} />
            <Route path='/SubjectDashBoard' element={<SubjectDash />} />
            <Route path='/UserDetailDashBoard' element={<UserdetailDash />} />
            <Route path='/EditUser' element={<EditUser />} />
            <Route path='/EditSubject' element={<EditSubject />} />
            <Route path='/AllSubjectDash' element={<AllSubjectDash />} />
            <Route path='/FeedbackDashBoard' element={<FeedDash/>}/>
            <Route path='/loadings' element={<Loading/>}/>
            <Route path='/result' element={<Result/>}/>
         

            <Route path='/EditProfile' element={<UpUserPro />} />
            <Route path='/Dashboard' element={<AdmDash />} />

          </Routes>
          {/* //footer */}
          <Footer />

        </Router>

      </UserContext.Provider>
      <ToastContainer />


    </>
  )
}

export default App