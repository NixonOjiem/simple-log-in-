import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [username, setUsername] = useState('');

    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);
  
    return (
      <div className='Header'>
        <FontAwesomeIcon icon={faUserLarge} className='UserIcon'/>
        <h1 className='Username'>{username && <p>Hello, {username}!</p>}</h1>
      </div>
    );
  };

export default Header