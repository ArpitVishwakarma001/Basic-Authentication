import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProfileProtectedWrapper from './components/ProfileProtectedRoute'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Profile from './components/Profile'
import VerifyEmail from './components/VerifyEmail'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/profile"
          element={
            <ProfileProtectedWrapper>
              <Profile />
             </ProfileProtectedWrapper>
          }
        />
      </Routes>
    </div>
  )
}

export default App