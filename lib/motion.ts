import { Variants, TargetAndTransition } from "framer-motion";

export const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const viewportConfig = {
  once: true,
  amount: 0.2,
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: MOTION_EASE,
      when: "beforeChildren",
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

export const staggerChildren: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: MOTION_EASE,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: MOTION_EASE,
    },
  },
};

export const subtleHover: TargetAndTransition = {
  y: -2,
  transition: {
    duration: 0.22,
    ease: MOTION_EASE,
  },
};

export const noHover : TargetAndTransition = {
  y:0,
  transition:{
    duration:0.22,
    ease:MOTION_EASE
  },
};

export const subtlePress: TargetAndTransition = {
  scale: 0.985,
};
