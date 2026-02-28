import { useEffect, useRef, useState } from "react";
import "../assets/css/CustomCursor.css";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const coreRef = useRef(null);
  const animationFrame = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    document.body.classList.add("custom-cursor-active");

    const setSpotlight = (x, y, opacity = 1) => {
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
      root.style.setProperty("--spotlight-opacity", String(opacity));
    };

    const checkInteractiveTarget = (target) => {
      if (!(target instanceof Element)) {
        setIsInteractive(false);
        return;
      }

      const interactiveSelector =
        "a, button, [role='button'], input, textarea, select, label, summary";
      setIsInteractive(Boolean(target.closest(interactiveSelector)));
    };

    const handleMouseMove = (event) => {
      const { clientX: x, clientY: y } = event;
      const isInProjectsSection =
        event.target instanceof Element &&
        Boolean(event.target.closest("#projects"));

      pointer.current = { x, y };
      if (!visibleRef.current) {
        ring.current = { x, y };
      }

      visibleRef.current = true;
      setIsVisible(true);
      setSpotlight(x, y, isInProjectsSection ? 0 : 1);
      checkInteractiveTarget(event.target);
    };

    const handleMouseLeaveWindow = (event) => {
      if (event.relatedTarget) return;
      visibleRef.current = false;
      setIsVisible(false);
      setIsInteractive(false);
      setIsPressed(false);
      root.style.setProperty("--spotlight-opacity", "0");
    };

    const handleBlur = () => {
      visibleRef.current = false;
      setIsVisible(false);
      setIsInteractive(false);
      setIsPressed(false);
      root.style.setProperty("--spotlight-opacity", "0");
    };

    const animateCursor = () => {
      const target = pointer.current;
      ring.current.x += (target.x - ring.current.x) * 0.16;
      ring.current.y += (target.y - ring.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }

      animationFrame.current = window.requestAnimationFrame(animateCursor);
    };

    animationFrame.current = window.requestAnimationFrame(animateCursor);

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleMouseLeaveWindow);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.cancelAnimationFrame(animationFrame.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeaveWindow);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      root.style.setProperty("--spotlight-opacity", "0");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor-wrapper ${isVisible ? "is-visible" : ""} ${isInteractive ? "is-interactive" : ""} ${isPressed ? "is-pressed" : ""}`}
      aria-hidden="true"
    >
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-axis cursor-axis-h" />
        <span className="cursor-axis cursor-axis-v" />
      </div>
      <div ref={coreRef} className="cursor-dot" />
    </div>
  );
};

export default CustomCursor;
