import React, { useEffect, useState } from 'react'
import {isLoggedIn,getProfileInfo} from "../api"
import { useNavigate,Link } from 'react-router-dom';
import "./events.css"
import party from "./party.jpeg"

const Booking = () => {
    const navigate = useNavigate();
    const [bookings,setBookings] = useState([]);
    const empty = "No Bookings Found"

    useEffect(()=>{
        authenticateUser();
    },[]);
    const authenticateUser = async()=>{
        try {
            const result = await isLoggedIn();
            console.log(result)
            if(result){
                displayBookings();
            }
            else navigate("/login")
        } catch (error) {
            navigate("/login")
        }
    }
    const displayBookings = async()=>{
        try {
          const res = await getProfileInfo();
          console.log(res);
          if(res.data.msg==="Success"){
            // alert("You can see all your information in your Bookings.");
            setBookings(res.data.user.personalEvents);
          } 
          else{
            // alert("no user Found");
            navigate("/login") ;
          }
        } catch (error) {
            // alert("some error while loading profile page...")
            console.log("error while showing booking page..",error);
            navigate("/login")
        }
     
      }
  return (
    <div className='all-events'>
        <h2>You can see here Your Bookings</h2>
        <div className="events-container">
        { bookings === [] ? {empty}
        : bookings.map( (event)=>{
                    const istTime = new Date(event.eventTime);
                    istTime.setHours(istTime.getHours() , istTime.getMinutes() );

                    const date = istTime.toLocaleDateString('en-IN');
                    const time = istTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

                    return(
                        
                        <div className="event-card" key={event._id}>
                            <div className="event-image">
                                <img src={party} alt={event.name} />
                            </div>
                            <div className="event-info">
                            <h3>{event.eventName}</h3>
                            {/* <p>Date: {date}</p> */}
                            <p>Time: {date}</p>
                            <p>Venue: {time}</p>
                            {/* <p>Description: {event.eventDescription}</p> */}
                            <Link to={`/eventdetails/${event._id}`}>
                                    See Details 
                                    </Link> 
                            </div>
                    </div>
                    )
                })
            }
        </div>

    </div>
    // <div>
    //     { bookings === [] ? "No Bookings Found":"You can see here Your Bookings"}
    // </div>
  )
}

export default Booking