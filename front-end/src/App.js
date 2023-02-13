import React, { createContext, useReducer } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Logout from './Components/LogOut/Logout'
import Erropage from './Components/ErrorPage/Erropage'
import ReactQuiz from './Components/Quiz/ReactQuiz.js'
import {initialState,reducer} from './reducer/UseReducer'
import LangPage from './Components/Languages/LangPage'
import JavaQuiz from './Components/Quiz/JavaQuiz'
import HtmlQuiz from './Components/Quiz/HtmlQuiz'
import CssQuiz from './Components/Quiz/CssQuiz'
import JsQuiz from './Components/Quiz/JsQuiz'



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
        <Route path='/reactjs' element={<ReactQuiz />} />
        <Route path='/java' element={<JavaQuiz/>}/>
        <Route path='/html' element={<HtmlQuiz/>}/>
        <Route path='/css' element={<CssQuiz/>}/>
        <Route path='/js' element={<JsQuiz/>}/>
        {/* <Route path='/' element={}/> */}

        <Route path='*' element={<Erropage />} />
        <Route path='/Allpath' element={<LangPage/>}/>
      </Routes>
      {/* //footer */}
      <Footer />

    </Router>

      </UserContext.Provider>

    </>
  )
}

export default App