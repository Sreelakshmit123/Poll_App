
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import Pollsform from './Pages/Pollsform'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { auth } from './firebase'

function App() {
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   })
  // })
  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister />} />
        <Route path='/pollsform' element={<Pollsform />} />


      </Routes>
      <ToastContainer autoClose={3000} theme='colored' />
    </>
  )
}

export default App
// user ? <Navigate to="/home"/> :