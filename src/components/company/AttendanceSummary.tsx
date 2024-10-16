const AttendanceSummary: React.FC = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">
      Attendance summary report of the day
    </h2>
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Department</th>
          <th className="p-2 text-left">Total Employees</th>
          <th className="p-2 text-left">Present</th>
          <th className="p-2 text-left">Absent</th>
        </tr>
      </thead>
      <tbody>
        {["Finance", "Information Technology", "Marketing & Sales"].map(
          (dept) => (
            <tr key={dept} className="border-b">
              <td className="p-2">{dept}</td>
              <td className="p-2">6</td>
              <td className="p-2">4</td>
              <td className="p-2">2</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);
export default AttendanceSummary;
