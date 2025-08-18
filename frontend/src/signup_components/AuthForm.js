import React from 'react';
import {Link} from 'react-router-dom';
import './AuthForm.css';
import SignupImage from '../Assets/signup.png';
import {useForm} from "react-hook-form";
import axios from "axios";


const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState:{errors}
  }=useForm();

  const submitCall = async (data) => {
    console.log(data);
    try{
      const response = await axios.post("http://localhost:3001/api/auth/register",data)
      if(response.status==201){
        alert("Registration Successfull")
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className = "auth-wrapper">
      <div className="auth-container">
        <div className="auth-image-side">
          <img 
            src={SignupImage}
            alt="Signup Image"
            className="auth-image"
          />
        </div>
        
        <div className="auth-form-side">
          <div className="auth-tabs">
            <div className="auth-tab active">
              Signup
            </div>
            <Link to="/login" className="auth-tab">
              Login
            </Link>
          </div>
          <form onSubmit={handleSubmit(submitCall)} className="auth-form">
            
            <div className="form-group">
              <input {...register("username",{
                required:"Username is required",
                minLength:{
                  value:3,
                  message:"username must be at least 3 characters"
                },
              })} type="text" placeholder="Username" className="auth-input"/>
              {errors.username &&<div className="errormessage">{errors.username.message}</div>}
            </div>
            
            <div className="form-group">
              <input {...register("phonenumber",{
                required:"Phone number is required",
                pattern:{
                  value:/^[0-9]{10}$/,
                  message:"Phone number must be 10 digits",
                },
              })}type="text" placeholder="Phone number" className="auth-input"/>
              {errors.phonenumber &&<div className="errormessage">{errors.phonenumber.message}</div>}
            </div>
            
            <div className="form-group">
              <input {...register("password",{
                required:"Password is required",
                minLength:{
                  value:6,
                  message:"Password must be at least 6 characters",
                },
              })}type="password" placeholder="Password" className="auth-input"/>
              {errors.password &&<div className="errormessage">{errors.password.message}</div>}
            </div>
            
            
            <button type="submit" className="auth-submit-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
