import React, { useRef, useState } from 'react';
import { Instagram, Linkedin, Github, Twitter, Send, Loader2 } from 'lucide-react';

const FooterContact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '' });

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setToast({ message: '', type: '' });

        setTimeout(() => {
            setLoading(false);
            setToast({ message: 'Message sent successfully!', type: 'success' });
            form.current.reset();
            
            setTimeout(() => {
                setToast({ message: '', type: '' });
            }, 3000);
        }, 2000);
    };

    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/__shiv.chauhan?igsh=NnJ5aWV1aTRnNnhr", label: "Instagram" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/shiv-chauhan-7a8f05", label: "LinkedIn" },
        { icon: Github, href: "https://github.com/viiiiiimmv", label: "GitHub" },
        { icon: Twitter, href: "https://x.com/iamshivchauhann?t=0s3quq5vbQUwe2U64NhSBw&s=09", label: "Twitter" }
    ];

    return (
        <section id="contact" className="relative h-max bg-black text-white">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-white" />
                        <p className="text-sm text-gray-300">Sending message...</p>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast.message && (
                <div className={`fixed top-8 right-8 px-6 py-3 rounded-lg border z-50 transition-all duration-300 ${
                    toast.type === 'success' 
                        ? 'bg-green-900 bg-opacity-90 border-green-500 border-opacity-30 text-green-100' 
                        : 'bg-red-900 bg-opacity-90 border-red-500 border-opacity-30 text-red-100'
                }`}>
                    {toast.message}
                </div>
            )}

            <div className="container mx-auto px-6 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    
                    {/* Left Section */}
                    <div className="space-y-12">
                        <div className="space-y-2">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
                                <span className="block">CURIOUS</span>
                                <span className="block">ABOUT</span>
                                <span className="block">SOMETHING<span className="text-gray-500">?</span></span>
                            </h1>
                        </div>
                        
                        <div className="space-y-8">
                            <p className="text-lg text-gray-300 font-light tracking-wide">
                                CONNECT WITH ME
                            </p>
                            
                            {/* Social Icons */}
                            <div className="flex gap-6">
                                {socialLinks.map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-3 border border-gray-800 rounded-full hover:border-white transition-colors duration-300"
                                        aria-label={label}
                                    >
                                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="pt-16">
                            <p className="text-sm text-gray-500 leading-relaxed">
                                © 2025, Shiv Chauhan.<br />
                                All Rights Reserved
                            </p>
                        </div>
                    </div>

                    {/* Right Section - Contact Form */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-2">
                                DROP ME A MESSAGE!
                            </h2>
                            <div className="w-16 h-px bg-white"></div>
                        </div>
                        
                        <form ref={form} onSubmit={sendEmail} className="space-y-8">
                            {/* Name Field */}
                            <div className="group space-y-2">
                                <label className="block text-xs tracking-widest text-gray-400 uppercase">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Your Name"
                                    required
                                    className="w-full bg-transparent border-b border-gray-700 py-3 text-lg placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="group space-y-2">
                                <label className="block text-xs tracking-widest text-gray-400 uppercase">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    className="w-full bg-transparent border-b border-gray-700 py-3 text-lg placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                                />
                            </div>

                            {/* Message Field */}
                            <div className="group space-y-2">
                                <label className="block text-xs tracking-widest text-gray-400 uppercase">
                                    Message
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Your Message"
                                    required
                                    rows={5}
                                    className="w-full bg-transparent border-b border-gray-700 py-3 text-lg placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium tracking-wide text-sm uppercase hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Start a Conversation</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Subtle grid pattern overlay */}
            <div 
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '50px 50px'
                }}
            ></div>
        </section>
    );
};

export default FooterContact;