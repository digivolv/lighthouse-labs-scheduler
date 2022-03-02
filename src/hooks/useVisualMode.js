import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      setHistory([...history, newMode]);
    } else {
      setMode(newMode);
      //spread injects the values into arrray
      //no spread will inject an array into array (do not use {[...prev.slice]})
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      //asynchronous so have to store in variable
      const prevHistory = history.slice(0, -1);
      setHistory(prevHistory);
      setMode(prevHistory[prevHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}
