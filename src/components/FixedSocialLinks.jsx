import React from "react";
import { Github, Linkedin } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { subtleHover, subtlePress } from "../lib/motion";

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/viiiiiimmv",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/shiv-chauhan-7a8f05",
    label: "LinkedIn",
  },
];

export default function FixedSocialLinks() {
  return (
    <nav
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 md:bottom-8 md:right-8"
      aria-label="Pinned social links"
    >
      {SOCIAL_LINKS.map(({ icon: ICON, href, label }) => (
        <Motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center border border-white/20 bg-black text-white transition-colors hover:border-emerald-300 hover:text-emerald-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 md:h-12 md:w-12"
          whileHover={subtleHover}
          whileTap={subtlePress}
        >
          {React.createElement(ICON, {
            size: 18,
            strokeWidth: 1.8,
          })}
        </Motion.a>
      ))}
    </nav>
  );
}
