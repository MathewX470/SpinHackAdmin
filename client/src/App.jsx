import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get("https://spinhackadmindevman.onrender.com/getTeams")
      .then((res) => setTeams(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Function to download Excel
  const downloadExcel = () => {
    const formattedData = teams.map((team) => ({
      "Team Name": team.teamName,
      "Team Members": team.members.join(", "),
      Topic: team.topic,
      "Created At": new Date(team.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "Hackathon_Teams.xlsx");
  };

  return (
    <div className="app-wrapper">
      
      <div className="download-btn-wrapper">
        <button onClick={downloadExcel} className="download-btn">
          📥 Download Excel
        </button>
      </div>

      <div className="table-card">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Team Members</th>
              <th>Topic</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{team.teamName}</td>
                <td>{team.members.join(", ")}</td>
                <td>{team.topic}</td>
                <td>{new Date(team.createdAt).toISOString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
