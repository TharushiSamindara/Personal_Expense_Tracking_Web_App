"use client";

import React, { useState } from 'react';

function UpdatePasswordPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('New Password:', newPassword);
  };

  return (
    <div className="update-password-page">
      <h2>Update Password</h2>
      <form onSubmit={handleUpdate}>
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
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default UpdatePasswordPage;
