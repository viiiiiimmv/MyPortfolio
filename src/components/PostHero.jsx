import { useEffect, useRef } from 'react';
import '../assets/css/PostHero.css';

export default function PostHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const strips = entry.target.querySelectorAll('.strip');
        strips.forEach((strip, index) => {
          setTimeout(() => {
            strip.classList.add('in-view');
          }, index * 300);
        });

        observer.unobserve(entry.target);

        // Start animation loop after all strips are visible
        setTimeout(() => startRandomHoverLoop(strips), strips.length * 300 + 500);
      }
    });
  }, { threshold: 0.4 });

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);

function startRandomHoverLoop(strips) {
  const patterns = [
    // Pattern 1: One random at a time
    () => {
      const strip = strips[Math.floor(Math.random() * strips.length)];
      animateStrip(strip, 1000);
    },
    // Pattern 2: All together
    () => {
      strips.forEach(strip => animateStrip(strip, 1000));
    },
    // Pattern 3: Wave from top to bottom
    () => {
      strips.forEach((strip, index) => {
        setTimeout(() => animateStrip(strip, 1000), index * 250);
      });
    },
    // Pattern 4: Random half
    () => {
      const half = Math.floor(strips.length / 2);
      const shuffled = [...strips].sort(() => 0.5 - Math.random());
      shuffled.slice(0, half).forEach(strip => animateStrip(strip, 1000));
    }
  ];

  function animateStrip(strip, duration) {
    strip.classList.add('active');
    setTimeout(() => {
      strip.classList.remove('active');
    }, duration);
  }

  // Infinite loop of random patterns
  function loop() {
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    pattern();
    setTimeout(loop, 3000 + Math.random() * 2000);
  }

  loop();
}


  return (
    <section ref={sectionRef} className="post-hero-section" id='about'>
      <div className="strip">BUILDING</div>
      <div className="strip">CREATING</div>
      <div className="strip">CAPTURING</div>
      <div className="strip">EXPLORING</div>
    </section>
  );
}
