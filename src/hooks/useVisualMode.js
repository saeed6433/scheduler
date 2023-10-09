import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((prevHistory) => {
      const updatedHistory = replace
        ? [...prevHistory.slice(0, -1), newMode]
        : [...prevHistory, newMode];
      return [...updatedHistory.slice(-3)];
    });
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  return { mode, transition, back };
}