import { useState } from 'react';

const Attendance = ({ employees }) => {
  const [attendance, setAttendance] = useState(
    employees.map((employee) => ({
      id: employee.id,
      name: employee.fullName,
      status: 'Absent', // Default to 'Absent'
      task: 'Website Development',  // Dummy Task Data
      department: 'IT Department',  // Dummy Department Data
    }))
  );

  const handleStatusChange = (id, newStatus) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((emp) =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Employee Attendence</h1>


      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-purple-700 text-white">
            <th className="p-2">Sr no.</th>
            <th className="p-2">Employee Name</th>
            <th className="p-2">Task</th> {/* New Column for Task */}
            <th className="p-2">Department</th> {/* New Column for Department */}
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length > 0 ? (
            attendance.map((emp, index) => (
              <tr key={emp.id} className="border text-center">
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.task}</td> {/* Display Dummy Task */}
                <td>{emp.department}</td> {/* Display Dummy Department */}
                <td>
                  <select
                    value={emp.status}
                    onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                    className="border p-2"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No employees available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
