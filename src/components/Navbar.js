import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';  
import './Navbar.css';
import { Button } from './Button';

function Navbar() {
  const [click, setClick] = useState(false); 
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          
          <Link to="/" className="navbar-logo" > 
            BOARDEASE
          </Link>
          
          <div className="menu-icon" onClick={handleClick}>
            <FontAwesomeIcon 
              icon={click ? faTimes : faBars} 
              className={click ? 'fas fa-times' : 'fas fa-bars'} 
             />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu' }>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/explore" className="nav-links" onClick={closeMobileMenu}>
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-links" onClick={closeMobileMenu}>
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}>
                Post your ad
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>Post your ad</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar