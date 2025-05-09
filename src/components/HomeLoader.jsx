import { useEffect, useState } from 'react';
import '../assets/css/HomeLoader.css';

export default function HomeLoader() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000); // optional delay for smoother effect
    });
  }, []);

  return (
    <div className={`home-loader-wrapper ${loadingComplete ? 'exit' : ''}`}>
      <div className="home-door"></div>
      {!loadingComplete && (
        <div className={`home-sweep-container ${loadingComplete ? 'hide' : ''}`}>
        <div className="home-sweep home-sweep-left"></div>
        <div className="home-sweep home-sweep-right"></div>
      </div>
      )}
      {loadingComplete && <div className="home-final-expand"></div>}
    </div>
  );
}
