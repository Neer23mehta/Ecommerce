import React, { useEffect, useRef, useState } from 'react';

const URx = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/;

export const LogIN = ({ setIsLoggedIn }) => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const formData = localStorage.getItem('Items');
    if (formData) {
      setInput(JSON.parse(formData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.username === 'user' && input.password === 'password123') {
      localStorage.setItem('userToken', JSON.stringify(input));
      setIsLoggedIn(true);
      window.location.href = '/cart'; 
    } else {
      alert('Invalid credentials');
    }
    localStorage.setItem('Items', JSON.stringify(input));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
