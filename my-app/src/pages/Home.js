import React, { useEffect, useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [logginUser, setlogginUser]=useState('');
  useEffect(() => {
      setlogginUser(localStorage.getItem("LogginUser"))
  }, [])

  const handleLogout = (e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('LogginUser');
    handleSuccess("Logout Successful!")
    setTimeout(()=>{
        Navigate('/login');
    }, 1000)
  }
  return (
    <div>
     <h1>
        {logginUser}
     </h1>
     <button onClick={handleLogout}>Logout</button>

     <ToastContainer/>
    </div>
  )
}

export default Home
