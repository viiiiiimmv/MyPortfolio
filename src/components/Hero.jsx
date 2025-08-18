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
  const subtitle = "Hey there! Glad you stopped by — feel free to explore and get to know a little more about me.";
  
  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    
    // Initial text scramble animation
    setTimeout(() => {
      scrambleText();
    }, 1000);
    
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrambleText = () => {
    if (isScrambling) return;
    
    setIsScrambling(true);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    let iterations = 0;
    const maxIterations = originalText.length * 2;

    const interval = setInterval(() => {
      const scrambled = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (iterations > index * 2) {
            return originalText[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      setScrambledText(scrambled);
      iterations++;

      if (iterations > maxIterations) {
        clearInterval(interval);
        setScrambledText(originalText);
        setIsScrambling(false);
      }
    }, 60);
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col"
    >
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 opacity-5 transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      />

      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-8 lg:px-12">
        <div className="flex items-center space-x-4">
          {/* Terminal Icon */}
          <div className="flex items-center space-x-3 text-gray-400">
            <Terminal className="w-5 h-5" />
            <span className="font-mono text-sm tracking-wider">PORTFOLIO</span>
            <div className="w-2 h-4 bg-gray-400 animate-pulse"></div>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative text-gray-400 hover:text-white transition-colors duration-300 font-light tracking-wide"
            >
              <span className="relative z-10">{link.label}</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></div>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-4 text-gray-500 font-mono text-sm">
            <span>IST</span>
            <span className="text-white">{currentTime}</span>
          </div>
          <VolumeControl isMuted={isMuted} setIsMuted={setIsMuted} />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8 lg:px-12">
        <div className="max-w-6xl w-full">
          
          {/* Status Bar */}
          <div className="flex items-center space-x-4 mb-8 text-xs font-mono text-gray-500 opacity-0 animate-fade-in">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>SYSTEM_ONLINE</span>
            </span>
            <span>|</span>
            <span>LOADING_PORTFOLIO</span>
            <div className="flex space-x-1 ml-4">
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-6 mb-12">
            <div className="text-lg text-gray-400 font-light tracking-widest opacity-0 animate-fade-in-delay-1">
              THIS IS
            </div>
            
            <h1 
              className="text-6xl md:text-7xl lg:text-9xl font-black tracking-tight cursor-pointer opacity-0 animate-fade-in-delay-2"
              onClick={scrambleText}
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                fontFamily: 'ui-monospace, monospace'
              }}
            >
              <span className="relative inline-block">
                {scrambledText || originalText}
                
                {/* Glitch layers */}
                {isScrambling && (
                  <>
                    <span 
                      className="absolute inset-0 text-red-500 opacity-70 animate-glitch-1"
                      style={{ transform: 'translate(2px, -2px)' }}
                    >
                      {scrambledText}
                    </span>
                    <span 
                      className="absolute inset-0 text-blue-500 opacity-70 animate-glitch-2"
                      style={{ transform: 'translate(-2px, 2px)' }}
                    >
                      {scrambledText}
                    </span>
                  </>
                )}
              </span>
              <span className="text-gray-600">.</span>
            </h1>

            {/* Typing cursor effect */}
            <div className="h-1 w-32 bg-white animate-pulse opacity-0 animate-fade-in-delay-3"></div>
          </div>

          {/* Subtitle */}
          <div className="max-w-2xl opacity-0 animate-fade-in-delay-4">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              {subtitle}
            </p>
          </div>

          {/* Interactive Elements */}
          <div className="flex items-center space-x-8 mt-16 opacity-0 animate-fade-in-delay-5">
            <div className="flex items-center space-x-3 text-gray-500 font-mono text-sm">
              <span>&gt;</span>
              <span>explore_portfolio.sh</span>
              <div className="w-2 h-4 bg-gray-400 animate-pulse"></div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6 text-xs text-gray-600">
              <span>Press ↓ to continue</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 border-t border-gray-900 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 lg:px-12 py-4 text-xs font-mono text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>Ready</span>
            </span>
            <span>|</span>
            <span>UTF-8</span>
            <span>|</span>
            <span>Portfolio v2.0</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <span>Scroll to explore</span>
            <div className="flex space-x-1">
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
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(1px, -1px); }
          40% { transform: translate(1px, 1px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(-1px, 1px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          animation-delay: 0.5s;
        }
        
        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out forwards;
          animation-delay: 0.8s;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out forwards;
          animation-delay: 1.2s;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out forwards;
          animation-delay: 1.6s;
        }
        
        .animate-fade-in-delay-4 {
          animation: fade-in 0.8s ease-out forwards;
          animation-delay: 2s;
        }
        
        .animate-fade-in-delay-5 {
          animation: fade-in 0.8s ease-out forwards;
          animation-delay: 2.4s;
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.5s ease-in-out infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.5s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}