"use client";

import { useState, useEffect } from "react";

type DottedBackgroundProps = {
  enableSpotlight?: boolean;
};

export function DottedBackground({ enableSpotlight = true }: DottedBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!enableSpotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered, enableSpotlight]);

  return (
    <>
      {/* Infinite Canvas Base Dotted Background (Always Subtle) */}
      <div
        className="fixed inset-0 pointer-events-none -z-1"
        style={{
          backgroundImage: "radial-gradient(rgba(44, 44, 44, 0.2) 1.3px, transparent 1.3px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Mouse Spotlight Layer */}
      {enableSpotlight && (
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.28) 1.4px, transparent 1.4px)",
            backgroundSize: "24px 24px",
            WebkitMaskImage: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 20%, transparent 100%)`,
            maskImage: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 20%, transparent 100%)`,
          }}
        />
      )}

      {/* Viewport Edge Fade / Horizon Vignette */}
      <div
        className="fixed inset-0 pointer-events-none -z-1"
        style={{
          background: "radial-gradient(circle at 50% 45%, transparent 55%, rgba(255, 255, 255, 0.85) 100%)",
        }}
      />
    </>
  );
}
