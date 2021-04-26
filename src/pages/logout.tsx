import './login.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useHistory } from 'react-router';
import { useCookies } from 'react-cookie';





export function Logout() {


    let history = useHistory();
    //const [user, setUser] = useState();
    useEffect(() => {
        axios.post("https://localhost:5001/api/User/logout",  {withCredentials: true});
        history.push("/login");
    }, []);
    
 
     
    return <></>;
}
export default Logout;