import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Applied() {
  return (
    <>
     <Navbar />
    
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-semibold">Applied Jobs</h1>
        <p>Here are the listings for applied jobs:</p>
        {/* Add job listings or content here */}
      </div>
    </div>
    </>
  )
}

export default Applied
