/*"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

function SignInPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const response = await axios.post('http://localhost:8080/login/create', {
        "username": username,
        "password": password,
        "email": email
      });
      router.push('/dashboard')
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert("Your username or email is already taken")
    }
    
  };

  return (
    <div className="signin-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;*/
"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const response = await axios.post('http://localhost:8080/login/create', {
        "username": username,
        "password": password,
        "email": email
      });
      router.push('/dashboard');
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert("Your username or email is already taken");
    }
  };

  return (
    <div className="signin-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;


