import React, { useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "../lib/motion";

const MobileFooterSection = () => {
  const [activeTab, setActiveTab] = useState("connect");

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/shiv-chauhan-7a8f05",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: Github,
      href: "https://github.com/viiiiiimmv",
      label: "GitHub",
      color: "hover:text-gray-300",
    },
  ];

  const quickFacts = [
    { icon: MapPin, label: "Based in", value: "Panchkula, India" },
    { icon: Calendar, label: "Available", value: "Open to opportunities" },
    { icon: Mail, label: "Response time", value: "Within 24 hours" },
  ];

  return (
    <Motion.section
      id="contact"
      className="bg-black text-white min-h-screen px-4 py-12"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      <Motion.div className="mx-auto max-w-sm space-y-8" variants={fadeUp}>
        {/* Profile Card */}

        {/* Tab Navigation */}
        <Motion.div className="rounded-xl bg-gray-900 p-1" variants={fadeUp}>
          <div className="grid grid-cols-2 gap-1">
            <Motion.button
              onClick={() => setActiveTab("connect")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "connect"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
              whileTap={subtlePress}
            >
              Connect
            </Motion.button>
            <Motion.button
              onClick={() => setActiveTab("info")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "info"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
              whileTap={subtlePress}
            >
              Quick Info
            </Motion.button>
          </div>
        </Motion.div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "connect" ? (
              <Motion.div
                key="connect-tab"
                className="space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-center">
                  <h2 className="mb-2 text-2xl font-bold">Let's Connect</h2>
                  <p className="text-sm text-gray-400">
                    Choose your preferred way to reach out
                  </p>
                </div>

                {/* Email CTA */}
                <Motion.div
                  className="rounded-xl border border-gray-700 bg-transparent p-6"
                  whileHover={subtleHover}
                >
                  <div className="space-y-4 text-center">
                    <Mail className="mx-auto h-8 w-8 text-gray-300" />
                    <div>
                      <h3 className="mb-1 font-semibold">Send me an email</h3>
                      <p className="mb-4 text-xs text-gray-400">
                        Perfect for project discussions and collaborations
                      </p>
                    </div>
                    <Motion.a
                      href="mailto:shivchauhan41223@gmail.com"
                      className="inline-block rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
                      whileTap={subtlePress}
                    >
                      Drop a message
                    </Motion.a>
                  </div>
                </Motion.div>

                {/* Social Links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                    Or find me on
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map(({ icon: ICON, href, label, color }) => (
                      <Motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-3 rounded-lg border border-gray-700 bg-transparent p-4 transition-all duration-200 hover:border-gray-600 ${color}`}
                        whileHover={subtleHover}
                        whileTap={subtlePress}
                      >
                        {React.createElement(ICON, {
                          className:
                            "h-5 w-5 transition-transform group-hover:scale-110",
                        })}
                        <span className="text-sm font-medium">{label}</span>
                      </Motion.a>
                    ))}
                  </div>
                </div>
              </Motion.div>
            ) : (
              <Motion.div
                key="info-tab"
                className="space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-center">
                  <h2 className="mb-2 text-2xl font-bold">Quick Facts</h2>
                  <p className="text-sm text-gray-400">
                    Everything you need to know at a glance
                  </p>
                </div>

                {/* Quick Facts Cards */}
                <div className="space-y-4">
                  {quickFacts.map(({ icon: ICON, label, value }) => (
                    <Motion.div
                      key={label}
                      className="rounded-xl border border-gray-700 bg-gray-950 p-4"
                      whileHover={subtleHover}
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-gray-700 p-3">
                          {React.createElement(ICON, {
                            className: "h-5 w-5 text-gray-300",
                          })}
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400">
                            {label}
                          </p>
                          <p className="font-medium text-white">{value}</p>
                        </div>
                      </div>
                    </Motion.div>
                  ))}
                </div>

                {/* Status Badge */}
                <Motion.div
                  className="rounded-xl border border-green-800 bg-green-900 bg-opacity-20 p-4"
                  whileHover={subtleHover}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                    <div>
                      <p className="text-sm font-medium text-green-400">
                        Currently Available
                      </p>
                      <p className="text-xs text-green-300">
                        Ready for new projects and opportunities
                      </p>
                    </div>
                  </div>
                </Motion.div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <Motion.div className="border-t border-gray-800 pt-8 text-center" variants={fadeUp}>
          <p className="text-gray-500 text-xs">
            © 2026 Shiv Chauhan • Made with ❤️ in India
          </p>
        </Motion.div>
      </Motion.div>
    </Motion.section>
  );
};

export default MobileFooterSection;
