// VolumeControl.jsx
import React from 'react';
import '../assets/css/VolumeControl.css';

const VolumeControl = ({ isMuted, setIsMuted }) => {
  const handleToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <span
      className={`volume-text ${isMuted ? 'muted' : ''}`}
      onClick={handleToggle}
    >
      SCN835
    </span>
  );
};

export default VolumeControl;
