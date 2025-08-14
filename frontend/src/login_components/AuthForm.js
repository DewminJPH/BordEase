import React from 'react';
import './AuthForm.css';
import loginImage from '../Assets/login.png';
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const submitCall = async (data) => {
    console.log(data);
    try{
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );
      if(response.status == 201){
        alert("Login Successfull!");
      }
    }catch(error){
      console.log(error);
    }
  };

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

          <form className="auth-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                className="auth-input"
                {...register("username",{
                  required:"Username is required",
                })}
              />
              {errors.username && (<div classname="errormessage">{errors.username.message}</div>)}
            </div>
            
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
                {...register("password",{
                  required:"Password is not correct"
                })}
              />
              {errors.password && (<div classname="errormessage">{errors.password.message}</div>)}
            </div>
            
            
            <Link to="/login/dashboard" type="submit" className="auth-submit-btn">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;