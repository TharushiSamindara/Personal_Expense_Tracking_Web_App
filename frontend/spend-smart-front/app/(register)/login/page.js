// app/login/page.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login logic here, such as sending data to an API
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <div className="update-password-link">
        <Link href="/update-password">
          Update Password
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
