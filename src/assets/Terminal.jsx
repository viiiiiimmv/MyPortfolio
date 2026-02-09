import { useEffect, useState } from 'react';

const PANELS = [
  {
    label: 'Build',
    headline: 'I build products that stay clean as they scale.',
    body:
      'From first commit to long-term maintenance, I optimize for clarity, reliability, and momentum.',
    chips: ['Architecture', 'Performance', 'Maintainability'],
    stat: 'Delivery Signal',
    value: 91,
  },
  {
    label: 'Design',
    headline: 'I design interfaces with calm motion and strong intent.',
    body:
      'The goal is simple: make interaction feel natural, readable, and responsive without visual noise.',
    chips: ['Interaction', 'Hierarchy', 'Craft'],
    stat: 'Experience Signal',
    value: 87,
  },
  {
    label: 'Grow',
    headline: 'I learn in loops and convert feedback into better systems.',
    body:
      'Each project sharpens decisions. I keep what works, remove friction, and raise quality every iteration.',
    chips: ['Feedback', 'Iteration', 'Consistency'],
    stat: 'Learning Signal',
    value: 89,
  },
];

export default function Terminal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activePanel = PANELS[activeIndex];

  const setIndexSafe = (next) => {
    setActiveIndex((next + PANELS.length) % PANELS.length);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        setIndexSafe(activeIndex + 1);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        setIndexSafe(activeIndex - 1);
      }

      if (event.key >= '1' && event.key <= String(PANELS.length)) {
        setActiveIndex(Number(event.key) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PANELS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
    >
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-20 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
          About / Minimal Interactive
        </p>

        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
          Simple interaction, clear intent.
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
          Pick a facet. The message updates instantly. It also auto-rotates when idle.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {PANELS.map((panel, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={panel.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                  isActive
                    ? 'border-white bg-white text-black'
                    : 'border-neutral-700 bg-black/30 text-neutral-300 hover:border-neutral-400'
                }`}
              >
                {panel.label}
              </button>
            );
          })}
        </div>

        <div
          className="mt-8 rounded-3xl border border-neutral-800 bg-neutral-950/70 p-6 backdrop-blur-sm md:p-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
            <span>{`0${activeIndex + 1} / 0${PANELS.length}`}</span>
            <span>{activePanel.stat}</span>
          </div>

          <div className="mt-3 h-px w-full bg-neutral-800">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${((activeIndex + 1) / PANELS.length) * 100}%` }}
            />
          </div>

          <div key={activePanel.label} className="panel-enter mt-8">
            <h3 className="max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">
              {activePanel.headline}
            </h3>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
              {activePanel.body}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {activePanel.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-neutral-700 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-neutral-300"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-neutral-800 bg-black/40 p-4">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                <span>{activePanel.stat}</span>
                <span className="text-white">{activePanel.value}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${activePanel.value}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-neutral-600">
          Tip: use arrow keys or 1-3.
        </p>
      </div>

      <style>{`
        .panel-enter {
          animation: panelEnter 280ms ease-out;
        }

        @keyframes panelEnter {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
