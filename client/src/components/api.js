import axios from "axios";

const url = "http://localhost:3050"

const loginUser = async(obj)=>{
    const result = await axios.post(`${url}/login`,obj,{withCredentials:true});
    return result;
}
const registerUser = async(obj)=>{
    const result = await axios.post(`${url}/register`,obj);
    return result;
}

const isLoggedIn = async()=>{
    try {
        const res = await axios.get("http://localhost:3050/authUser",{ withCredentials: true });
        if(res.data.msg==="Success") return true;
        else return false;
    
      } catch (error) {
        //   alert("some error while authenticating users identity...");
          console.log("error while getting users identity..",error);
          return false;
      }
}

const registerEvent = async(obj)=>{
    const result = await axios.post(`${url}/newEvent`,obj,{ withCredentials: true });
    return result;
}
const fetchallEvents = async()=>{
    const result = await axios.get(`${url}/allevents`,{ withCredentials: true });
    return result;
}
const addEventProfile = async(event)=>{
    console.log("here",event)
    const result = await axios.post(`${url}/addevent`,event,{ withCredentials: true });
    console.log("here")
    return result;
}
const getProfileInfo = async()=>{
    const result = await await axios.get(`${url}/profile`,{ withCredentials: true });
    return result;
}
const logOutUser  = async()=>{
    const result = await axios.get(`${url}/logout`,{ withCredentials: true });
    return result;
}
const fetchSingleEvent = async(id)=>{
    const result = await axios.get(`${url}/event/id`,{ withCredentials: true });
}
export {loginUser,registerUser,registerEvent,fetchallEvents,isLoggedIn,addEventProfile,getProfileInfo,logOutUser,fetchSingleEvent};