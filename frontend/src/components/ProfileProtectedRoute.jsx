import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileProtectedWrapper = ({children}) => {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[token])

  return (
    <div>{children}</div>
  )
}

export default ProfileProtectedWrapper