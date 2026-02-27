import React from "react";
import styled from "styled-components";

const HomeLoader = () => {
  return (
    <StyledWrapper>
      <div className="loader-shell" role="status" aria-live="polite">
        <div className="loader-visual" aria-hidden="true">
          <span className="shape square large" />
          <span className="shape square medium" />
          <span className="shape diamond" />
          <span className="shape dot dot-1" />
          <span className="shape dot dot-2" />
          <span className="shape dot dot-3" />
          <span className="shape dot dot-4" />
        </div>

        <div className="loader-copy">
          <p className="loader-title">LOADING</p>
          <div className="loader-track" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: #000;
  color: #f5f5f5;

  .loader-shell {
    width: min(86vw, 270px);
    padding: 1.75rem 1.25rem 1.5rem;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(6px);
    display: grid;
    justify-items: center;
    gap: 1.1rem;
    box-shadow:
      0 24px 70px rgba(0, 0, 0, 0.52),
      inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  }

  .loader-visual {
    width: clamp(88px, 18vw, 118px);
    aspect-ratio: 1;
    position: relative;
    display: grid;
    place-items: center;
    isolation: isolate;
  }

  .shape {
    position: absolute;
  }

  .square {
    border: 1px solid rgba(255, 255, 255, 0.52);
  }

  .large {
    inset: 4%;
    border-radius: 2px;
    animation: rotate-cw 3.1s linear infinite;
  }

  .medium {
    inset: 22%;
    border: 1px solid rgba(255, 255, 255, 0.86);
    animation: rotate-ccw 2.2s linear infinite;
  }

  .diamond {
    width: 24%;
    aspect-ratio: 1;
    border: 1px solid #fff;
    background: #000;
    transform: rotate(45deg);
    animation: pulse-diamond 1.45s ease-in-out infinite;
  }

  .dot {
    width: 5px;
    aspect-ratio: 1;
    border-radius: 999px;
    background: #fff;
    animation: dot-pulse 1.3s ease-in-out infinite;
  }

  .dot-1 {
    top: 8%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .dot-2 {
    top: 50%;
    right: 8%;
    transform: translate(50%, -50%);
    animation-delay: 0.2s;
  }

  .dot-3 {
    bottom: 8%;
    left: 50%;
    transform: translate(-50%, 50%);
    animation-delay: 0.4s;
  }

  .dot-4 {
    top: 50%;
    left: 8%;
    transform: translate(-50%, -50%);
    animation-delay: 0.6s;
  }

  .loader-copy {
    width: 100%;
    display: grid;
    justify-items: center;
    gap: 0.55rem;
  }

  .loader-title {
    margin: 0;
    letter-spacing: 0.36em;
    font-size: 0.64rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.86);
    text-indent: 0.36em;
  }

  .loader-track {
    width: min(100%, 130px);
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    overflow: hidden;
    position: relative;
  }

  .loader-track span {
    position: absolute;
    inset: 0 auto 0 0;
    width: 42%;
    border-radius: inherit;
    background: #fff;
    opacity: 0.96;
    animation: glide 1.35s ease-in-out infinite;
  }

  @keyframes rotate-cw {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes rotate-ccw {
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes pulse-diamond {
    0%,
    100% {
      transform: rotate(45deg) scale(0.84);
      opacity: 0.65;
    }
    50% {
      transform: rotate(45deg) scale(1.02);
      opacity: 1;
    }
  }

  @keyframes dot-pulse {
    0%,
    100% {
      opacity: 0.24;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes glide {
    0% {
      transform: translateX(-115%);
    }
    100% {
      transform: translateX(250%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .large,
    .medium,
    .diamond,
    .dot,
    .loader-track span {
      animation: none;
    }
  }
`;

export default HomeLoader;
