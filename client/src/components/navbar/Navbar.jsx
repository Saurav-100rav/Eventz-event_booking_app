import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import "./navbar.css"
import { isLoggedIn } from '../api';
export const Navbar = (props)=>{
     console.log("i am on navbar")
     useEffect(()=>{
         authenticateUser();
     },[]);
   
     const authenticateUser = async()=>{
         try {
             const result = await isLoggedIn();
             console.log(result)
             if(result){
                props.setStatus(true);
             }
         } catch (error) {
                props.setStatus(false);;
         }
     }


    const [linksClass,setLinksClass]=useState("nav-links");
    const [hideClass,setHideClass]=useState("close-menu");
    const showLinks = ()=>{
        setLinksClass("nav-links-active");
        setHideClass("close-menu-active");
    }
    const hideLinks = ()=>{
        console.log("clicked");
        setLinksClass("nav-links");
        setHideClass("close-menu");
    }
    return (
        <div class="navbar">
            <div class="logo">
                {/* <img src="./pc2.jfif" alt="logo"> */}
                <h3>Eventz</h3>
            </div>
            <ul class={linksClass}>    
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><Link to={'/allevents'}>Events</Link></li>
                <li><Link to={'/addevent'}>Add Event</Link></li>
                <li><Link to={'/booking'}>My Bookings</Link></li>
                {props.status===false ? <li><Link to={'/login'}>Login</Link></li> : "" }
                {props.status===false ? <li><Link to={'/register'}>Register</Link></li>: "" }
                {props.status ? <li><Link to={'/logout'}>Log out</Link></li> : "" }
                                        
                                        
            </ul>
    
            <div class="burger-menu" onClick={showLinks}>&#9776;</div>
            <div class={hideClass}  onClick={hideLinks}>&#10006;</div>
        </div>
    );
}




