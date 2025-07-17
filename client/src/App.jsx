import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [teams, setTeams] = useState([]);

   useEffect(() => {
     axios
       .get("http://localhost:3001/getTeams")
       .then((res) => setTeams(res.data))
       .catch((err) => console.log(err));
   }, []);

  return (
    <div className="app-wrapper">
      <h1>Hackathon Teams & Topics</h1>
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
