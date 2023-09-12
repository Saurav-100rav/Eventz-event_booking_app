import React, { useEffect, useState } from 'react'
import {fetchallEvents, isLoggedIn,addEventProfile} from "../api"
import { useNavigate ,Link} from 'react-router-dom';
import "./events.css"
import party from "./party.jpeg"
const AllEvents = () => {
    const navigate = useNavigate();
    const [events,setEvents] = useState([]);
    useEffect(()=>{
        authenticateUser();
    },[]);

    const authenticateUser = async()=>{
        try {
            const result = await isLoggedIn();
            console.log(result)
            if(result){
                // alert("welcome on Events page....");
                displayAllEvents();
            }
            else navigate("/login")
        } catch (error) {
            navigate("/login")
        }
    }


    const displayAllEvents = async()=>{
        try {
            const res = await fetchallEvents();
            if(res.data.msg==="Success"){
                console.log(res)
                setEvents(res.data.result);
                console.log(events.length);
                // alert("Welcome on our events page...");
            }
        } catch (error) {
            alert("There is an error in loading events page..");
            console.log("Error while displaying all events..",error)
        }
    }

    const HandleEventAdd = async(event)=>{
            // console.log("clicked add event",event)
            try {
                const res = await addEventProfile(event);
                console.log(res);
                alert(res.data.msg);
            } catch (error) {
                console.log("error while booking event...",error);
            }

    }
  
  return (
    <div className='all-events'>
        { events.length > 0 ? <h2>All Events you can attend here</h2> :""}
        <div className="events-container">
            {
                events ? 
                events.map( (event)=>{
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
                            <p>Date: {date}</p>
                            <p>Time: {time}</p>
                            <p>Venue: {event.eventVenue}</p>
                            {/* <p>Description: {event.eventDescription}</p> */}
                            <button onClick={()=>HandleEventAdd(event)} className='btn'>Book Event</button>
                            <Link to={`/eventdetails/${event._id}`}>
                                {/* <button type='submit' className='btn btn-link' > */}
                                    See Details 
                                    {/* </button> */}
                                    </Link> 
                            </div>
                    </div>
                    )
                })
                : "empty"
            }
        </div>

    </div>
  )
}

export default AllEvents