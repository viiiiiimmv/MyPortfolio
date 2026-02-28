import React from "react";
import { motion as Motion } from "framer-motion";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "../lib/motion";

const MobileOutro = () => {
  return (
    <Motion.section
      className="bg-neutral-950 px-6 py-20 text-neutral-200"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      {/* Wrapper */}
      <div className="max-w-sm mx-auto text-center space-y-12">
        {/* Statement */}
        <Motion.div className="space-y-4" variants={fadeUp}>
          <h1 className="text-2xl font-semibold tracking-tight">
            Designing with intention
          </h1>
          <p className="text-base text-neutral-400 leading-relaxed">
            Minimal, timeless, and meaningful—crafted one step at a time.
          </p>
        </Motion.div>

        {/* Divider */}
        <Motion.div className="flex justify-center" variants={fadeUp}>
          <div className="w-20 h-px bg-neutral-700"></div>
        </Motion.div>

        {/* Philosophy */}
        <Motion.p className="text-neutral-400 text-sm leading-relaxed" variants={fadeUp}>
          Every detail matters. Thoughtful design and clean code bring clarity
          and connection.
        </Motion.p>

        {/* Resume Button */}
        <Motion.div className="pt-8" variants={fadeUp}>
          <Motion.a
            href="https://drive.google.com/file/d/180o5z1N69kH0GgS4QMjojMA9mm4Hrv5i/view?usp=share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-neutral-700 text-neutral-200 px-6 py-3 rounded-lg text-sm tracking-wide transition-colors duration-300 hover:bg-neutral-800 hover:text-white focus:ring-1 focus:ring-neutral-600"
            whileHover={subtleHover}
            whileTap={subtlePress}
          >
            View Resume
          </Motion.a>
        </Motion.div>

        {/* Closing */}
        <Motion.div className="pt-12 space-y-6" variants={fadeUp}>
          <div className="space-y-1">
            <p className="text-neutral-400 text-sm">Ready to collaborate?</p>
            <Motion.a
              href="#contact"
              className="text-neutral-200 underline underline-offset-4 hover:text-neutral-400 transition-colors text-sm"
              whileHover={subtleHover}
              whileTap={subtlePress}
            >
              Let’s connect
            </Motion.a>
          </div>

          {/* Footer */}
          <div className="pt-6">
            <p className="text-neutral-500 text-xs">Thanks for visiting ✦</p>
          </div>
        </Motion.div>
      </div>
    </Motion.section>
  );
};

export default MobileOutro;
