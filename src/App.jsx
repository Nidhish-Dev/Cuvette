import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import FullTimeJobs from './components/FullTimeJobs';
import OtherJobs from './components/OtherJobs';
import Applied from './components/Applied';
import CreateJob from './components/CreateJob';
import JobForm from './components/JobForm';

const ProtectedRoute = ({ element, allowedRole }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Redirect to login if not authenticated or not the correct role
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Navigate to="/full-time-jobs" />} />
        <Route path="/createJob" element={<ProtectedRoute element={<CreateJob />} allowedRole="Employer" />} />
        <Route path="/full-time-jobs" element={<FullTimeJobs />} />
        <Route path="/other-jobs" element={<OtherJobs />} />
        <Route path="/applied" element={<Applied />} />
        <Route path="/jobform" element={<JobForm />} />
      </Routes>
    </Router>
  );
};

export default App;
