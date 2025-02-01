import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Candidates from './pages/Candidates';
import Employees from './pages/Employees';
import Attendance from './pages/Attendence';
import Leaves from './pages/Leaves';
import Logout from './pages/Logout';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [candidates, setCandidates] = useState([]); // Manage candidates data
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State to handle logout confirmation modal

  // Filter selected candidates to send only employees
  const selectedEmployees = candidates.filter((candidate) => candidate.status === 'Selected');

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true); // Show logout confirmation modal
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false (log out)
    setIsLogoutModalOpen(false); // Close modal
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false); // Close modal if user cancels
  };

  return (
    <Router>
      <Routes>
        {/* Registration and Login Routes */}
        <Route path="/" element={!isRegistered ? <Register onRegister={() => setIsRegistered(true)} /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <Login onLogin={() => setIsLoggedIn(true)} /> : <Navigate to="/candidates" />} />

        {/* Protected Routes with Sidebar */}
        {isLoggedIn && (
          <Route
            path="/*"
            element={
              <div className="flex">
                <Sidebar setIsLoggedIn={setIsLoggedIn} handleLogoutClick={handleLogoutClick} />
                <div className="flex-1 p-4">
                  <Routes>
                    <Route
                      path="/candidates"
                      element={<Candidates candidates={candidates} setCandidates={setCandidates} />}
                    />
                    <Route
                      path="/employees"
                      element={<Employees candidates={candidates} setCandidates={setCandidates} />}
                    />
                    <Route
                      path="/attendance"
                      element={<Attendance employees={selectedEmployees} />}
                    />
                    {/* Make sure the Leaves route is correctly defined */}
                    <Route path="/leaves" element={<Leaves />} />
                    {/* Redirect after logout */}
                    <Route path="/logout" element={<Navigate to="/" />} />
                    {/* Default Route after login */}
                    <Route path="*" element={<Navigate to="/candidates" />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}

        {/* Route to handle logout and redirect to Register page */}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className=" p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl text-black font-semibold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
              <button
                onClick={handleCancelLogout}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
