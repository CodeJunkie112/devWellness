import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import WorkoutTracker from './pages/WorkoutTracker';
import HabitsTracker from './pages/HabitsTracker';
import SleepMonitor from './pages/SleepMonitor';
import FoodIntake from './pages/FoodIntake';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/workout" element={<WorkoutTracker />} />
                    <Route path="/habits" element={<HabitsTracker />} />
                    <Route path="/sleep" element={<SleepMonitor />} />
                    <Route path="/food" element={<FoodIntake />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;