import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import "./App.css";
import Hero from "./components/Hero";
import HomeLoader from "./components/HomeLoader";
import BackgroundAudio from "./components/BackgroundAudio";
import useIsMobile from "./hooks/useIsMobile";
const Projects = lazy(() => import("./components/Projects"));
const FooterContent = lazy(() => import("./components/FooterContent"));
const Stats = lazy(() => import("./components/Stats"));
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const ProjectPanel = lazy(() => import("./components/ProjectPanel"));
const MobileOutro = lazy(() => import("./components/MobileOutro"));
const MobileFooterSection = lazy(() => import("./components/MobileFooterSection"));
const Terminal = lazy(() => import("./assets/Terminal.jsx"));

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const volume = 0.5;
  const [isMuted, setIsMuted] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!showLoader && (
        <BackgroundAudio
          src="/assets/betterdays.mp3"
          volume={isMuted ? 0 : volume}
          isMuted={isMuted}
        />
      )}
      <AnimatePresence mode="wait">
        {showLoader ? (
          <Motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
          >
            <HomeLoader />
          </Motion.div>
        ) : (
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
            {isMobile ? (
              <Suspense fallback={null}>
                <ProjectPanel />
              </Suspense>
            ) : (
              <Suspense fallback={null}>
                <Projects />
              </Suspense>
            )}
            {isMobile ? (
              <Suspense fallback={null}>
                <MobileOutro />
              </Suspense>
            ) : (
              <Suspense fallback={null}>
                <Stats />
              </Suspense>
            )}
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
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
