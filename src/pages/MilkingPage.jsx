import React, { useEffect, useState } from "react";
import "../styles/MilkingPage.css";
import { Link } from "react-router-dom";

function MilkingPage() {
  const [audio, setAudio] = useState(new Audio(require("../assets/music.mp3")));
  const [startedMilking, setStartedMilking] = useState(false);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [milkingTimer, setMilkingTimer] = useState(0);
  const [milkingHistory, setMilkingHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("milkingHistory")) || [];
    setMilkingHistory(history);
  }, []);

  const startMilking = () => {
    setStartedMilking(true);
    setIsPlaying(true);
    audio.loop = true;
    audio.play();
    setTime(new Date().toLocaleTimeString());
  };

  const handleMilking = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const stopMilking = () => {
    audio.pause();
    setIsPlaying(false);
    const quantity = window.prompt(
      "Enter the quantity of milk (e.g., 5 liters):"
    );
    if (quantity !== null && quantity !== "") {
      const session = {
        date: new Date().toLocaleDateString(),
        startTime: time,
        totalTime: milkingTimer,
        totalMilk: quantity,
      };

      setMilkingTimer(0);
      setAudio(new Audio(require("../assets/music.mp3")));
      setStartedMilking(false);

      const updatedHistory = [...milkingHistory, session];
      setMilkingHistory(updatedHistory);
      localStorage.setItem("milkingHistory", JSON.stringify(updatedHistory));
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const totalSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(totalSeconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setMilkingTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="container">
      <h1>Welcome to Milking Tracker</h1>
      <div>{formatDuration(milkingTimer)}</div>
      <div className="buttons-container">
        {!startedMilking ? (
          <button onClick={() => startMilking()} className="central-button">
            Start Milking
          </button>
        ) : (
          <>
            <button onClick={() => handleMilking()} className="central-button">
              {isPlaying ? "Pause Milking" : "Resume Milking"}
            </button>
            <button onClick={() => stopMilking()} className="central-button">
              Stop Milking
            </button>
          </>
        )}

        <Link to={"/history"} className="view-history-button">
          View History
        </Link>
      </div>
    </div>
  );
}

export default MilkingPage;
