import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUsers, FaCalendarCheck, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../public/Logo.png';

const Sidebar = ({ setIsLoggedIn }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for logout modal

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
    <div className="w-64 h-screen bg-gray-100 text-black flex flex-col">
      <div className="text-center ">
                  <img src={logo} alt="Logo" className="h-12 mx-auto" />
                </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
      </div>
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Recruitment</h3>
          <div className="flex items-center mb-2">
            <FaUser className="mr-2" />
            <Link to="/candidates">Candidates</Link>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Organization</h3>
          <div className="flex items-center mb-2">
            <FaUsers className="mr-2" />
            <Link to="/employees">Employees</Link>
          </div>
          <div className="flex items-center mb-2">
            <FaCalendarCheck className="mr-2" />
            <Link to="/attendance">Attendance</Link>
          </div>
          <div className="flex items-center mb-2">
            <FaCalendarAlt className="mr-2" />
            <Link to="/leaves">Leaves</Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Others</h3>
          <div className="flex items-center mb-2 cursor-pointer" onClick={handleLogoutClick}>
            <FaSignOutAlt className="mr-2" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-500 p-6 rounded shadow-lg w-1/3">
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
                className="px-6 py-2 bg-purple-900 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
