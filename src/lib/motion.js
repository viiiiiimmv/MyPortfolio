export const MOTION_EASE = [0.22, 1, 0.36, 1];

export const viewportConfig = {
  once: true,
  amount: 0.25,
};

export const sectionReveal = {
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

export const staggerChildren = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const fadeUp = {
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

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: MOTION_EASE,
    },
  },
};

export const subtleHover = {
  y: -2,
  transition: {
    duration: 0.22,
    ease: MOTION_EASE,
  },
};

export const subtlePress = {
  scale: 0.985,
};
