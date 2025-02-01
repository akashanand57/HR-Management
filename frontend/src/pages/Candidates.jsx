import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Candidates = ({ candidates, setCandidates }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    status: '',
    declaration: false,
  });

  const positions = ['Developer', 'Designer', 'Part Time','Full Time'];
  const statuses = ['New', 'Scheduled', 'Selected', 'Rejected'];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.declaration) {
      const newCandidate = { ...formData, id: candidates.length + 1 };

      // If status is 'Selected', add to Employees list as well
      if (newCandidate.status === 'Selected') {
        setCandidates((prev) => [...prev, newCandidate]);
      } else {
        setCandidates((prev) => [...prev, newCandidate]);
      }

      setShowModal(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        resume: null,
        status: '',
        declaration: false,
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Candidtaes</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <select className="border p-2 mr-2">
            <option>Status</option>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
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
        <button className="bg-purple-700 text-white p-2 rounded" onClick={() => setShowModal(true)}>
          Add Candidate
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-purple-700 text-white">
            <th className="p-2">Sr no.</th>
            <th className="p-2">Candidate Name</th>
            <th className="p-2">Email Address</th>
            <th className="p-2">Phone Number</th>
            <th className="p-2">Position</th>
            <th className="p-2">Status</th>
            <th className="p-2">Experience</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate, index) => (
              <tr key={candidate.id} className="border text-center">
                <td>{index + 1}</td>
                <td>{candidate.fullName}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.position}</td>
                <td>{candidate.status}</td>
                <td>{candidate.experience} years</td>
                <td>
                  <button
                    className="text-red-600"
                    onClick={() => setCandidates(candidates.filter((c) => c.id !== candidate.id))}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4">No candidates found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <div className="flex justify-between items-center bg-purple-700 p-2 text-white">
              <h2>Add New Candidate</h2>
              <button onClick={() => setShowModal(false)}>✖</button>
            </div>
            <form className="grid grid-cols-2 gap-4 p-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Full Name"
                className="border p-2"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email Address"
                className="border p-2"
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                placeholder="Phone Number"
                className="border p-2"
                onChange={handleChange}
                required
              />
              <select
                name="position"
                value={formData.position}
                className="border p-2"
                onChange={handleChange}
                required
              >
                <option value="">Select Position</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              <select
                name="status"
                value={formData.status}
                className="border p-2"
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                placeholder="Experience"
                className="border p-2"
                onChange={handleChange}
                required
              />
              <input type="file" name="resume" className="border p-2" onChange={handleChange} required />
              <label className="col-span-2 flex items-center">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  className="mr-2"
                  onChange={handleChange}
                />
                I hereby declare that the above information is true to the best of my knowledge and belief
              </label>
              <button
                type="submit"
                className={`col-span-2 p-2 text-white rounded ${
                  formData.declaration ? 'bg-purple-700' : 'bg-gray-400'
                }`}
                disabled={!formData.declaration}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
