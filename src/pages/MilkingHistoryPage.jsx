import React, { useEffect, useState } from "react";
import "../styles/MilkingHistory.css";

const MilkingHistoryPage = () => {
  const [milkingHistory, setMilkingHistory] = useState([]);

  useEffect(() => {
    setMilkingHistory(JSON.parse(localStorage.getItem("milkingHistory")) || []);
  }, []);
  return (
    <div>
      <h2>Milking History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total Time</th>
            <th>Total Milk</th>
          </tr>
        </thead>
        <tbody>
          {milkingHistory.map((session, index) => (
            <tr key={index}>
              <td>{session.date}</td>
              <td>{session.startTime}</td>
              <td>{session.endTime}</td>
              <td>{session.totalTime}</td>
              <td>{session.totalMilk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MilkingHistoryPage;
