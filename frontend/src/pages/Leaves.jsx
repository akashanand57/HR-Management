import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import styles for the calendar

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);  // Store leave records
  const [isModalOpen, setIsModalOpen] = useState(false); // To show the modal
  const [newLeave, setNewLeave] = useState({
    name: '',
    designation: '',
    leaveDate: '',
    purpose: '',
    status: 'Approved', // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLeave((prevLeave) => ({
      ...prevLeave,
      [name]: value,
    }));
  };

  const handleSaveLeave = () => {
    setLeaves((prevLeaves) => [...prevLeaves, newLeave]);
    setIsModalOpen(false);
    setNewLeave({ name: '', designation: '', leaveDate: '', purpose: '', status: 'Approved' });  // Reset form after save
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date) => {
    setNewLeave((prevLeave) => ({
      ...prevLeave,
      leaveDate: date.toLocaleDateString(), // Update leaveDate with the selected date
    }));
  };

  return (
    <div className="p-6 flex">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-6">Leave Management</h1>
        
        {/* Button to open the Add Leave modal */}
        <button 
          onClick={handleOpenModal} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
        >
          Add Leave
        </button>

        {/* Leave Table */}
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Leave Date</th>
              <th className="p-3 text-left">Purpose</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="p-3">{leave.name}</td>
                  <td className="p-3">{leave.designation}</td>
                  <td className="p-3">{leave.leaveDate}</td>
                  <td className="p-3">{leave.purpose}</td>
                  <td className="p-3">{leave.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">No leave records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Calendar on the right side of the table */}
      <div className="ml-8 w-80">
        <Calendar
          onChange={handleDateChange} // Handle date selection
          value={newLeave.leaveDate ? new Date(newLeave.leaveDate) : new Date()}
          className="shadow-md rounded"
        />
      </div>

      {/* Modal Form for Adding Leave */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4 text-center font-semibold">Add New Leave</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  value={newLeave.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div>
                <label htmlFor="designation" className="block text-sm font-medium">Designation</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  placeholder="Enter Designation"
                  value={newLeave.designation}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div>
                <label htmlFor="leaveDate" className="block text-sm font-medium">Leave Date</label>
                <input
                  type="text"
                  id="leaveDate"
                  name="leaveDate"
                  value={newLeave.leaveDate}
                  disabled
                  className="border p-2 w-full rounded-md bg-gray-200"
                />
              </div>
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium">Purpose</label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  placeholder="Enter Purpose"
                  value={newLeave.purpose}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium">Status</label>
                <select
                  id="status"
                  name="status"
                  value={newLeave.status}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                >
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleSaveLeave}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save Leave
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
