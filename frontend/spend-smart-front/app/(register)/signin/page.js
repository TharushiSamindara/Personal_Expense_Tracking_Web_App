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
/*"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './SigninPage.module.css'; // Ensure the CSS file is named 'SigninPage.module.css'

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
        username,
        password,
        email,
      });
      router.push('/dashboard');
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Your username or email is already taken');
    }
  };

  return (
    <div className={styles['signin-page']}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="username">Username:</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">Password:</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;*/
/*"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './SigninPage.module.css'; // Ensure the CSS file is named 'SigninPage.module.css'

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
        username,
        password,
        email,
      });
      
      // Redirect to the dashboard with username as a query parameter
      router.push(`/dashboard?username=${encodeURIComponent(username)}`);
      //router.push(`/setMaxExpense?username=${encodeURIComponent(username)}`);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Your username or email is already taken');
    }
  };

  return (
    <div className={styles['signin-page']}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="username">Username:</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">Password:</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;*/


"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        username,
        password,
        email,
      });

      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Redirect to the dashboard with username as a query parameter
      router.push(`/dashboard?username=${encodeURIComponent(username)}`);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Your username or email is already taken');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <nav className="bg-[#98AFC7] p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-red-500">S</span>
          <span className="text-black">pend</span>
          <span className="text-red-500">S</span>
          <span className="text-black">mart</span>
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-black">
            Home
          </Link>
          <Link href="/login" className="text-white hover:text-black">
            Login
          </Link>
        </div>
      </nav>

      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;


