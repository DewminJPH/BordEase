import React from 'react';
import './AuthForm.css';
import loginImage from '../Assets/login.png';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";

const AuthForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const submitCall = async (data) => {
    console.log(data);
    try{
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        data,{
          withCredentials:true
        }
      );
      if(response.status == 201){
        alert("Login Successfull!");
        navigate("/dashboard");
      }
    }catch(error){
      console.log(error);
      alert(error);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-image-side">
          <img 
            src={loginImage}
            alt="Login Image" 
            className="auth-image"
          />
        </div>

        <div className="auth-form-side">
          <div className="auth-tabs">
            < Link to ="/signup" className="auth-tab">
              Signup
            </Link>
            <div className="auth-tab active">
              Login
            </div>
          </div>

          <form onSubmit={handleSubmit(submitCall)} className="auth-form">
            <div className="form-group">
              
              <input
                type="text"
                placeholder="Username"
                className="auth-input"
                {...register("username",{
                  required:"Username is required",
                  minLength:{
                    value:3,
                    message:"username must be at least 3 characters"
                  },
                })}
              />
              {errors.username &&<div className="errormessage">{errors.username.message}</div>}
            </div>
            
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
                {...register("password",{
                  required:"Password is required",
                  minLength:{
                    value:6,
                    message:"Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password &&<div className="errormessage">{errors.password.message}</div>}
            </div>
            
            
            <button type="submit" className="auth-submit-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;