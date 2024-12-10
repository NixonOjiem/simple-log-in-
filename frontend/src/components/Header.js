import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Header() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // Initialize useHistory
    
    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('username'); // Clear the username from local storage
      setUsername(''); // Clear the username state
      navigate('/signin'); // Redirect to the login page
  };
  
    return (
      <div className='Header'>
        <FontAwesomeIcon icon={faUserLarge} className='UserIcon'/>
        <h1 className='Username'>{username && <p>Hello, {username}!</p>}</h1>
        <p className='LogOut' onClick={handleLogout}>Log Out</p>
      </div>
    );
  };

export default Header