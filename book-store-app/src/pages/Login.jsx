import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // to store error messages
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Example API call for login (replace with your actual login API)
      const response = await fetch('https://iris-chisel-mimosa.glitch.me/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login. Please try again.');
      }

      const data = await response.json();

      if (data.success) {
        login(data.token); // Store token in AuthContext
        navigate('/books'); // Redirect to the Books page
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message); // Handle network or other errors
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;