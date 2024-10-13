/*"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/login/read/${username}/${password}`);
      
      if (response.data) {
        console.log('Login successful:', response.data);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid username or password');
    }
  };

  return (
    <div className={styles['login-page']}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button className={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
*/
/*"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/login/read/${username}/${password}`);
      
      if (response.data) {
        console.log('Login successful:', response.data);
        router.push(`/dashboard?username=${encodeURIComponent(username)}`);
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid username or password');
    }
  };

  return (
    <div className={styles['login-page']}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button className={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;*/


"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/login/read/${username}/${password}`);
      
      if (response.data) {
        console.log('Login successful:', response.data);
        router.push(`/dashboard?username=${encodeURIComponent(username)}`);
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid username or password');
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
          <Link href="/signin" className="text-white hover:text-black">
            Signin
          </Link>
        </div>
      </nav>
      <br/><br/>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="username">Username:</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700" htmlFor="password">Password:</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;



