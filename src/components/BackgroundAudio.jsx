import { useEffect, useRef } from 'react';

const BackgroundAudio = ({ src, volume = 0.5, isMuted }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;

    if (isMuted) {
      audio.pause();
      return;
    }

    if (audio.readyState === 0) {
      audio.load();
    }

    audio.play().catch(() => {
      // Ignore autoplay policy failures until the next user interaction.
    });
  }, [volume, isMuted]);

  return <audio ref={audioRef} src={src} preload="none" playsInline />;
};

export default BackgroundAudio;
