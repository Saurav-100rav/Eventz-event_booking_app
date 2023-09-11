import React, { useEffect, useState } from 'react'
import {fetchallEvents, isLoggedIn} from "../api"
import { useNavigate ,useParams} from 'react-router-dom';
import "./events.css"
import party from "./party.jpeg"
const EventDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [event,setEvent] = useState({});
    useEffect(()=>{
        authenticateUser();
    },[]);

    const authenticateUser = async()=>{
        try {
            const result = await isLoggedIn();
            console.log(result)
            if(result){
                displayEvent();
            }
            else navigate("/login")
        } catch (error) {
            navigate("/login")
        }
    }
    const displayEvent = async()=>{
        try {
            
            const res = await fetchallEvents();
            if(res.data.msg==="Success"){
                console.log(res)
                res.data.result.map((val)=>{
                    if(val._id===id){
                        setEvent(val);
                        return ;
                    }
                })
            }
        } catch (error) {
            alert("There is an error in loading events page..");
            console.log("Error while displaying all events..",error)
        }
    }
    const istTime = new Date(event?.eventTime);
    istTime?.setHours(istTime.getHours() , istTime.getMinutes() );

    const date = istTime?.toLocaleDateString('en-IN');
    const time = istTime?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return (
    // <h2>details page</h2>
    // <div className="events-container">
        <div className="event-details-card" key={event?._id}>
            <div className="event-image">
                <img src={party} alt={event?.name} />
            </div>
            <div className="event-info">
                <h3>{event?.eventName}</h3>
                <p>Date: {date}</p>
                <p>Time: {time}</p>
                <p>Venue: {event?.eventVenue}</p>
                <p>Description: {event?.eventDescription}</p>
            </div>
        </div>       
    // </div>
  )
}

export default EventDetails