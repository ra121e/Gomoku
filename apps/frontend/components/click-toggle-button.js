"use client";

import { useState } from "react";

// Minimal client component / click handler example.
export function ClickToggleButton() {
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(0); 

  function handleClick() {
    setEnabled((current) => !current);
  }


  function callBackFunc(count)
  {
    return (++count);
  }

  function handleClickCount() {
    setCount(callBackFunc)
  }

  return (
    <div>
    <button
      type="button"
      className={`btn ${enabled ? "btn-on" : "btn-off"}`}
      aria-pressed={enabled}
      onClick={handleClick}
    >
      {enabled ? "ON" : "OFF"}
    </button>

    <button 
      type="button"
      className="btn"
      onClick={handleClickCount}
    >
      {count}
    </button>
    </div>
  );
}
