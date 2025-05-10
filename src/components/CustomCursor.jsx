import React, { useEffect, useState } from "react";
import "../assets/css/CustomCursor.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="cursor-wrapper" style={{ left: position.x, top: position.y }}>
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </div>
  );
};

export default CustomCursor;
