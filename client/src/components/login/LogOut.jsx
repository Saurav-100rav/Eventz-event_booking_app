import React, { useEffect } from 'react'
import { logOutUser } from '../api';
import { useNavigate } from 'react-router-dom';

const LogOut = (props) => {
    const navigate = useNavigate();
    useEffect(()=>{
        loggingOut();
    },[])
    const loggingOut = async()=>{
        try {
            const res = await logOutUser();
            if(res.data.msg==="Logout successful"){
                alert("logging out....")
                alert("Thanks for using our service, have a nice day buddy!😊😊😊😊");
                props.setStatus(false);
                navigate("/");
            }
        } catch (error) {
            console.log("error while logging out....",error)
        }
    }
  return (
    <>

    </>
  )
}

export default LogOut