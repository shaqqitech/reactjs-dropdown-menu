import React, { useState, useRef, useEffect } from 'react';

function DropDown() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const countries = ['Pakistan', 'India', 'China', 'Nepal', 'Bangladesh', 'Albania', 'Mali', 'Malta', 'Mongolia', 'Canada'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-screen min-h-screen bg-gray-950 flex justify-center items-center'>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button
            type="button"
            className="bg-gray-800 hover:bg-gray-900 w-56 px-4 py-2 rounded-md shadow-md shadow-gray-800 flex items-center justify-between"
            onClick={toggleDropdown}
          >
            {selectedCountry ? (
              <span className='text-gray-300'>{selectedCountry}</span>
            ) : (
              <span className="text-gray-300 w-full">Select a country</span>
            )}
            <svg
              className={`ml-2 h-5 w-5 transition-transform transform ${
                isOpen ? '-rotate-180' : 'rotate-0'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
                className='text-gray-300'
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 h-40 overflow-y-auto rounded-md shadow-md shadow-gray-700 bg-gray-900 ">
            <div className="py-1">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => selectCountry(country)}
                  className="block w-full text-start px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDown;
