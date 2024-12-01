import React, { useEffect, useState } from 'react';

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
          {username && <h2>Hello, {username}!</h2>}
      </div>
    );
  };

export default Header