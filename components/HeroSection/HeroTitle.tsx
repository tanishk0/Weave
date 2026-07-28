"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Organise everything.",
  "Find instantly.",
  "Build playbooks.",
  "Never lose ideas.",
];

export const HeroTitle = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col px-10 items-center select-none">
      <h2 className="text-8xl font-['Helvetica',sans-serif] tracking-tight font-normal">
        Capture{" "}
        <span className="relative inline-block">
          anything.
          <svg
            className="absolute -bottom-3 left-0 w-[105%] h-6 overflow-visible pointer-events-none"
            viewBox="0 0 280 24"
            fill="none"
          >
            <motion.path
              d="M 4 15 C 60 7, 140 19, 220 10 C 245 7, 268 12, 275 14 C 265 17, 240 18, 225 18"
              stroke="#a855f7"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={400}
              animate={{
                strokeDashoffset: [400, 0, 0, 400],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.75, 1],
              }}
            />
          </svg>
        </span>
      </h2>
      <div className="relative h-24 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h3
            key={words[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-8xl font-['Helvetica',sans-serif] tracking-tight font-normal bg-gradient-to-r from-[#71717a] via-[#b8b8be] to-[#71717a] bg-clip-text text-transparent animate-slow-gradient"
          >
            {words[index]}
          </motion.h3>
        </AnimatePresence>
      </div>
    </div>
  );
};