import React, { useEffect, useState } from "react";
import "../styles/MilkingHistory.css";
import { Link } from "react-router-dom";

const MilkingHistoryPage = () => {
  const [milkingHistory, setMilkingHistory] = useState([]);

  useEffect(() => {
    setMilkingHistory(JSON.parse(localStorage.getItem("milkingHistory")) || []);
  }, []);
  return (
    <div>
      <div className="heading-container">
        <h2 className="history-title">Milking History</h2>
        <Link to={"/"} className="view-history-button">
          Go Back
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>Total Time</th>
            <th>Total Milk</th>
          </tr>
        </thead>
        <tbody>
          {milkingHistory.map((session, index) => (
            <tr key={index}>
              <td>{session.date}</td>
              <td>{session.startTime}</td>
              <td>{session.totalTime} sec</td>
              <td>{session.totalMilk} L</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MilkingHistoryPage;
