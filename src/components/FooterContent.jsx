import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Send,
  Loader2,
} from "lucide-react";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "../lib/motion";

const CTA_PHRASES = [
  "Curious about something?",
  "Want to connect?",
  "Have an idea to build?",
  "Need a frontend partner?",
  "Looking for collaboration?",
  "Ready to work together?",
  "Let's start a project?",
];

const FooterContact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ message: "", type: "" });

    setTimeout(() => {
      setLoading(false);
      setToast({ message: "Message sent successfully!", type: "success" });
      form.current.reset();

      setTimeout(() => {
        setToast({ message: "", type: "" });
      }, 3000);
    }, 2000);
  };

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/__shiv.chauhan?igsh=NnJ5aWV1aTRnNnhr",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/shiv-chauhan-7a8f05",
      label: "LinkedIn",
    },
    { icon: Github, href: "https://github.com/viiiiiimmv", label: "GitHub" },
    {
      icon: Twitter,
      href: "https://x.com/iamshivchauhann?t=0s3quq5vbQUwe2U64NhSBw&s=09",
      label: "Twitter",
    },
  ];

  useEffect(() => {
    const currentPhrase = CTA_PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 45 : 85;
    const holdDelay = 1300;
    const resetDelay = 260;
    let timeout;

    if (!isDeleting && typedText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), holdDelay);
    } else if (isDeleting && typedText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % CTA_PHRASES.length);
      }, resetDelay);
    } else {
      timeout = setTimeout(() => {
        const nextLength = isDeleting
          ? typedText.length - 1
          : typedText.length + 1;
        setTypedText(currentPhrase.slice(0, nextLength));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <Motion.section
      id="contact"
      className="relative h-max bg-black text-white"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <Motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
              <p className="text-sm text-gray-300">Sending message...</p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.message && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed right-8 top-8 z-50 rounded-lg border px-6 py-3 ${
              toast.type === "success"
                ? "border-green-500 border-opacity-30 bg-green-900 bg-opacity-90 text-green-100"
                : "border-red-500 border-opacity-30 bg-red-900 bg-opacity-90 text-red-100"
            }`}
          >
            {toast.message}
          </Motion.div>
        )}
      </AnimatePresence>

      <Motion.div
        className="relative z-10 container mx-auto px-6 py-20 lg:py-32"
        variants={fadeUp}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Section */}
          <div className="space-y-12">
            <Motion.div className="space-y-2" variants={fadeUp}>
              <Motion.h1
                className="min-h-[5.5rem] text-3xl font-light tracking-tight md:min-h-[7rem] md:text-5xl lg:min-h-[8rem] lg:text-7xl"
                variants={fadeUp}
              >
                <span className="inline">
                  {typedText}
                  <span className="ml-1 inline-block h-[0.85em] w-[2px] translate-y-1 bg-gray-400 animate-pulse" />
                </span>
              </Motion.h1>
            </Motion.div>

            <Motion.div className="space-y-8" variants={fadeUp}>
              <p className="text-lg text-gray-300 font-light tracking-wide">
                CONNECT WITH ME
              </p>

              {/* Social Icons */}
              <div className="flex gap-6">
                {socialLinks.map(({ icon: ICON, href, label }) => (
                  <Motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 border border-gray-800 rounded-full hover:border-white transition-colors duration-300"
                    aria-label={label}
                    whileHover={subtleHover}
                    whileTap={subtlePress}
                  >
                    {React.createElement(ICON, {
                      className:
                        "w-5 h-5 group-hover:scale-110 transition-transform duration-300",
                    })}
                  </Motion.a>
                ))}
              </div>
            </Motion.div>

            {/* Copyright */}
            <Motion.div className="pt-16" variants={fadeUp}>
              <p className="text-sm text-gray-500 leading-relaxed">
                © 2026, Shiv Chauhan.
                <br />
                All Rights Reserved
              </p>
            </Motion.div>
          </div>

          {/* Right Section - Contact Form */}
          <Motion.div className="space-y-8" variants={fadeUp}>
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
              <Motion.button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium tracking-wide text-sm uppercase hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={subtleHover}
                whileTap={subtlePress}
              >
                <span>Start a Conversation</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Motion.button>
            </form>
          </Motion.div>
        </div>
      </Motion.div>
    </Motion.section>
  );
};

export default FooterContact;
