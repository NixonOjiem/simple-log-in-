import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signin', { username, password });
      alert(response.data);
      localStorage.setItem('username', username); // Save username to local storage
      navigate('/home'); // Redirect to the homepage
    } catch (error) {
      alert('Wrong credentials');
    }
  };

  return (
    <div>
      {showSignUp ? (
        <SignUp setShowSignUp={setShowSignUp} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="card">
              <div className="google">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                  Continue with Google
                </button>
              </div>
              <div className="border">
                <p>or</p>
              </div>
              <div className="inputBox">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="inputBox">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="btnBox">
                <p>Forgot password?</p>
              </div>
              <button className="btn" type="submit">Sign In</button>
              <button className="btn" type="button" onClick={() => setShowSignUp(true)}>Sign Up</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const SignUp = ({ setShowSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', { username, password, email });
      alert(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Username already exists');
      } else {
        alert('Error signing up');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="card">
          <div className="inputBox">
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">Sign Up</button>
          <button className="btn" type="button" onClick={() => setShowSignUp(false)}>Back to Sign In</button>
        </div>
      </div>
    </form>
  );
};

export default SignIn;