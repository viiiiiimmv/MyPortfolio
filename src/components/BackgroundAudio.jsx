import { useEffect, useRef } from 'react';

const BackgroundAudio = ({ src, volume = 0.5, isMuted }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;

    audio.play().catch((err) => {
      console.warn("Autoplay failed:", err);
    });
  }, [volume, isMuted]);

  return <audio ref={audioRef} src={src} autoPlay />;
};

export default BackgroundAudio;
