import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/books');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login failed', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
