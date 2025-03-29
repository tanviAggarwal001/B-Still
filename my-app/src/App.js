import React, { useState } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const PrivateRoute= ({element})=>{
    return isAuthenticated? element : <Navigate to = '/login' />
  }
  return (
    <div className='App'>
      <RefreshHandler setisAuthenticated={setisAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>

    </div>
  )
}

export default App
