import React, { useState } from 'react';
import './AuthForm.css';
import loginImage from '../Assets/login.png'; // Your login image
import signupImage from '../Assets/signup.png'; // Your signup image

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-image-side">
          <img 
            src={isLogin ? loginImage : signupImage} 
            alt={isLogin ? "Login illustration" : "Signup illustration"} 
            className="auth-image"
          />
        </div>

        <div className="auth-form-side">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
              />
              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="auth-input"
                />
              )}
            </div>
            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;