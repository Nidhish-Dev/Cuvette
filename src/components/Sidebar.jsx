import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {

    const userRole = localStorage.getItem('role'); 
    setRole(userRole);
  }, []);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 sidebar-custom-height">
      <nav className="mt-5 px-2">
      
        <NavLink
          to={role === 'Employer' ? "/createJob" : "/full-time-jobs"}
          className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md ${
              isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`
          }
        >
          <svg
            className="mr-4 h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {role === 'Employer' ? "Create Job" : "Full-time Jobs"}
        </NavLink>

        {/* Other Jobs */}
        <NavLink
          to="/other-jobs"
          className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md ${
              isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`
          }
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          Other Jobs
          <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-green-100 text-green-800">
            New
          </span>
        </NavLink>

        {/* Applied Jobs */}
        <NavLink
          to="/applied"
          className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md ${
              isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`
          }
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Applied Jobs
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
