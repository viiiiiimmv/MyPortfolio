import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Linkedin,
  Github,
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
  const form = useRef(null);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setToast({
      message: "",
      type: "",
    });

    try {
      await emailjs.sendForm(
        "service_portfolio835",
        "template_5nfkixy",
        form.current,
        "3Og7VoKZ9lJgv9k8h"
      );

      setToast({
        message: "Message sent successfully!",
        type: "success",
      });

      form.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);

      setToast({
        message: "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);

      setTimeout(() => {
        setToast({
          message: "",
          type: "",
        });
      }, 3000);
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/shiv-chauhan-7a8f05",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/viiiiiimmv",
      label: "GitHub",
    },
  ];

  useEffect(() => {
    const currentPhrase = CTA_PHRASES[phraseIndex];

    const typingSpeed = isDeleting ? 45 : 85;
    const holdDelay = 1300;
    const resetDelay = 260;

    let timeout;

    if (!isDeleting && typedText === currentPhrase) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, holdDelay);
    } else if (isDeleting && typedText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex(
          (prev) => (prev + 1) % CTA_PHRASES.length
        );
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

              <p className="text-sm text-gray-300">
                Sending message...
              </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.message && (
          <Motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
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
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Section */}
          <div className="space-y-12">
            <Motion.div
              className="space-y-2"
              variants={fadeUp}
            >
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

            <Motion.div
              className="space-y-8"
              variants={fadeUp}
            >
              <p className="text-lg font-light tracking-wide text-gray-300">
                CONNECT WITH ME
              </p>

              {/* Social Icons */}
              <div className="flex gap-6">
                {socialLinks.map(
                  ({ icon: ICON, href, label }) => (
                    <Motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-full border border-gray-800 p-3 transition-colors duration-300 hover:border-white"
                      aria-label={label}
                      whileHover={subtleHover}
                      whileTap={subtlePress}
                    >
                      {React.createElement(ICON, {
                        className:
                          "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                      })}
                    </Motion.a>
                  )
                )}
              </div>
            </Motion.div>

            {/* Copyright */}
            <Motion.div
              className="pt-16"
              variants={fadeUp}
            >
              <p className="text-sm leading-relaxed text-gray-500">
                © 2026, Shiv Chauhan.
                <br />
                All Rights Reserved
              </p>
            </Motion.div>
          </div>

          {/* Right Section - Contact Form */}
          <Motion.div
            className="space-y-8"
            variants={fadeUp}
          >
            <div>
              <h2 className="mb-2 text-2xl font-light tracking-wide md:text-3xl">
                DROP ME A MESSAGE!
              </h2>

              <div className="h-px w-16 bg-white" />
            </div>

            <form
              ref={form}
              onSubmit={sendEmail}
              className="space-y-8"
            >
              {/* Name Field */}
              <div className="group space-y-2">
                <label className="block text-xs uppercase tracking-widest text-gray-400">
                  Name
                </label>

                <input
                  type="text"
                  name="username"
                  placeholder="Your Name"
                  required
                  className="w-full border-b border-gray-700 bg-transparent py-3 text-lg placeholder-gray-600 transition-colors duration-300 focus:border-white focus:outline-none"
                />
              </div>

              {/* Email Field */}
              <div className="group space-y-2">
                <label className="block text-xs uppercase tracking-widest text-gray-400">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full border-b border-gray-700 bg-transparent py-3 text-lg placeholder-gray-600 transition-colors duration-300 focus:border-white focus:outline-none"
                />
              </div>

              {/* Message Field */}
              <div className="group space-y-2">
                <label className="block text-xs uppercase tracking-widest text-gray-400">
                  Message
                </label>

                <textarea
                  name="description"
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full resize-none border-b border-gray-700 bg-transparent py-3 text-lg placeholder-gray-600 transition-colors duration-300 focus:border-white focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <Motion.button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-medium uppercase tracking-wide text-black transition-colors duration-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={subtleHover}
                whileTap={subtlePress}
              >
                <span>
                  {loading
                    ? "Sending..."
                    : "Start a Conversation"}
                </span>

                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </Motion.button>
            </form>
          </Motion.div>
        </div>
      </Motion.div>
    </Motion.section>
  );
};

export default FooterContact;
