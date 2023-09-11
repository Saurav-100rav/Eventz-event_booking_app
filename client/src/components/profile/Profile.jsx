import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { isLoggedIn,getProfileInfo } from '../api';
import "./profile.css"
import dp from "./profile.jfif"

const Profile = () => {
  const navigate = useNavigate();
  const [user,setUser]=useState({});
  useEffect(()=>{
    isLoggedIn();
    displayProfile();
  },[])
  const displayProfile = async()=>{
    try {
      const res = await getProfileInfo();
      console.log(res);
      if(res.data.msg==="Success"){
        // alert("You can see all your information in your profile.");
        setUser(res.data.user);
      } 
      else{
        alert("no user Found");
        navigate("/login") ;
      }
    } catch (error) {
        // alert("some error while loading profile page...")
        console.log("error while showing profile page..",error);
        navigate("/login")
    }
 
  }
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={dp} alt={user.name} />
      </div>
      <div className="profile-info">
          <h2>{user?.name}</h2>
          <p>Email: {user?.email}</p>
          <p>Phone: {user?.phone}</p>
      </div> 
  </div>
  )
}

export default Profile