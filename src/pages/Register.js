import React, { useEffect, useState } from 'react'
import "../Styles/Login.scss"
import { Avatar } from '@mui/material'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom'
import {auth, db } from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {
  const navigate = useNavigate();
  // const [isLoading,setIsLoading] = useState(false);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues,setFormValues] = useState({email: "", password : "", name: ""});

  const validate=(values)=>{
    const errors = {};
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(!values.name){
      errors.name = "Name required!";
    }
    if(!values.email){
      errors.email = "Email required!";
    }else if(!regex.test(values.email)){
      errors.email = "Invalid Email Address!"
    }
    if(!values.password){
      errors.password = "Password required!";
    }else if(values.password.length<6){
      errors.password = "Password too short!"
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    setFormErrors(validate(formValues));

    setIsSubmit(true);  
    
  }

  const handleChange=(e)=>{
    const {name,value} = e.target;

    setFormErrors((prev)=>{
      return {
        ...prev,
        [name] : ""
      }
    })
    setFormValues((prev)=>{
      return {
        ...prev,
        [name] : value
      }
    })
  }

  useEffect(()=>{
    const setData=async()=>{
      console.log("sadsd");
      // setIsLoading(true);
      const displayName = formValues.name;
      const email = formValues.email;
      const password = formValues.password;

      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // setIsLoading(false);
        navigate("/");
        await updateProfile(result.user,{
          displayName,
        });
        await setDoc(doc(db, "users", result.user.uid), {
          uid : result.user.uid,
          displayName,
          email,
          status : "offline"
        });
        // await setDoc(doc(db,"userChats",result.user.uid),{});
      } catch (error) {
        console.log(error);
      }
    }
    if(Object.keys(formErrors).length===0 && isSubmit){
      setData();
    }
  },[formErrors])

  return (
    <div className='login'>
    <div className="formContainer">
       <div className="form">
       <h1>Welcome Back!</h1>
       <hr className='new'/>
        {/* <Avatar className='avatar' /> */}
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=""/>

        <div className="inputDiv">
            <input type="text" placeholder='displayName' name="name" value={formValues.name} onChange={handleChange}/>
            <p className='error'>{formErrors.name}</p>
            <input type="text" placeholder='email' name="email" value={formValues.email} onChange={handleChange}/>
            <p className='error'>{formErrors.email}</p>
            <input type="text" placeholder='password' name="password" value={formValues.password} onChange={handleChange}/>
            <p className='error'>{formErrors.password}</p>
        </div>
        <button onClick={handleSubmit}>Register</button>
        <div className="line">
        <hr /><span>or</span><hr />
        </div>
        
        <Link to="/">Sign In</Link>
       </div>
    </div>
</div>
  )
}

export default Register