import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Terminal } from 'lucide-react';
import VolumeControl from './VolumeControl';

export default function Hero({ isMuted, setIsMuted }) {
  const [currentTime, setCurrentTime] = useState('');
  const [scrambledText, setScrambledText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const originalText = "SHIV CHAUHAN";
  const subtitle =
    "Hey there! Glad you stopped by — feel free to explore and get to know a little more about me.";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    setTimeout(scrambleText, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };

    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrambleText = () => {
    if (isScrambling) return;

    setIsScrambling(true);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    let iterations = 0;

    const interval = setInterval(() => {
      const scrambled = originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (iterations > i * 2) return originalText[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setScrambledText(scrambled);
      iterations++;

      if (iterations > originalText.length * 2) {
        clearInterval(interval);
        setScrambledText(originalText);
        setIsScrambling(false);
      }
    }, 60);
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative h-screen max-h-screen w-screen overflow-hidden bg-black text-white flex flex-col"
    >
      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-5 transition-transform duration-700"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 lg:px-12 py-6 shrink-0">
        <div className="flex items-center space-x-3 text-gray-400 font-mono text-sm">
          <Terminal className="w-5 h-5" />
          <span>PORTFOLIO</span>
          <div className="w-2 h-4 bg-gray-400 animate-pulse"></div>
        </div>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative text-gray-400 hover:text-white transition"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex font-mono text-sm text-gray-500">
            <span className="mr-2">IST</span>
            <span className="text-white">{currentTime}</span>
          </div>
          <VolumeControl isMuted={isMuted} setIsMuted={setIsMuted} />
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-8 lg:px-12">
        <div className="max-w-7xl w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT */}
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="flex items-center space-x-4 mb-8 text-xs font-mono text-gray-500 opacity-0 animate-fade-in">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>SYSTEM_ONLINE</span>
            </div>

            <div className="space-y-6 mb-8">
              <div className="text-lg text-gray-400 tracking-widest opacity-0 animate-fade-in-delay-1">
                THIS IS
              </div>

              <h1
                className="font-black cursor-pointer opacity-0 animate-fade-in-delay-2"
                onClick={scrambleText}
                style={{
                  transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 'clamp(3rem, 8vw, 8rem)',
                  lineHeight: 1.05,
                }}
              >
                <span className="relative inline-block">
                  {scrambledText || originalText}

                  {isScrambling && (
                    <>
                      <span className="absolute inset-0 text-red-500 opacity-70 animate-glitch-1">
                        {scrambledText}
                      </span>
                      <span className="absolute inset-0 text-blue-500 opacity-70 animate-glitch-2">
                        {scrambledText}
                      </span>
                    </>
                  )}
                </span>
              </h1>

              <div className="h-1 w-32 bg-white animate-pulse opacity-0 animate-fade-in-delay-3"></div>
            </div>

            <div className="max-w-2xl opacity-0 animate-fade-in-delay-4">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                {subtitle}
              </p>
            </div>

            <div className="flex items-center space-x-8 mt-12 opacity-0 animate-fade-in-delay-5">
              <div className="flex items-center space-x-3 text-gray-500 font-mono text-sm">
                <span>&gt;</span>
                <span>explore_portfolio.sh</span>
                <div className="w-2 h-4 bg-gray-400 animate-pulse"></div>
              </div>

              <div className="hidden lg:flex items-center space-x-3 text-xs text-gray-600">
                <span>Press ↓ to continue</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-end">
            <div className="relative w-full max-w-xl max-h-[70vh]">
              <img
                src="/assets/hero-portrait.jpeg"
                alt="Portrait"
                className="w-full h-full object-cover rounded-2xl grayscale brightness-90 contrast-125 opacity-80"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/40 via-transparent to-black/20" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-gray-900 bg-black/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between px-8 lg:px-12 py-3 text-xs font-mono text-gray-500">
          <span>Ready | UTF-8 | Portfolio v2.0</span>
          <div className="hidden md:flex space-x-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 h-1 bg-gray-600 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-delay-1 { animation: fade-in 0.8s 0.8s forwards; }
        .animate-fade-in-delay-2 { animation: fade-in 0.8s 1.2s forwards; }
        .animate-fade-in-delay-3 { animation: fade-in 0.8s 1.6s forwards; }
        .animate-fade-in-delay-4 { animation: fade-in 0.8s 2s forwards; }
        .animate-fade-in-delay-5 { animation: fade-in 0.8s 2.4s forwards; }

        @keyframes glitch-1 {
          0%,100%{transform:translate(0)}
          20%{transform:translate(-1px,1px)}
          40%{transform:translate(-1px,-1px)}
          60%{transform:translate(1px,1px)}
          80%{transform:translate(1px,-1px)}
        }
        @keyframes glitch-2 {
          0%,100%{transform:translate(0)}
          20%{transform:translate(1px,-1px)}
          40%{transform:translate(1px,1px)}
          60%{transform:translate(-1px,-1px)}
          80%{transform:translate(-1px,1px)}
        }
        .animate-glitch-1 { animation: glitch-1 0.5s infinite; }
        .animate-glitch-2 { animation: glitch-2 0.5s infinite; }
      `}</style>
    </section>
  );
}
