import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import confetti from "canvas-confetti";

import k1 from "../../assets/k1.png";
import k2 from "../../assets/k2.png";
import HeartComponent from "../components/HeartComponent";
import { useNavigate } from "react-router";

export const Wish = () => {
    const [leftLocked, setLeftLocked] = useState(false);
    const [rightLocked, setRightLocked] = useState(false);
    const [celebrated, setCelebrated] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const navigate = useNavigate();

    const leftX = useMotionValue(0);
    const rightX = useMotionValue(0);

    const [vw, setVw] = useState(window.innerWidth);

    useEffect(() => {
        const onResize = () => setVw(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const bothTouched = leftLocked && rightLocked;

    const leftSnapX = Math.max(0, vw / 2 - 190);
    const rightSnapX = -Math.max(0, vw / 2 - 190);
    const threshold = 80;

    const snapLeft = () => {
        animate(leftX, leftSnapX, { type: "spring", stiffness: 220, damping: 18 });
        setLeftLocked(true);
    };

    const snapRight = () => {
        animate(rightX, rightSnapX, { type: "spring", stiffness: 220, damping: 18 });
        setRightLocked(true);
    };

    // Confetti once per round
    useEffect(() => {
        if (!bothTouched || celebrated) return;

        const heart1 = confetti.shapeFromText({ text: "💖", scalar: 2.2 });
        const heart2 = confetti.shapeFromText({ text: "💘", scalar: 2.0 });
        const heart3 = confetti.shapeFromText({ text: "💕", scalar: 2.0 });

        confetti({
            particleCount: 90,
            spread: 80,
            startVelocity: 35,
            origin: { y: 0.65 },
            shapes: [heart1, heart2, heart3],
            scalar: 1,
        });

        setTimeout(() => {
            confetti({
                particleCount: 70,
                spread: 120,
                startVelocity: 28,
                origin: { y: 0.6 },
                shapes: [heart1, heart2, heart3],
                scalar: 1,
            });
        }, 350);

        setCelebrated(true);
    }, [bothTouched, celebrated]);

    const handleReset = () => {
        setLeftLocked(false);
        setRightLocked(false);
        setCelebrated(false);

        leftX.stop();
        rightX.stop();
        leftX.set(0);
        rightX.set(0);

        setResetKey((k) => k + 1);
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-b from-pink-200 via-rose-300 to-pink-400 flex flex-col">
            <div className="pt-12 px-6">
                {bothTouched ? (
                    <div className="flex justify-center">
                        <p
                            className="px-6 py-3 text-center text-5xl md:text-6xl font-bold tracking-widest text-purple-900 drop-shadow-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Happy Valentine’s Day
                        </p>
                    </div>
                ) : (
                    <p
                        className="text-center text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        <span className="text-violet-800">I know you want to </span>
                        <span className="text-rose-600">Kiss</span>
                        <span className="text-violet-800"> Me 💋</span>
                    </p>
                )}
            </div>

            <div className="flex-1 flex items-center justify-center px-4">
                <div key={resetKey} className="relative w-full max-w-[360px] h-[360px]">
                    {/* Heart animation BEHIND images (only when together) */}
                    {bothTouched && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 z-0"
                        >
                            <HeartComponent className="!top-0" />
                        </motion.div>
                    )}

                    {!bothTouched && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none z-[1]">
                            <div className="w-28 h-28 rounded-full bg-white/20 blur-xl" />
                            <p className="text-white/90 text-sm font-medium">
                                Bring them together 💞
                            </p>
                        </div>
                    )}

                    <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[170px] h-[240px] z-10"
                        style={{ x: leftX }}
                    >
                        <motion.img
                            src={k2}
                            alt="left"
                            drag={!leftLocked}
                            dragElastic={0.15}
                            dragMomentum={false}
                            dragConstraints={{ left: -10, right: vw - 190 }}
                            onDragEnd={() => {
                                if (leftX.get() > leftSnapX - threshold) snapLeft();
                            }}
                            className="w-full h-full object-contain select-none cursor-grab active:cursor-grabbing"
                            draggable={false}
                            onPointerDown={(e) => e.currentTarget.setPointerCapture?.(e.pointerId)}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-[170px] h-[240px] z-10"
                        style={{ x: rightX }}
                    >
                        <motion.img
                            src={k1}
                            alt="right"
                            drag={!rightLocked}
                            dragElastic={0.15}
                            dragMomentum={false}
                            dragConstraints={{ left: -vw + 190, right: 10 }}
                            onDragEnd={() => {
                                if (rightX.get() < rightSnapX + threshold) snapRight();
                            }}
                            className="w-full h-full object-contain select-none cursor-grab active:cursor-grabbing"
                            draggable={false}
                            onPointerDown={(e) => e.currentTarget.setPointerCapture?.(e.pointerId)}
                        />
                    </motion.div>

                    {bothTouched && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-2 w-full text-center text-white font-semibold z-10"
                        >
                            My Puppy kutty
                        </motion.p>
                    )}
                </div>
            </div>

            {bothTouched && (
                <div className="pb-10 px-6 flex flex-row justify-center gap-4">
                    <button
                        onClick={handleReset}
                        className="bg-white/25 text-white border border-white/30 px-6 py-2 rounded-full font-semibold backdrop-blur active:scale-95 transition shadow-[6px_6px_0_0_#3a3f47]"
                    >
                        Reset
                    </button>

                    <button
                        onClick={() => navigate("/intro")}
                        className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold  active:scale-95 transition shadow-[6px_6px_0_0_#3a3f47]"
                    >
                        Back to Home
                    </button>
                </div>
            )}
        </div>
    );
};
