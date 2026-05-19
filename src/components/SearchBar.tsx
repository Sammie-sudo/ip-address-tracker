import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (ipOrDomain: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg flex items-center shadow-lg rounded-2xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-slate-800 transition-all duration-300">
      <input
        type="text"
        placeholder="Search for any IP address or domain"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full py-4 pl-6 pr-4 text-slate-800 outline-none text-base font-normal placeholder:text-slate-400 bg-transparent"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        aria-label="Search"
        className="bg-black hover:bg-slate-800 text-white flex items-center justify-center h-[56px] w-[56px] min-w-[56px] cursor-pointer transition-colors duration-300 disabled:bg-slate-400 rounded-r-2xl"
      >

        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        )}
      </button>
    </form>
  );
};
