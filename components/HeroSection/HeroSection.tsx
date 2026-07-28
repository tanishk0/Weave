"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PillBadge } from "./PillBadge";
import { HeroTitle } from "./HeroTitle";
import GetStarted from "../Navbar/GetStarted";
import { ArrowRight, Check } from "lucide-react";
import { CaptureCard } from "./HeroDecorations/CaptureCard";
import { StickyNoteDec } from "./HeroDecorations/StickyNote";
import PlaybookCard from "./HeroDecorations/PlaybookCard";
import QuoteCard from "./HeroDecorations/QuoteCard";

export default function HeroSection() {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
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
    }, [isHovered]);

    return (
        <div className="relative min-h-screen w-full mt-12">
            {/* Infinite Canvas Base Dotted Background (Always Subtle) */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.03) 1.2px, transparent 1.2px)",
                    backgroundSize: "24px 24px",
                }}
            />

            {/* Mouse Spotlight Layer (Noticeable dot grid highlight on hover) */}
            <div
                className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.30) 1.4px, transparent 1.4px)",
                    backgroundSize: "24px 24px",
                    WebkitMaskImage: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 20%, transparent 100%)`,
                    maskImage: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 20%, transparent 100%)`,
                }}
            />

            {/* Viewport Edge Fade / Horizon Vignette */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: "radial-gradient(circle at 50% 45%, transparent 55%, rgba(255, 255, 255, 0.85) 100%)",
                }}
            />

            {/* Radiant Ambient Glow Layer Following Cursor on Hover */}
            <div
                className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.10), rgba(99, 102, 241, 0.04) 40%, transparent 75%)`,
                }}
            />

            <div className="relative z-10 flex justify-center items-center">
                <PillBadge />
            </div>
            <div className="relative z-10 mt-10 flex justify-center items-center">
                <HeroTitle />
            </div>
            <div className="relative z-10 flex justify-center items-center mt-8">
                <p className="text-center w-95 text-zinc-500">Weave turns your notes, ideas, images and voice in structured playbooks you can actually use.</p>
            </div>
            <div className="relative z-10 flex justify-center items-center mt-8">
                <GetStarted text="Get started for free" showArrow={true} />
            </div>
            <div className="relative z-10 flex justify-center items-center mt-4">
                <Check className="h-4 w-4 text-zinc-400 mr-2" /><p className="text-zinc-500 text-xs">No credit card required</p>
            </div>
            <section className="relative">
                {/* Wavy 3-Curve Left Dotted Connecting Line */}
                <svg
                    className="absolute left-14 -top-104 w-80 h-[420px] pointer-events-none z-0 overflow-visible"
                    viewBox="0 0 320 440"
                    fill="none"
                >
                    <motion.path
                        d="M 80 195 C 170 210, 240 240, 180 260 C 120 280, 110 320, 170 340 C 230 360, 250 375, 208 384"
                        stroke="#d4d4d8"
                        strokeWidth="1.5"
                        strokeDasharray="6 6"
                        strokeLinecap="round"
                        animate={{
                            strokeDashoffset: [0, -24],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </svg>

                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [-6, -4, -6],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0,
                    }}
                    className="absolute left-14 -top-104 z-10"
                >
                    <CaptureCard />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [-2, 0, -2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2,
                    }}
                    className="absolute left-18 -top-32 z-10"
                >
                    <StickyNoteDec />
                </motion.div>

                {/* Wavy 3-Curve Right Dotted Connecting Line */}
                <svg
                    className="absolute right-14 -top-96 w-80 h-[380px] pointer-events-none z-0 overflow-visible"
                    viewBox="0 0 320 380"
                    fill="none"
                >
                    <motion.path
                        d="M 224 110 C 270 140, 275 190, 230 215 C 180 240, 130 250, 160 285 C 180 305, 155 310, 140 320"
                        stroke="#d4d4d8"
                        strokeWidth="1.5"
                        strokeDasharray="6 6"
                        strokeLinecap="round"
                        animate={{
                            strokeDashoffset: [0, -24],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </svg>

                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [3, 5, 3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2.5,
                    }}
                    className="absolute right-14 -top-96 z-10"
                >
                    <PlaybookCard />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [7, 9, 7],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3.8,
                    }}
                    className="absolute right-18 -top-16 z-10"
                >
                    <QuoteCard />
                </motion.div>
            </section>
        </div>
    );
}