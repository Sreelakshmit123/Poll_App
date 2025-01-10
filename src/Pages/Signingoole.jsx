import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Signingoole() {
    const navigate = useNavigate()
    function googleLogin() {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result);
            toast.success("User Registered Successfully") 
            if(result.user){
                setTimeout(() => {
                    navigate('/home')
                  }, 3000);
            }
        });
    }
    return (
        <>
            <p className='text-secondary mb-0'>--Or continue with--</p>

            <img onClick={googleLogin} className='w-50 h-50' src="https://i.imgur.com/yczPzHD.png" alt="" />
      <ToastContainer autoClose={3000} theme='colored'/>

        </>
        
    )
}

export default Signingoole