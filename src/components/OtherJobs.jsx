import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; 
import Navbar from './Navbar';
import '../App.css';

function OtherJobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredJobs, setFilteredJobs] = useState([]); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://cuvette-server.vercel.app/jobs/otherjobs');
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

    const results = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.experience.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(results); 
  }, [searchTerm, jobs]); 
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10">
          <h1 className="text-2xl font-semibold">Other Jobs</h1>

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
                
                  <div className="experience">
                    <p className='lowerTitle'>Experience</p>
                    <p className='lowerData'>{job.experience}</p>
                  </div>
                </div>

                <div className="type">
                  <p className='lowerData'>{job.type}</p>
                </div>
                <div className="btns flex gap-3">
                  <button className='applybtn'>Apply</button>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
        
      </div>
    </>
  )
}

export default OtherJobs
