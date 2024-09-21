import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; 
import Navbar from './Navbar';
import '../App.css';

const FullTimeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    tech: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://cuvette-server.vercel.app/jobs/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched jobs:', data);
        setJobs(data.jobs);  
        setFilteredJobs(data.jobs); 
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const results = jobs.filter(job => {
      const matchesType = filters.type ? job.title.toLowerCase().includes(filters.type.toLowerCase()) : true;
      const matchesTech = filters.tech ? job.tech.some(techItem => techItem.toLowerCase().includes(filters.tech.toLowerCase())) : true;
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.experience.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch && matchesType && matchesTech;
    });

    setFilteredJobs(results); 
  }, [searchTerm, jobs, filters]); 

  const applyToJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token'); 
  
      if (!token) {
        throw new Error('No token found, please log in.');
      }
  
      const response = await fetch(`https://cuvette-server.vercel.app/jobs/apply/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to apply for the job');
      }
  
      const data = await response.json();
      console.log('Job applied successfully:', data);
  
    } catch (error) {
      console.error('Error applying to the job:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex">
          <div className="flex-1 p-10">
            <h1 className="text-2xl font-semibold">Full-Time Jobs</h1>

            {/* Search Bar */}
            <div className="mb-5 mt-5">
              <input
                type="text"
                placeholder="Search jobs..."
                className="p-2 border border-gray-300 rounded w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>

            {/* Job Listings */}
            <p>Here are the listings for full-time jobs:</p>

            {filteredJobs && filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job._id} className="card mt-10">
                  <div className="title">
                    <div className="titleText">{job.title}</div>
                    <p className="location">{job.location}</p>
                  </div>

                  <div className="tech flex flex-row">
                    <div className="techs flex gap-4">
                      {job.tech.map((techItem, index) => (
                        <div key={index} className="tech-item">
                          {techItem}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lower flex gap-4">
                    <div className="package bordered">
                      <p className='lowerTitle'>Job Offer</p>
                      <p className='lowerData'>{job.package} LPA</p>
                    </div>
                    <div className="startDate bordered">
                      <p className='lowerTitle'>Start Date</p>
                      <p className='lowerData'>{new Date(job.startdate).toLocaleDateString()}</p>
                    </div>
                    <div className="openings bordered">
                      <p className='lowerTitle'>#Openings</p>
                      <p className='lowerData'>{job.openings}</p>
                    </div>
                    <div className="experience">
                      <p className='lowerTitle'>Experience</p>
                      <p className='lowerData'>{job.experience}</p>
                    </div>
                  </div>

                  <div className="type">
                    <p className='lowerData'>{job.type}</p>
                  </div>
                  <div className="btns flex gap-3">
                    <button className='viewbtn'>View Details</button>
                    <button className='applybtn' onClick={() => applyToJob(job._id)}>Apply Now</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>

          {/* Filters Section */}
          <div className="w-64 p-6 bg-white border-l border-gray-200">
            <h2 className="text-lg font-medium">Filters</h2>
            <div className="flex flex-col gap-4 mt-2">
              <select
                value={filters.type}
                onChange={(e) => setFilters(prevFilters => ({ ...prevFilters, type: e.target.value }))}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">All Job Types</option>
                <option value="backend">Backend</option>
                <option value="frontend">Frontend</option>
              </select>
              <input
                type="text"
                placeholder="Filter by technology"
                className="p-2 border border-gray-300 rounded"
                value={filters.tech}
                onChange={(e) => setFilters(prevFilters => ({ ...prevFilters, tech: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullTimeJobs;
