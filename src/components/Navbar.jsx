import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem('user');
      navigate('/');
    }
  }, [navigate]);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest('#dropdownButton') && !event.target.closest('#dropdownMenu')) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between mt-2 mb-2 h-16">
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0">
              <img className="h-8 w-auto" src="logo.svg" alt="Cuvette" />
            </a>
          </div>

          {/* Profile Dropdown */}
          <div className="relative inline-flex">
            <button
              id="dropdownButton"
              type="button"
              className="flex items-center border-none rounded-lg py-1 px-3 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              aria-haspopup="true"
              aria-expanded={isOpen}
              onClick={toggleDropdown}
            >
              <img
                className="h-8 w-8 rounded-full"
                src="user.png"
                alt="Profile"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">{user.name} ({user.role})</span>
              <svg
                className={`ml-2 h-5 w-5 text-gray-400 transform ${isOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div
                id="dropdownMenu"
                className="absolute right-0 z-10 min-w-[240px] bg-white shadow-md rounded-lg p-1 mt-14"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropdownButton"
              >
                <button
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 w-full text-left"
                  aria-label="Sign out"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
