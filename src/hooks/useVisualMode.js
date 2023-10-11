import { useState } from "react";

export default function useVisualMode(initial) {
  // Initialize the current mode and mode history
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Function to transition to a new mode, with an option to replace the current mode in history
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((prevHistory) => {
      // Update the history, optionally replacing the current mode
      const updatedHistory = replace
        ? [...prevHistory.slice(0, -1), newMode]
        : [...prevHistory, newMode];
      // Keep the history limited to the last 3 modes for example
      return [...updatedHistory.slice(-3)];
    });
  };

  // Function to go back to the previous mode
  const back = () => {
    if (history.length > 1) {
      // Set the mode to the previous mode in history
      setMode(history[history.length - 2]);
      // Remove the last mode from the history
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  // Return the current mode and functions for transitioning and going back
  return { mode, transition, back };
}
