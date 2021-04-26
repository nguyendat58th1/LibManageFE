import './login.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useHistory } from 'react-router';



type IFormInput = {
    username: string;
    password: string;

}

export function Login() {
    


    const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
    let history = useHistory();
    const [error, setError] = useState(null);
    const [user, setUser]: [any, any] = useState([]);
    const [userId, setUserId]: [any, any] = useState();

    useEffect(() => {
        axios.get("https://localhost:5001/api/User",  {withCredentials: true}).then(data => {
            setUser(data.data);
        });
    }, []);

    async function onSubmit (data: IFormInput)  {
        const User = {
         username: data.username,
         password: data.password
        
       };
    
    let axiosConfig = {
        withCredentials: true,
    }
      

       try {
        await axios.post("https://localhost:5001/api/User/login", User , axiosConfig);
        // const res = await axios.get("https://localhost:5001/api/User");
        // const data = res.data;
        // setUser(data);
        // console.log("abc");
        for(let i = 0 ; i<user.length ; i++)
        {
            if (user[i].username == User.username && user[i].password === User.password) {
                sessionStorage.setItem('userId', user[i].userId);
                sessionStorage.setItem('role', user[i].role);
            }
        }

        history.push("/book");
       } catch (err) {
         setError(err);
       }
     }
   
     
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">

                <div className="fadeIn first">
                    <img src="https://iconarchive.com/download/i52489/custom-icon-design/pretty-office-8/Users.ico" id="icon" alt="User Icon" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("username", { required : true,maxLength: 20 })} type="text" id="username" className="fadeIn second" placeholder="username" />
                    {errors?.username?.type === "required" && <p>This field is required</p>}
                    {errors?.username?.type === "maxLength" && (
                        <p>Username cannot exceed 20 characters</p>
                    )}
                    <input {...register("password", {  required: true })} type="password" id="password" className="fadeIn third" placeholder="password" />
                    {errors?.password?.type === "required" && <p>This field is required</p>}
                    
                    <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
                    {error && <p>Wrong username or password!</p>}
                </form>

                <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>
            </div>
        </div>

    )
}
export default Login;