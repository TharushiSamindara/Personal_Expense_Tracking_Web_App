// SearchInput.js

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm(''); // Clear the input after search
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded mr-2"
      />
      <FaSearch
        onClick={handleSearch}
        className="cursor-pointer text-gray-600"
      />
    </div>
  );
};

export default SearchInput;
