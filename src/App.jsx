import { Suspense, lazy, useState } from "react";
import { motion as Motion } from "framer-motion";
import "./App.css";
import Hero from "./components/Hero";
import BackgroundAudio from "./components/BackgroundAudio";
import FixedSocialLinks from "./components/FixedSocialLinks";
import useIsMobile from "./hooks/useIsMobile";
const Projects = lazy(() => import("./components/Projects"));
const FooterContent = lazy(() => import("./components/FooterContent"));
const Stats = lazy(() => import("./components/Stats"));
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const Journey = lazy(() => import("./components/Journey"));
const EngineeringStack = lazy(() => import("./components/EngineeringStack"));
const MobileFooterSection = lazy(() => import("./components/MobileFooterSection"));
const Terminal = lazy(() => import("./assets/Terminal.jsx"));

function App() {
  const volume = 0.5;
  const [isMuted, setIsMuted] = useState(true);
  const isMobile = useIsMobile();
  return (
    <>
      <BackgroundAudio
        src="/assets/betterdays.mp3"
        volume={isMuted ? 0 : volume}
        isMuted={isMuted}
      />
      <FixedSocialLinks />
      <Motion.div
        key="site"
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.35 } }}
      >
        {isMobile ? null : (
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
        )}
        <div className="global-grid-overlay" aria-hidden="true" />
        {isMobile ? null : (
          <div className="global-spotlight-overlay" aria-hidden="true" />
        )}
        <Hero isMuted={isMuted} setIsMuted={setIsMuted} />
        <Suspense fallback={null}>
          <Terminal />
        </Suspense>
        <Suspense fallback={null}>
          <Projects />
        </Suspense>
        <Suspense fallback={null}>
          <Journey />
        </Suspense>
        <Suspense fallback={null}>
          <EngineeringStack />
        </Suspense>
        <Suspense fallback={null}>
          <Stats />
        </Suspense>
        {isMobile ? (
          <Suspense fallback={null}>
            <MobileFooterSection />
          </Suspense>
        ) : (
          <Suspense fallback={null}>
            <FooterContent />
          </Suspense>
        )}
      </Motion.div>
    </>
  );
}

export default App;
