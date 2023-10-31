import React, { useContext } from 'react'
import './App.css'
import Login from "./components/Login"
import Feeds from "./components/Feeds"
import Profile from "./components/Profile"
import SignUp from "./components/Signup"
import {Routes, Route} from "react-router-dom"
import {useNavigate , Navigate} from "react-router-dom"
import { AuthContext } from './context/AuthWrapper'

function App() {


  const navigate = useNavigate();

  const {user} = useContext(AuthContext)

  const PrivateRoute = ({ children }) => {
    return user?.uid ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <div className="card">
        {/* <h2>Reels App 🚀🚀</h2> */}
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<PrivateRoute><Feeds /></PrivateRoute>}></Route>
          <Route path='/feed' element={<PrivateRoute><Feeds /></PrivateRoute>}></Route>
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
        </Routes>

      </div>
      
    </>
  )
}

export default App
