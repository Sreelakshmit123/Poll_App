import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth , db } from '../firebase';
import { setDoc,doc } from 'firebase/firestore';
import Signingoole from './Signingoole';

function Auth({ insideRegister }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db,"Users", user.uid),{
          email: user.email,
          username: username,
        });
     
      console.log("User Registered Successfully");
      toast.success("User Registered Successfully") 
      setTimeout(() => {
        navigate('/login')
      }, 3000);
      }

    } catch (error) {
      console.log(error.message);
      toast.warning(error.message)

    }
  }


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth,email,password)
      console.log("User logged in successfully");
      toast.success("User logged in Successfully") 
      setTimeout(() => {
        navigate('/home')
      }, 3000);
    }catch(error){
      console.log(error.message);
      toast.warning(error.message)
    }
  }


  return (

    <>
      <div style={{ width: '100%', height: '100vh', backgroundColor: 'rgb(33, 42, 111)', backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/035/442/444/non_2x/abstract-monochrome-template-with-grey-chevron-landing-page-transparent-free-png.png')`, color: 'white' }}>
        <h1 className='text-light text-center pt-4'>Create a Realtime Polls</h1>
        <div style={{ height: '80%' }} className='container '>
          <div style={{ height: '100%' }} className="row align-items-center  text-center">
            <div className="col-lg-6 p-5" >
              <h1><b>Go to the Polls </b></h1>
              <div className='border rounded-5 bg-light p-5'>
                <div className="d-flex align-items-center flex-column">

                  <h5 className='fw-bolder mt-2 pb-3 text-dark'>
                    {insideRegister ? 'Sign up to your Account' : 'Sign in to your Account'}
                  </h5>
                  <Form className="w-100 ">
                    {insideRegister && (
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} required/>
                      </Form.Group>)}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Enter email"required onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password"required onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <sign/>
                    {
                      insideRegister ?
                        <div>
                          <button onClick={handleRegister} className='btn btn-success mb-2 d-flex align-items-start'>Register</button>
                          <p className='text-dark'>Already have an Account? click here to <Link to={'/login'} className='text-info'>Login</Link></p>
                        </div> :
                        <div>
                          <button  onClick={handleLogin} className='btn btn-success d-flex align-items-start mb-2'>Login</button>
                          <p className='text-dark'>New User? click here to <Link to={'/register'} className='text-info'>Register</Link></p>
                        
                        </div>
                    }
                     <Signingoole/>
                  </Form>
                </div>
              </div>
            </div>
            <div className="col-lg-1" />

            <div className="col-lg-5 " >
              <img className='w-100 h-100' src="https://eu.questionpro.com/qp_userimages/sub-3/1602640811/sign_up_main_graphic.png" alt="" />
            </div>
          </div>

        </div>
      </div>
      <ToastContainer autoClose={3000} theme='colored'/>
    </>
  )
}

export default Auth