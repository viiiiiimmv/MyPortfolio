import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
    const [activeWord, setActiveWord] = useState(null);
    const [clickedPositions, setClickedPositions] = useState([]);
    const [hoveredLetter, setHoveredLetter] = useState(null);
    const [energyLevel, setEnergyLevel] = useState(0);
    const [mode, setMode] = useState('machines'); // 'machines' or 'humans'
    const [ripples, setRipples] = useState([]);
    const [particles, setParticles] = useState([]);
    const sectionRef = useRef(null);

    const words = [
        { text: "I", x: 20, y: 25 },
        { text: "don't", x: 28, y: 25 },
        { text: "write", x: 42, y: 25 },
        { text: "code", x: 58, y: 25 },
        { text: "to", x: 15, y: 45 },
        { text: "impress", x: 25, y: 45 },
        { text: mode === 'machines' ? "machines" : "humans", x: 45, y: 45, interactive: true },
        { text: "I", x: 25, y: 65 },
        { text: "write", x: 33, y: 65 },
        { text: "code", x: 50, y: 65 },
        { text: "to", x: 67, y: 65 },
        { text: "serve", x: 15, y: 85 },
        { text: mode === 'machines' ? "humans" : "machines", x: 35, y: 85, interactive: true }
    ];

    // Handle click ripple effect
    const handleCanvasClick = (e) => {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newRipple = { id: Date.now(), x, y };
        setRipples(prev => [...prev, newRipple]);

        // Generate particles at click point
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x,
            y,
            angle: (i / 8) * Math.PI * 2,
            speed: 2 + Math.random() * 2
        }));
        setParticles(prev => [...prev, ...newParticles]);

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 1000);

        setClickedPositions(prev => [...prev, { x, y, id: Date.now() }]);
        setEnergyLevel(prev => Math.min(100, prev + 10));
    };

    // Animate particles
    useEffect(() => {
        if (particles.length === 0) return;

        const interval = setInterval(() => {
            setParticles(prev => {
                return prev.map(p => ({
                    ...p,
                    x: p.x + Math.cos(p.angle) * p.speed * 0.2,
                    y: p.y + Math.sin(p.angle) * p.speed * 0.2,
                    speed: p.speed * 0.95
                })).filter(p => p.speed > 0.1);
            });
        }, 50);

        return () => clearInterval(interval);
    }, [particles.length]);

    // Energy decay
    useEffect(() => {
        const interval = setInterval(() => {
            setEnergyLevel(prev => Math.max(0, prev - 1));
        }, 200);
        return () => clearInterval(interval);
    }, []);

    // Clear old click positions
    useEffect(() => {
        const interval = setInterval(() => {
            setClickedPositions(prev => {
                const now = Date.now();
                return prev.filter(pos => now - pos.id < 2000);
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const toggleMode = () => {
        setMode(prev => prev === 'machines' ? 'humans' : 'machines');
        setEnergyLevel(prev => Math.min(100, prev + 25));
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden cursor-crosshair"
            id="about"
            onClick={handleCanvasClick}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                     backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                     backgroundSize: '50px 50px'
                 }}
            />

            {/* Click Ripples */}
            {ripples.map(ripple => (
                <div
                    key={ripple.id}
                    className="absolute border-2 border-white rounded-full pointer-events-none"
                    style={{
                        left: `${ripple.x}%`,
                        top: `${ripple.y}%`,
                        width: '20px',
                        height: '20px',
                        transform: 'translate(-50%, -50%)',
                        animation: 'ripple 1s ease-out forwards'
                    }}
                />
            ))}

            {/* Click Particles */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        opacity: particle.speed / 4,
                        boxShadow: '0 0 4px white'
                    }}
                />
            ))}

            {/* Connection Lines between clicks */}
            <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                {clickedPositions.map((pos, idx) => {
                    if (idx === 0) return null;
                    const prev = clickedPositions[idx - 1];
                    const age = Date.now() - pos.id;
                    const opacity = Math.max(0, 1 - age / 2000);
                    return (
                        <line
                            key={pos.id}
                            x1={`${prev.x}%`}
                            y1={`${prev.y}%`}
                            x2={`${pos.x}%`}
                            y2={`${pos.y}%`}
                            stroke="white"
                            strokeWidth="1"
                            opacity={opacity * 0.3}
                        />
                    );
                })}
            </svg>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pointer-events-none">

                {/* Top Control Panel */}
                <div className="mb-12 flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-4">
                        <div className="border border-white px-4 py-2 font-mono text-xs">
                            <span className="text-gray-500">ENERGY:</span>
                            <span className="ml-2 text-white">{energyLevel}%</span>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-8 border border-white"
                                    style={{
                                        backgroundColor: i < energyLevel / 10 ? 'white' : 'transparent'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="border border-white px-4 py-2 font-mono text-xs">
                        <span className="text-gray-500">MODE:</span>
                        <span className="ml-2 text-white uppercase">{mode}</span>
                    </div>
                </div>

                {/* Interactive Word Cloud */}
                <div className="relative" style={{ height: '500px' }}>
                    {words.map((word, idx) => (
                        <div
                            key={idx}
                            className={`absolute font-bold transition-all duration-500 pointer-events-auto ${
                                word.interactive ? 'cursor-pointer' : 'cursor-default'
                            }`}
                            style={{
                                left: `${word.x}%`,
                                top: `${word.y}%`,
                                fontSize: word.interactive ? '4rem' : 'clamp(2rem, 4vw, 3.5rem)',
                                transform: `translate(-50%, -50%) scale(${
                                    activeWord === idx ? 1.2 : 1
                                }) ${hoveredLetter === idx ? 'translateY(-10px)' : ''}`,
                                color: word.interactive ? 'white' : 'rgba(255,255,255,0.7)',
                                textShadow: word.interactive ? '0 0 20px white' : 'none',
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                            onMouseEnter={() => {
                                setActiveWord(idx);
                                setHoveredLetter(idx);
                            }}
                            onMouseLeave={() => {
                                setActiveWord(null);
                                setHoveredLetter(null);
                            }}
                            onClick={(e) => {
                                if (word.interactive) {
                                    e.stopPropagation();
                                    toggleMode();
                                }
                            }}
                        >
                            {word.interactive && (
                                <div className="absolute -inset-4 border-2 border-white animate-pulse opacity-50" />
                            )}
                            {word.text.split('').map((letter, letterIdx) => (
                                <span
                                    key={letterIdx}
                                    className="inline-block transition-transform duration-200"
                                    style={{
                                        transform: activeWord === idx && word.interactive
                                            ? `translateY(${Math.sin(letterIdx + Date.now() / 200) * 5}px)`
                                            : 'translateY(0)',
                                        transitionDelay: `${letterIdx * 0.05}s`
                                    }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                    ))}

                    {/* Connection lines between interactive words */}
                    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                        <line
                            x1="45%" y1="45%"
                            x2="35%" y2="85%"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            opacity="0.2"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0"
                                to="20"
                                dur="1s"
                                repeatCount="indefinite"
                            />
                        </line>
                    </svg>
                </div>

                {/* Instructions */}
                <div className="mt-12 text-center pointer-events-auto">
                    <div className="inline-block border border-white border-opacity-30 px-6 py-3">
                        <p className="font-mono text-xs text-gray-400">
                            CLICK anywhere to generate energy • HOVER over words to interact • CLICK highlighted words to flip perspective
                        </p>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4 pointer-events-auto">
                    <div className="border border-white border-opacity-20 p-4 text-center">
                        <div className="text-2xl font-bold mb-1">{clickedPositions.length}</div>
                        <div className="text-xs font-mono text-gray-500">INTERACTIONS</div>
                    </div>
                    <div className="border border-white border-opacity-20 p-4 text-center">
                        <div className="text-2xl font-bold mb-1">{particles.length}</div>
                        <div className="text-xs font-mono text-gray-500">PARTICLES</div>
                    </div>
                    <div className="border border-white border-opacity-20 p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${energyLevel > 50 ? 'bg-white' : 'bg-gray-600'}`} />
                            <span className="text-lg font-bold">LIVE</span>
                        </div>
                        <div className="text-xs font-mono text-gray-500">STATUS</div>
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
                @keyframes ripple {
                    0% {
                        width: 20px;
                        height: 20px;
                        opacity: 1;
                    }
                    100% {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    );
}