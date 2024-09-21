import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function CreateJob() {
  const [form, setForm] = useState({
    title: '',
    location: '',
    tech: '',
    package: '',
    startdate: '',
    openings: 1,
    experience: '',
    type: 'Full-time',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const techArray = form.tech.split(',').map(tech => tech.trim()); // Convert tech stack to array
      const response = await axios.post('https://cuvette-server.vercel.app/jobs/createjob', {
        ...form,
        tech: techArray, // Pass array to backend
      });

      setSuccess('Job created successfully!');
    } catch (error) {
      setError('Error creating job. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-5">
        <h2 className="text-2xl font-bold text-center mb-5">Create a Job</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Job Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Tech Stack (comma separated)</label>
            <input
              type="text"
              name="tech"
              value={form.tech}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Package (in LPA)</label>
            <input
              type="text"
              name="package"
              value={form.package}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              name="startdate"
              value={form.startdate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Openings</label>
            <input
              type="number"
              name="openings"
              value={form.openings}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Experience Required</label>
            <input
              type="text"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Job Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
