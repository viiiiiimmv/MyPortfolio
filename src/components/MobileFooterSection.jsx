import React, { useState } from "react";
import {
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";

const MobileFooterSection = () => {
  const [activeTab, setActiveTab] = useState("connect");

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/__shiv.chauhan?igsh=NnJ5aWV1aTRnNnhr",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
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
    {
      icon: Twitter,
      href: "https://x.com/iamshivchauhann?t=0s3quq5vbQUwe2U64NhSBw&s=09",
      label: "Twitter",
      color: "hover:text-blue-300",
    },
  ];

  const quickFacts = [
    { icon: MapPin, label: "Based in", value: "Panchkula, India" },
    { icon: Calendar, label: "Available", value: "Open to opportunities" },
    { icon: Mail, label: "Response time", value: "Within 24 hours" },
  ];

  return (
    <section
      id="contact"
      className="bg-black text-white min-h-screen px-4 py-12"
    >
      <div className="max-w-sm mx-auto space-y-8">
        {/* Profile Card */}

        {/* Tab Navigation */}
        <div className="bg-gray-900 rounded-xl p-1">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setActiveTab("connect")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "connect"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Connect
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "info"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Quick Info
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === "connect" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Let's Connect</h2>
                <p className="text-gray-400 text-sm">
                  Choose your preferred way to reach out
                </p>
              </div>

              {/* Email CTA */}
              <div className="bg-transparent rounded-xl p-6 border border-gray-700">
                <div className="text-center space-y-4">
                  <Mail className="w-8 h-8 mx-auto text-gray-300" />
                  <div>
                    <h3 className="font-semibold mb-1">Send me an email</h3>
                    <p className="text-gray-400 text-xs mb-4">
                      Perfect for project discussions and collaborations
                    </p>
                  </div>
                  <a
                    href="mailto:shivchauhan41223@gmail.com"
                    className="inline-block bg-white text-black px-6 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                  >
                    Drop a message
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Or find me on
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 bg-transparent rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 ${color} group`}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "info" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Quick Facts</h2>
                <p className="text-gray-400 text-sm">
                  Everything you need to know at a glance
                </p>
              </div>

              {/* Quick Facts Cards */}
              <div className="space-y-4">
                {quickFacts.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="bg-gray-950 rounded-xl p-4 border border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <Icon className="w-5 h-5 text-gray-300" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          {label}
                        </p>
                        <p className="text-white font-medium">{value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Badge */}
              <div className="bg-green-900 bg-opacity-20 border border-green-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-green-400 font-medium text-sm">
                      Currently Available
                    </p>
                    <p className="text-green-300 text-xs">
                      Ready for new projects and opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-xs">
            © 2026 Shiv Chauhan • Made with ❤️ in India
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default MobileFooterSection;
