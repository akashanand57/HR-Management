import { useState } from 'react';
import { FaSearch } from "react-icons/fa";


const Employees = ({ candidates, setCandidates }) => {
  const positions = ['Developer', 'Designer', 'Part Time', 'Full Time'];

  // Filter selected candidates
  const selectedEmployees = candidates.filter((candidate) => candidate.status === 'Selected');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [showMenu, setShowMenu] = useState(null); // Store which menu is open for which employee

  const openEditModal = (employee) => {
    setEditedEmployee({ ...employee });
    setIsEditModalOpen(true);
    setShowMenu(null); // Close the menu when modal is opened
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditedEmployee(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEditedEmployee = () => {
    console.log('Saving edited employee:', editedEmployee);

    // Update the candidate data with the edited data
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === editedEmployee.id ? { ...candidate, ...editedEmployee } : candidate
    );

    console.log('Updated candidates:', updatedCandidates);

    // Update the candidates state in the parent component
    setCandidates(updatedCandidates);

    // Close the modal after saving
    closeEditModal();
  };

  const deleteEmployee = (id) => {
    const updatedCandidates = candidates.filter((candidate) => candidate.id !== id);
    setCandidates(updatedCandidates);
    setShowMenu(null); // Close menu after deletion
  };

  const toggleMenu = (id) => {
    setShowMenu(showMenu === id ? null : id); // Toggle visibility of the menu
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Employees</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <select className="border p-2">
            <option>Position</option>
            {positions.map((pos) => (
              <option key={pos}>{pos}</option>
            ))}
          </select>
        </div>
        <div className='flex items-center gap-4 '>
                <FaSearch />
                <input type="text" placeholder="Search"  />
                </div>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-purple-700 text-white">
            <th className="p-2">Sr no.</th>
            <th className="p-2">Employee Name</th>
            <th className="p-2">Email Address</th>
            <th className="p-2">Phone Number</th>
            <th className="p-2">Position</th>
            <th className="p-2">Experience</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedEmployees.length > 0 ? (
            selectedEmployees.map((candidate, index) => (
              <tr key={candidate.id} className="border text-center">
                <td>{index + 1}</td>
                <td>{candidate.fullName}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.position}</td>
                <td>{candidate.experience} years</td>
                <td>
                  <button
                    className="text-gray-600"
                    onClick={() => toggleMenu(candidate.id)}
                  >
                    &#8942; {/* Three vertical dots */}
                  </button>

                  {showMenu === candidate.id && (
                    <div className="absolute bg-white border p-2 shadow-lg rounded mt-1">
                      <button
                        className="block w-full text-left p-2 hover:bg-gray-200"
                        onClick={() => openEditModal(candidate)}
                      >
                        Edit
                      </button>
                      <button
                        className="block w-full text-left p-2 hover:bg-gray-200 text-red-600"
                        onClick={() => deleteEmployee(candidate.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No selected employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <div className="flex justify-between items-center bg-purple-700 p-2 text-white">
              <h2>Edit Employee</h2>
              <button onClick={closeEditModal}>✖</button>
            </div>
            <form className="grid grid-cols-2 gap-4 p-4">
              <input
                type="text"
                name="fullName"
                value={editedEmployee?.fullName}
                placeholder="Full Name"
                className="border p-2"
                onChange={handleEditChange}
                required
              />
              <input
                type="email"
                name="email"
                value={editedEmployee?.email}
                placeholder="Email Address"
                className="border p-2"
                onChange={handleEditChange}
                required
              />
              <input
                type="tel"
                name="phone"
                value={editedEmployee?.phone}
                placeholder="Phone Number"
                className="border p-2"
                onChange={handleEditChange}
                required
              />
              <select
                name="position"
                value={editedEmployee?.position}
                className="border p-2"
                onChange={handleEditChange}
                required
              >
                <option value="">Select Position</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="experience"
                value={editedEmployee?.experience}
                placeholder="Experience"
                className="border p-2"
                onChange={handleEditChange}
                required
              />
              <button
                type="button"
                className="col-span-2 p-2 text-white bg-purple-700 rounded"
                onClick={saveEditedEmployee}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
