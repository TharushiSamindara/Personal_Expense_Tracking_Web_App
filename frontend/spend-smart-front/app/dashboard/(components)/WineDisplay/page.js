import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WineDisplay() {
  const [wine, setWine] = useState(null);
  
  useEffect(() => {
    const fetchWine = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/wines/reds');
        const wines = response.data;
        const randomWine = wines[Math.floor(Math.random() * wines.length)];
        setWine(randomWine);
      } catch (error) {
        console.error('Error fetching wine data:', error);
      }
    };
    
    fetchWine();
  }, []);

  if (!wine) return <p>Loading wine information...</p>;

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold">{wine.wine}</h2>
      <p className="text-gray-600">{wine.winery}</p>
      <p className="text-gray-500">{wine.location}</p>
      <img src={wine.image} alt={wine.wine} className="w-20 h-80 object-cover my-2 mx-auto" />
      <p>Rating: {wine.rating.average} ({wine.rating.reviews})</p>
    </div>
  );
}

export default WineDisplay;
