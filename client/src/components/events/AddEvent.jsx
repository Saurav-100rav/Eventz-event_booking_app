import React, { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerEvent ,isLoggedIn} from '../api'
import "./addevent.css"
const AddEvent = () => {
  const navigate = useNavigate();
  useEffect(()=>{
      authenticateUser();
  },[]);

  const authenticateUser = async()=>{
      try {
          const result = await isLoggedIn();
          console.log(result)
          if(result){
              alert("welcome on add event page....");
          }
          else navigate("/login")
      } catch (error) {
          navigate("/login")
      }
  }
    const obj = {
        'eventName' : '',
        'eventVenue' : '',
        'eventTime' : '',
        'eventDescription' : ''
    }
    const [input,setInput] = useState(obj);
    const getInputValue = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInput({...input,[name]:value});
    }
    const AddNewEvent = async()=>{
       const { eventName,eventTime,eventVenue,eventDescription} = input;
       if(eventName==="" || eventTime==="" || eventVenue==="" || eventDescription==="")
            alert("Please Enter All Fields...");
       else if(eventName && eventTime && eventDescription && eventVenue){
            try {
              const res = await registerEvent(input);
              console.log(res)
              if(res.data.msg==="Success"){
                alert(`${res.data.newEvent.eventName} event Successfully addedd...`);
                setInput(obj);
              }
            } catch (error) {
              alert("There is an error while adding this Event..");  
              console.log("Error while adding new Event..",error);
            }
  
          
       }
       else alert("invalid input")
    }
  return (
    <div className='event-container'>
        <input type="text" placeholder='Enter Event Name..' name='eventName' onChange={getInputValue} value={input.eventName} required={true}/>
        <input type="datetime-local" name="eventTime" id="eventTime" onChange={getInputValue} value={input.eventTime} required={true} />
        <input type="text" placeholder='venue' name='eventVenue' onChange={getInputValue} value={input.eventVenue} required={true}/>
        <textarea cols="30" rows="5" placeholder='Enter Event Description' name='eventDescription'
               id='eventDescription' onChange={getInputValue} value={input.eventDescription} required={true}></textarea>
        <button className='btn' onClick={AddNewEvent}>Add An Event</button>
        <Link to="/allevents"><button type='submit' className='btn btn-link' >See All Events</button></Link>       
    </div>
  )
}


export default AddEvent