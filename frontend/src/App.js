import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element = {<Home/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/signup" element= {<Signup/>}/>
            <Route path="/login/dashboard" element = {<Dashboard/>}/>
          </Routes>
        </Router>   
    </>
  );
}
export default App;