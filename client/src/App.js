import { BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom';

import Homepage from "./components/homepage/Homepage"
import Login from "./components/login/Login"
import Register from "./components/register/Register";
import { useState } from 'react';
import Profile from './components/profile/Profile';
import AddEvent from './components/events/AddEvent';
import AllEvents from './components/events/AllEvents';
import { Navbar } from './components/navbar/Navbar';
import LogOut from './components/login/LogOut';
import Booking from './components/events/Booking';
import EventDetails from './components/events/EventDetails';
function App() {
  const [currUser,setuser]=useState();
  const [isLoggedIn,setStatus]=useState(false);
  const getuservalue = (value)=>{
      //  setuser(value);
      // console.log("hi",typeof(value.name));
      setStatus(value)
  }
  return (
    <div className="app">
      <Router>
        <Navbar status={isLoggedIn} setStatus={setStatus}/>
        <Routes>
          {/* <Route path='/' element={ (currUser) ? <Homepage setuser={setuser} user={currUser}/> : <Login setUser={getuservalue} setStatus={setStatus}/> }/> */}
          <Route path='/' element={ isLoggedIn ? <Homepage/> : <Login setStatus={setStatus}/>} />
          <Route path='/login' element={<Login setUser={getuservalue} setStatus={setStatus}/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/addevent' element={<AddEvent/>} />
          <Route path='/allevents' element={<AllEvents/>} />
          <Route path='/logout' element={<LogOut  setStatus={setStatus}/>} />
          <Route path='/booking' element={<Booking/>} />
          <Route path='/eventdetails/:id' element={<EventDetails/>} />
          <Route path="*" element={<Navigate to="/" replace />}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
