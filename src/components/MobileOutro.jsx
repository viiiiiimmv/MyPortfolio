import React from "react";

const MobileOutro = () => {
  return (
    <section className="bg-neutral-950 text-neutral-200 px-6 py-20">
      {/* Wrapper */}
      <div className="max-w-sm mx-auto text-center space-y-12">
        {/* Statement */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Designing with intention
          </h1>
          <p className="text-base text-neutral-400 leading-relaxed">
            Minimal, timeless, and meaningful—crafted one step at a time.
          </p>
        </div>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-20 h-px bg-neutral-700"></div>
        </div>

        {/* Philosophy */}
        <p className="text-neutral-400 text-sm leading-relaxed">
          Every detail matters. Thoughtful design and clean code bring clarity
          and connection.
        </p>

        {/* Resume Button */}
        <div className="pt-8">
          <a
            href="https://drive.google.com/file/d/180o5z1N69kH0GgS4QMjojMA9mm4Hrv5i/view?usp=share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-neutral-700 text-neutral-200 px-6 py-3 rounded-lg text-sm tracking-wide transition-colors duration-300 hover:bg-neutral-800 hover:text-white focus:ring-1 focus:ring-neutral-600"
          >
            View Resume
          </a>
        </div>

        {/* Closing */}
        <div className="pt-12 space-y-6">
          <div className="space-y-1">
            <p className="text-neutral-400 text-sm">Ready to collaborate?</p>
            <a
              href="#contact"
              className="text-neutral-200 underline underline-offset-4 hover:text-neutral-400 transition-colors text-sm"
            >
              Let’s connect
            </a>
          </div>

          {/* Footer */}
          <div className="pt-6">
            <p className="text-neutral-500 text-xs">Thanks for visiting ✦</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileOutro;
