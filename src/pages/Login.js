import React, { useState } from 'react'
import "../Styles/Login.scss"
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword , signInWithPopup} from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import {setValue} from "../slices/userSlice.js"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isLoading,setIsLoading] = useState(false);
  const [formValues,setFormValues] = useState({email: "", password : ""});


  const handleGoogleSignIn=async()=>{
    try{
      const response = await signInWithPopup(auth,provider);
      console.log(response.user);
      dispatch(setValue(response.user));

      // await updateDoc(doc(db, "users", response.user.uid), {
      //   status : "online"
      // });
      
      await setDoc(doc(db, "users", response.user.uid), {
        uid : response.user.uid,
        displayName : response.user.displayName,
        email : response.user.email,
        status : "online"
      });
      navigate("/homepage");
    }catch(err){  
      console.log(err);
    }
  }

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setFormValues((prev)=>{
      return {
        ...prev,
        [name] : value
      }
    })
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formValues.email;
    const password = formValues.password;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        status : "online"
      });

      const userInfo = await getDoc(doc(db,"users",result.user.uid));
      
      dispatch(setValue(userInfo.data()));
      navigate("/homepage");
    } catch (err) {
      console.log(err);
    }
  }
  

 
  return (
    <div className='login'>
        <div className="formContainer">
           <div className="form">
           <h1>Welcome Back!</h1>
           <hr className='new'/>
           <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=""/>

            <div className="inputDiv">
                <input type="text" placeholder='email' name="email" onChange={handleChange} value={formValues.email}/>
                <input type="text" placeholder='password' name="password" onChange={handleChange} value={formValues.password}/>
            </div>
            <button onClick={handleSubmit}>Login</button>
            <div className="line">
            <hr /><span>or</span><hr />
            </div>
            <GoogleButton className='google' onClick={handleGoogleSignIn}/>
            <Link to="/register">Sign Up</Link>
           </div>
        </div>
    </div>
  )
}

export default Login