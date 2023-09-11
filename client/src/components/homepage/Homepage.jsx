import React, { useState,useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
import "./homepage.css"
import { isLoggedIn } from '../api';
const Homepage = () => {
  const navigate = useNavigate();
  const [details,setdetails]=useState("");
  useEffect(()=>{
      authenticateUser();
  },[]);

  const authenticateUser = async()=>{
      try {
          const result = await isLoggedIn();
          console.log(result)
          if(result){
            setdetails("Welcome on Homepage....")
          }
          else navigate("/login")
      } catch (error) {
          navigate("/login")
      }
  }
  
  return (
    <div className='homepage'>
        <h1 className="welcome-heading">Eventz</h1>
        <div className="welcome-text">
          <p className="text-1">Discover events that match your interests.</p>
          <p className="text-2">Create your own events and share them with others.</p>
          <p className="text-3">Book events you love and connect with event enthusiasts while exploring nearby events on our map.</p>
        </div>
    </div>
  )
}

export default Homepage