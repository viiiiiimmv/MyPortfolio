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
        }
      });
    }, { threshold: 0.4 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="post-hero-section" id='about'>
      <div className="strip">BUILDING</div>
      <div className="strip">CREATING</div>
      <div className="strip">CAPTURING</div>
      <div className="strip">EXPLORING</div>
    </section>
  );
}
