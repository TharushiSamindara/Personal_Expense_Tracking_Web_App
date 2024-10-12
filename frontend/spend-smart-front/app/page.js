"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import home_img from './images/home_img.png'; 
import linegraph from './images/linegrph.png'; 
import piechart from './images/piechart.png'; 
import maxImg from './images/maxImg.png'; 
import warningImg from './images/warningImg.png'; 
import addImg from './images/addImg.png'; 
import categoryImg from './images/categoryImg.png'; 
import upDelImg from './images/upDelImg.png'; 
import graphImg from './images/graphImg.png'; 

export default function HomePage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-gray-800"><span className="text-red-500">S</span>pend<span className="text-red-500">S</span>mart</div>
            
            <div className="flex-1 flex justify-center space-x-8">
              <a href="#home" className="text-gray-600 hover:text-blue-500 transition duration-200">
                Home
              </a>
              <a href="#overview" className="text-gray-600 hover:text-blue-500 transition duration-200">
                Overview
              </a>
              <a href="#features" className="text-gray-600 hover:text-blue-500 transition duration-200">
                Features
              </a>
            </div>

            <div className="space-x-4">
              <button 
                onClick={handleLogin} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
              <button 
                onClick={handleSignIn} 
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl px-8">
          {/* Left Side: Text */}
          <div className="md:w-1/2 text-center md:text-left md:pr-8">
            <h1 className="text-5xl font-bold text-blue-900">
              Effortlessly Track Your Expenses with SpendSmart
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Visualize the flow of your money at a glance with a fully customizable App.
            </p>

            <button 
              className="mt-8 flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
              onClick={handleSignIn}
            >
              <span className="font-semibold">Start Building</span>
            </button>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <Image 
              src={home_img} 
              alt="Home Image" 
              width={700} 
              height={700} 
              className="rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Overview
          </h2>
          <p className="mt-4 text-gray-600">
            SpendSmart is a user-friendly Personal Expense Tracking Web App designed to simplify how 
            you manage your finances. With SpendSmart, you can effortlessly add, track, update, and 
            delete your daily expenses, set a monthly spending limit, and visualize your spending habits
            with intuitive charts. It's the perfect tool for staying on top of your budget and making 
            informed financial decisions, all in one place.
          </p>
          <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
            <Image 
              src={linegraph} 
              alt="Line Graph" 
              width={300} 
              height={200} 
              className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image 
              src={piechart} 
              alt="Pie Chart" 
              width={300} 
              height={200} 
              className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="h-screen flex flex-col items-center justify-center bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {
                src: maxImg,
                alt: "Max Monthly Expense",
                text: "Set max monthly expense. Then you can limit your expense before exceed the limit."
              },
              {
                src: warningImg,
                alt: "Warning Message",
                text: "Get warning message if you spend exceed 90% of max monthly expense."
              },
              {
                src: addImg,
                alt: "Add Expense",
                text: "Add expense with date."
              },
              {
                src: categoryImg,
                alt: "Category Expense",
                text: "Add your expenses with category."
              },
              {
                src: upDelImg,
                alt: "Update and Delete Expenses",
                text: "Update and delete expenses."
              },
              {
                src: graphImg,
                alt: "Graph Expenses",
                text: "See your expenses using graph in current month."
              },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                <Image 
                  src={feature.src} 
                  alt={feature.alt} 
                  width={150} 
                  height={150} 
                  className="rounded-lg mb-2"
                />
                <p className="mt-2 text-gray-600 text-center">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
