import { useEffect, useRef, useState } from 'react';

export default function PostHero() {
  const sectionRef = useRef(null);
  const [scrambledTexts, setScrambledTexts] = useState({});

  const words = [
    { text: 'BUILDING', accent: 'blue-500' },
    { text: 'CREATING', accent: 'emerald-500' },
    { text: 'CAPTURING', accent: 'violet-500' },
    { text: 'EXPLORING', accent: 'amber-500' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const strips = entry.target.querySelectorAll('.strip');
          strips.forEach((strip, index) => {
            setTimeout(() => {
              strip.classList.add('in-view');
              // Trigger scramble effect for each word
              scrambleText(words[index].text, index);
            }, index * 300);
          });
          observer.unobserve(entry.target);
          setTimeout(() => startRandomScrambleLoop(), words.length * 300 + 2000);
        }
      });
    }, { threshold: 0.3 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrambleText = (finalText, index) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let iterations = 0;
    const maxIterations = finalText.length * 3;

    const interval = setInterval(() => {
      const scrambled = finalText
        .split('')
        .map((char, i) => {
          if (iterations > i * 3) {
            return finalText[i];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      setScrambledTexts(prev => ({
        ...prev,
        [index]: scrambled
      }));

      iterations++;

      if (iterations > maxIterations) {
        clearInterval(interval);
        setScrambledTexts(prev => ({
          ...prev,
          [index]: finalText
        }));
      }
    }, 50);
  };

  const startRandomScrambleLoop = () => {
    const patterns = [
      // Single random word scramble
      () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        scrambleText(words[randomIndex].text, randomIndex);
        glitchEffect(randomIndex);
      },
      // All words scramble
      () => {
        words.forEach((word, index) => {
          setTimeout(() => {
            scrambleText(word.text, index);
            glitchEffect(index);
          }, index * 200);
        });
      },
      // Wave scramble
      () => {
        words.forEach((word, index) => {
          setTimeout(() => {
            scrambleText(word.text, index);
            glitchEffect(index);
          }, index * 150);
        });
      }
    ];

    const loop = () => {
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      pattern();
      setTimeout(loop, 6000 + Math.random() * 4000);
    };

    loop();
  };

  const glitchEffect = (index) => {
    const strip = document.querySelectorAll('.strip')[index];
    if (strip) {
      strip.classList.add('glitch-active');
      setTimeout(() => {
        strip.classList.remove('glitch-active');
      }, 1000);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
      id="about"
    >
      {/* Scanlines Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-white to-transparent bg-repeat-y animate-pulse" 
             style={{ 
               backgroundSize: '100% 4px',
               backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
             }} />
      </div>

      {/* Terminal Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 0, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 0, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glitch-overlay opacity-0 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10 w-full h-full transition-opacity duration-75" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        
        {/* Terminal Header */}
        {/* <div className="flex items-center justify-center mb-20">
          <div className="flex items-center space-x-4 bg-neutral-950 border border-neutral-800 rounded-lg px-6 py-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-neutral-500 text-sm font-mono">~/portfolio/about</div>
            <div className="w-2 h-4 bg-neutral-400 animate-pulse"></div>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="space-y-6">
          {words.map((word, index) => (
            <div 
              key={word.text}
              className="strip relative opacity-0 translate-x-10 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              {/* Terminal Prompt */}
              <div className="flex items-center mb-2">
                <span className="text-green-400 font-mono text-sm mr-4">
                  {`> ${word.text.toLowerCase()}_process`}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-neutral-700 to-transparent"></div>
              </div>

              {/* Main Text with Scramble Effect */}
              <div className="relative group">
                <h2 className="
                  text-6xl md:text-7xl lg:text-8xl 
                  font-black font-mono tracking-wider
                  text-white
                  transition-all duration-300
                  group-hover:text-gray-300
                  relative
                  cursor-pointer
                "
                onMouseEnter={() => scrambleText(word.text, index)}
                >
                  {scrambledTexts[index] || word.text}
                  
                  {/* Glitch Layers */}
                  <span className="
                    absolute inset-0 text-red-500 opacity-0 
                    transition-opacity duration-75
                    translate-x-0.5 translate-y-0.5
                    glitch-layer-1
                  ">
                    {scrambledTexts[index] || word.text}
                  </span>
                  
                  <span className="
                    absolute inset-0 text-blue-500 opacity-0
                    transition-opacity duration-75
                    -translate-x-0.5 -translate-y-0.5
                    glitch-layer-2
                  ">
                    {scrambledTexts[index] || word.text}
                  </span>
                </h2>

                {/* Progress Bar */}
                <div className="mt-4 w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${word.accent} transition-all duration-1000 ease-out w-0 group-hover:w-full`}
                  />
                </div>

                {/* Status Text */}
                <div className="mt-2 flex items-center space-x-2 text-xs font-mono text-neutral-500">
                  <span>[</span>
                  <span className={`text-${word.accent}`}>ACTIVE</span>
                  <span>]</span>
                  <span className="flex space-x-1">
                    <span className="w-1 h-1 bg-current rounded-full animate-pulse"></span>
                    <span className="w-1 h-1 bg-current rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-1 h-1 bg-current rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Output */}
        <div className="mt-16 bg-neutral-950 border border-neutral-800 rounded-lg p-6 font-mono text-sm opacity-0 translate-y-4 transition-all duration-700 delay-1000">
  <div className="text-green-400 mb-2">&gt; system_status: operational</div>
  <div className="text-neutral-500 mb-2">&gt; loading_creative_modules...</div>
  <div className="text-blue-400 mb-2">&gt; portfolio_interface: ready</div>
  <div className="text-neutral-400">
    &gt; Crafting digital experiences through code, design & innovation
  </div>
</div>


        {/* Bottom Indicators */}
        <div className="flex justify-center mt-12 space-x-8">
          {['◐', '◓', '◑', '◒'].map((symbol, i) => (
            <div 
              key={i}
              className="text-2xl text-neutral-600 animate-spin opacity-0 transition-opacity duration-700"
              style={{ 
                animationDuration: `${2 + i * 0.5}s`,
                transitionDelay: `${1200 + i * 100}ms`
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .strip.in-view {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        
        .strip.glitch-active .glitch-layer-1 {
          opacity: 0.7;
          animation: glitch1 0.3s ease-in-out;
        }
        
        .strip.glitch-active .glitch-layer-2 {
          opacity: 0.7;
          animation: glitch2 0.3s ease-in-out;
        }
        
        .strip.glitch-active .glitch-overlay {
          opacity: 1;
        }
        
        .opacity-0[style*="delay-1000"] {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .opacity-0[style*="delay-1200"] {
          opacity: 1 !important;
        }
        
        @keyframes glitch1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        
        @media (max-width: 768px) {
          .strip h2 {
            font-size: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}