"use client";

import React from 'react';

export default function HomePage() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-gray-800">SpendSmart</div>
            <div className="space-x-4">
              <a href="#home" className="text-gray-600 hover:text-blue-500">
                Home
              </a>
              <a href="#overview" className="text-gray-600 hover:text-blue-500">
                Overview
              </a>
              <a href="#features" className="text-gray-600 hover:text-blue-500">
                Features
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="h-screen flex items-center justify-center bg-blue-100">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to SpendSmart
        </h1>
      </section>

      {/* Overview Section */}
      <section id="overview" className="h-screen flex items-center justify-center bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Overview
          </h2>
          <p className="mt-4 text-gray-600">
            SpendSmart helps you track your expenses effortlessly, providing insights into your spending habits and helping you stay on budget.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="h-screen flex items-center justify-center bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Features
          </h2>
          <ul className="mt-4 space-y-4 text-gray-600">
            <li>- Track your daily expenses easily.</li>
            <li>- Get insights with graphical representations.</li>
            <li>- Set budget limits and manage your savings.</li>
            <li>- Secure and user-friendly interface.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
