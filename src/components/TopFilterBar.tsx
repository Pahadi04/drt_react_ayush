import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

interface TopFilterBarProps {
  onSearch: (query: string) => void;
}

const TopFilterBar: React.FC<TopFilterBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="w-full bg-[#0d1b2a] py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-3">
        <h1 className="text-white text-2xl font-bold">Create My Asset list</h1>

        <div className="flex flex-wrap gap-3 items-center">
          {[
            { label: 'All Objects', count: 27949 },
            { label: 'Payloads', count: 14035 },
            { label: 'Debris', count: 10588 },
            { label: 'Rocket Bodies', count: 2167 },
            { label: 'Unknown', count: 557 },
          ].map(item => (
            <button
              key={item.label}
              className="text-white bg-[#202e3c] rounded-full px-4 py-1 flex items-center gap-1 text-sm hover:bg-[#2c3b4d]"
            >
              {item.label}
              <span className="text-cyan-400 font-semibold">({item.count})</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center mt-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search by Name/ NORAD ID"
              className="bg-[#1e2a38] text-white rounded-full pl-10 pr-4 py-2 w-64 placeholder:text-gray-400 border border-gray-600"
            />
            <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
          </div>

          <div className="relative">
            <button className="bg-[#1e2a38] text-white p-2 rounded-full border border-gray-600 hover:bg-[#2a3b4a]">
              <FiFilter />
            </button>
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              6
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-2">27949 objects</p>
      </div>
    </div>
  );
};

export default TopFilterBar;
