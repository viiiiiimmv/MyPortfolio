"use client";

import React from "react";
import { motion } from "framer-motion";
import { SocialLinksDTO } from "@/types/portfolio";
import { subtleHover, subtlePress } from "@/lib/motion";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/common/Icons";

interface FixedSocialLinksProps {
  socialLinks?: SocialLinksDTO;
}

export default function FixedSocialLinks({ socialLinks }: FixedSocialLinksProps) {
  if (!socialLinks) return null;

  const links: {
    icon: React.ComponentType<{ className?: string; size?: number }>;
    href: string;
    label: string;
  }[] = [];

  if (socialLinks.github) {
    links.push({ icon: GithubIcon, href: socialLinks.github, label: "GitHub" });
  }
  if (socialLinks.linkedin) {
    links.push({ icon: LinkedinIcon, href: socialLinks.linkedin, label: "LinkedIn" });
  }
  if (socialLinks.leetcode) {
    links.push({ icon: LeetCodeIcon, href: socialLinks.leetcode, label: "LeetCode" });
  }

  if (links.length === 0) return null;

  return (
    <nav
      className="fixed bottom-5 left-5 z-50 flex flex-col gap-3 md:bottom-8 md:left-8"
      aria-label="Pinned social links"
    >
      {links.map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative flex h-11 w-11 items-center justify-center border border-white/20 bg-black text-white transition-colors hover:border-white hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white md:h-12 md:w-12"
          whileHover={subtleHover}
          whileTap={subtlePress}
        >
          <Icon className="h-4.5 w-4.5" size={18} />
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap border border-white/20 bg-black px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-neutral-300 opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        </motion.a>
      ))}
    </nav>
  );
}
