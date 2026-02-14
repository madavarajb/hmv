import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@radix-ui/themes";
import confetti from "canvas-confetti";

import intro from "../../assets/intro.png";
import intro2 from "../../assets/propose.png";
import threat from "../../assets/threat.png";
import explain from "../../assets/explain.png";
import happyjump from "../../assets/happyJump.png";
import Books from "../../assets/stakebook.png";
import bestchapter from "../../assets/bestchapter.png";
import konjal from "../../assets/chek.png";
import life from "../../assets/enter.png";
import { useNavigate } from "react-router";

export const Intro = () => {
    const threatMessage = "Think before choosing… you are always mine di paithiyakari 😈, Go back";
    const navigate = useNavigate();

    const steps = useMemo(
        () => [
            { text: "Hello my Princess, my Queen and My kutty Puppy", img: intro },
            { text: "I hope you're doing well, my love", img: intro },
            { text: "There’s something important I want to tell you", img: explain },
            { text: "There are many chapters in my life", img: Books },
            { text: "But you are the most beautiful chapter of them all", img: bestchapter },
            { text: "From the very day you walked into my life", img: life },
            { text: "You changed everything in the most magical way", img: konjal },
            { text: "Did you know something about penguins?", img: explain },
            { text: "When a penguin finds its partner, they stay together forever", img: intro },
            { text: "And when the time comes, they leave this world together too", img: explain },
            { text: "So… will you be my penguin forever?", img: intro2, isProposal: true },
        ],
        [],
    );

    const [step, setStep] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [mode, setMode] = useState("normal"); // normal | yes | no

    const isProposalStep = steps[step]?.isProposal === true;

    const currentMessage =
        mode === "no"
            ? threatMessage
            : mode === "yes"
              ? "Hurryyyyyyy I love youuu 💜🐧"
              : steps[step].text;

    const currentImage = mode === "no" ? threat : mode === "yes" ? happyjump : steps[step].img;

    // Typewriter
    useEffect(() => {
        if (charIndex < currentMessage.length) {
            const t = setTimeout(() => {
                setDisplayedText((p) => p + currentMessage[charIndex]);
                setCharIndex((p) => p + 1);
            }, 45);
            return () => clearTimeout(t);
        }
    }, [charIndex, currentMessage]);

    // Reset typing on step/mode change
    useEffect(() => {
        setDisplayedText("");
        setCharIndex(0);
    }, [step, mode]);

    const handleNext = () => {
        if (mode !== "normal") return;
        if (step < steps.length - 1) setStep((s) => s + 1);
    };

    const handleBack = () => {
        if (mode === "no" || mode === "yes") {
            setMode("normal");
            return;
        }
        if (step > 0) setStep((s) => s - 1);
    };

    const showChoices = isProposalStep && mode === "normal" && charIndex === currentMessage.length;

    const showBack = step > 0 || mode !== "normal";

    useEffect(() => {
        if (mode === "yes" && charIndex === currentMessage.length) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
            });

            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 160,
                    origin: { y: 0.7 },
                });
            }, 400);
        }
    }, [mode, charIndex, currentMessage.length]);

    return (
        <div className="bg-gradient-to-b from-pink-200 via-rose-300 to-pink-400 min-h-[100dvh] flex flex-col">
            <div className="flex-1 flex justify-center items-center px-4">
                <div className="flex flex-col items-center gap-4 w-full max-w-[320px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`box-${step}-${mode}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className=" bg-white px-6 py-4 rounded-2xl  text-center shadow-[6px_6px_0_0_#3a3f47]"
                        >
                            <p className="text-gray-800 font-medium">
                                {displayedText}
                                {charIndex < currentMessage.length && (
                                    <span className="animate-pulse">|</span>
                                )}
                            </p>

                            {/* Yes/No only on proposal step */}
                            {showChoices && (
                                <div className="flex justify-center gap-4 mt-4">
                                    <button
                                        onClick={() => setMode("yes")}
                                        className="bg-green-500 text-white px-4 py-1 rounded-full text-sm active:scale-95 transition"
                                    >
                                        Yes
                                    </button>

                                    <button
                                        onClick={() => setMode("no")}
                                        className="bg-red-400 text-white px-4 py-1 rounded-full text-sm active:scale-95 transition"
                                    >
                                        No
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Image */}
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={`img-${step}-${mode}`}
                            src={currentImage}
                            alt="intro"
                            className="w-[200px] h-[280px] object-contain select-none cursor-pointer"
                            draggable={false}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            onClick={handleNext}
                        />
                    </AnimatePresence>
                    {mode === "yes" && charIndex === currentMessage.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full flex justify-end"
                        >
                            <button
                                onClick={() => navigate("/home")}
                                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-md active:scale-95 transition"
                            >
                                Continue
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="h-14 flex items-center px-4">
                {showBack && (
                    <motion.div whileTap={{ scale: 0.9 }}>
                        <Button
                            size="2"
                            onClick={handleBack}
                            className="bg-rose-500 hover:bg-rose-600 text-white rounded-full"
                        >
                            ← Back
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
