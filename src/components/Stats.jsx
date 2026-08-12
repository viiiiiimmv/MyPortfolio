import { ExternalLink, FileDown } from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import images from "../assets/data/imageData";
import useLeetCodeStats from "../hooks/useLeetCodeStats";
import {
  buildLeetCodeProfileUrl,
  extractLeetCodeHandle,
} from "../utils/leetcode";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "../lib/motion";

const LEETCODE_PROFILE_URL = "https://leetcode.com/u/viii-iii-mmv/";
const RESUME_URL =
  "https://drive.google.com/file/d/1gSfBOpRxIg-UdyP-HpX0A7xTKh1t5KPs/view?usp=sharing";
const PHOTOGRAPHY_URL = "https://stealthyshutter-viiiiiimmv.vercel.app/";
const FEATURED_PHOTOS = images.slice(0, 3);

const formatTotal = (value) => {
  if (!Number.isFinite(Number(value))) return "0";
  return Number(value).toLocaleString();
};

const formatStatus = ({ isLoading, isRefreshing, error, source }) => {
  if (isLoading) return "Syncing latest LeetCode stats";
  if (isRefreshing) return "Refreshing stats";
  if (error) return `Using cached stats · ${source}`;
  return `Live stats · ${source}`;
};

const Stats = () => {
  const shouldReduceMotion = useReducedMotion();
  const leetcodeHandle = extractLeetCodeHandle(LEETCODE_PROFILE_URL);
  const leetcodeUrl = buildLeetCodeProfileUrl(leetcodeHandle);
  const {
    stats,
    displayTotalProblems,
    isLoading,
    isRefreshing,
    error,
    source,
  } = useLeetCodeStats(leetcodeHandle);

  const imageTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] };

  return (
    <Motion.section
      id="beyond"
      className="relative overflow-hidden bg-black py-20 text-white md:py-28"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
      aria-labelledby="beyond-code-title"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <Motion.div className="max-w-3xl" variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
            BEYOND THE CODE
          </p>
          <h2
            id="beyond-code-title"
            className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl"
          >
            How I think, what I enjoy, and where to find the full story.
          </h2>
        </Motion.div>

        <Motion.div
          className="mt-12 grid border border-white/14 md:grid-cols-[1.08fr_0.92fr]"
          variants={fadeUp}
        >
          <section className="border-b border-white/14 p-5 md:border-b-0 md:border-r md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
              Problem Solving
            </p>

            <div className="mt-9">
              <p className="text-7xl font-normal leading-none tracking-tight md:text-8xl">
                {formatTotal(displayTotalProblems)}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                Problems Solved
              </p>
            </div>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((entry) => (
                <div key={entry.difficulty} className="border-t border-white/12 pt-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    {entry.difficulty}
                  </dt>
                  <dd className="mt-2 text-3xl font-normal text-neutral-100">
                    {entry.count}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-600">
              {formatStatus({ isLoading, isRefreshing, error, source })}
            </p>

            <Motion.a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:text-emerald-300 focus-visible:text-emerald-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              whileHover={subtleHover}
              whileTap={subtlePress}
            >
              View LeetCode
              <ExternalLink size={14} strokeWidth={1.8} />
            </Motion.a>
          </section>

          <section className="p-5 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
              Photography
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-300">
              When I'm away from the keyboard, I like exploring places and
              capturing them through a lens.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {FEATURED_PHOTOS.map((image, index) => (
                <Motion.div
                  key={image}
                  className={`overflow-hidden border border-white/12 bg-neutral-950 ${
                    index === 0 ? "col-span-2 row-span-2 aspect-[4/5]" : "aspect-square"
                  }`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ ...imageTransition, delay: index * 0.06 }}
                >
                  <img
                    src={image}
                    alt={`Stealthy Shutter photograph ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale transition-[filter,transform] duration-500 hover:scale-[1.03] hover:grayscale-0"
                  />
                </Motion.div>
              ))}
            </div>

            <Motion.a
              href={PHOTOGRAPHY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:text-emerald-300 focus-visible:text-emerald-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              whileHover={subtleHover}
              whileTap={subtlePress}
            >
              Stealthy Shutter
              <ExternalLink size={14} strokeWidth={1.8} />
            </Motion.a>
          </section>
        </Motion.div>

        <Motion.section
          id="resume"
          className="border-x border-b border-white/14 px-5 py-10 text-center md:px-8 md:py-12"
          variants={fadeUp}
          aria-labelledby="resume-cta-title"
        >
          <p
            id="resume-cta-title"
            className="text-3xl font-semibold tracking-tight text-white md:text-5xl"
          >
            Want the full story?
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-white/30" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
            A concise look at my experience, skills, projects, and background.
          </p>
          <Motion.a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 border border-white/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-emerald-300 hover:bg-emerald-300 hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            whileHover={subtleHover}
            whileTap={subtlePress}
          >
            Download Resume
            <FileDown size={15} strokeWidth={1.8} />
          </Motion.a>
        </Motion.section>
      </div>
    </Motion.section>
  );
};

export default Stats;
