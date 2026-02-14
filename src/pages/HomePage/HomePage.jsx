import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import girl1 from "../../assets/h1.png";
import boy1 from "../../assets/M1.png";
import girl2 from "../../assets/h2.png";
import boy2 from "../../assets/m2.png";
import { useNavigate } from "react-router";
import { TypeWriterEffect } from "../components/TypeWriteEffect";

export const HomePage = () => {
    const [girlMatched, setGirlMatched] = useState(false);
    const [boyMatched, setBoyMatched] = useState(false);
    const navigate = useNavigate();

    const bothMatched = girlMatched && boyMatched;

    const girlRef = useRef(null);
    const boyRef = useRef(null);

    const girlHeartAnchorRef = useRef(null);
    const boyHeartAnchorRef = useRef(null);

    const redHeartRef = useRef(null);
    const blueHeartRef = useRef(null);

    const [redPos, setRedPos] = useState({ x: 0, y: -55 });
    const [bluePos, setBluePos] = useState({ x: -57, y: -55 });

    const redStartRef = useRef({ x: 0, y: -55 });
    const blueStartRef = useRef({ x: -57, y: -55 });

    const redDragRef = useRef({ dragging: false, pointerId: null, offsetX: 0, offsetY: 0 });
    const blueDragRef = useRef({ dragging: false, pointerId: null, offsetX: 0, offsetY: 0 });

    const girlSrc = useMemo(() => (girlMatched ? girl2 : girl1), [girlMatched]);
    const boySrc = useMemo(() => (boyMatched ? boy2 : boy1), [boyMatched]);

    useEffect(() => {
        const init = { x: -57, y: -55 };
        blueStartRef.current = init;
        setBluePos(init);
    }, []);

    useEffect(() => {
        const init = { x: 0, y: -55 };
        redStartRef.current = init;
        setRedPos(init);
    }, []);

    const isHeartCenterInside = (heartEl, targetEl) => {
        if (!heartEl || !targetEl) return false;
        const t = targetEl.getBoundingClientRect();
        const h = heartEl.getBoundingClientRect();
        const cx = h.left + h.width / 2;
        const cy = h.top + h.height / 2;
        return cx >= t.left && cx <= t.right && cy >= t.top && cy <= t.bottom;
    };

    // BOY HEART (drop on girl => girl2)
    const onRedPointerDown = (e) => {
        if (girlMatched) return;
        const anchor = boyHeartAnchorRef.current;
        if (!anchor) return;

        const a = anchor.getBoundingClientRect();
        redDragRef.current.dragging = true;
        redDragRef.current.pointerId = e.pointerId;

        redDragRef.current.offsetX = e.clientX - (a.left + redPos.x);
        redDragRef.current.offsetY = e.clientY - (a.top + redPos.y);

        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onRedPointerMove = (e) => {
        if (!redDragRef.current.dragging) return;
        const anchor = boyHeartAnchorRef.current;
        if (!anchor) return;

        const a = anchor.getBoundingClientRect();
        const x = e.clientX - a.left - redDragRef.current.offsetX;
        const y = e.clientY - a.top - redDragRef.current.offsetY;

        setRedPos({ x, y });
    };

    const onRedPointerUp = () => {
        if (!redDragRef.current.dragging) return;

        redDragRef.current.dragging = false;
        redDragRef.current.pointerId = null;

        if (isHeartCenterInside(redHeartRef.current, girlRef.current)) {
            setGirlMatched(true);
            return;
        }
        setRedPos(redStartRef.current);
    };

    // GIRL HEART (drop on boy => boy2)
    const onBluePointerDown = (e) => {
        if (boyMatched) return;
        const anchor = girlHeartAnchorRef.current;
        if (!anchor) return;

        const a = anchor.getBoundingClientRect();
        blueDragRef.current.dragging = true;
        blueDragRef.current.pointerId = e.pointerId;

        blueDragRef.current.offsetX = e.clientX - (a.left + bluePos.x);
        blueDragRef.current.offsetY = e.clientY - (a.top + bluePos.y);

        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onBluePointerMove = (e) => {
        if (!blueDragRef.current.dragging) return;
        const anchor = girlHeartAnchorRef.current;
        if (!anchor) return;

        const a = anchor.getBoundingClientRect();
        const x = e.clientX - a.left - blueDragRef.current.offsetX;
        const y = e.clientY - a.top - blueDragRef.current.offsetY;

        setBluePos({ x, y });
    };

    const onBluePointerUp = () => {
        if (!blueDragRef.current.dragging) return;

        blueDragRef.current.dragging = false;
        blueDragRef.current.pointerId = null;

        if (isHeartCenterInside(blueHeartRef.current, boyRef.current)) {
            setBoyMatched(true);
            return;
        }
        setBluePos(blueStartRef.current);
    };

    const handleReset = () => {
        setGirlMatched(false);
        setBoyMatched(false);
        setRedPos(redStartRef.current);
        setBluePos(blueStartRef.current);
    };

    return (
        <div className="bg-violet-400 min-h-[100dvh] flex flex-col">
            <div className="pt-10 px-4 flex flex-col items-center text-center">
                {!bothMatched ? (
                    <>
                        <h1 className="text-5xl font-extrabold leading-none text-white drop-shadow">
                            OH NO PUPPY!
                        </h1>
                        <p className="text-xl mt-2 text-white/90">Why are we Sad ?? </p>
                    </>
                ) : (
                    <div className="flex flex-col gap-4">
                        <TypeWriterEffect
                            text="Now that we’ve found each other… hold my heart gently and never let it go. I promise to hold yours just as tightly. Let’s prove we are truly meant for each other. 💞"
                            className="text-xl font-extrabold text-white drop-shadow text-center leading-relaxed"
                        />
                        <div className="flex gap-5 justify-center">
                            <button
                                onClick={handleReset}
                                className="bg-white/25 text-white border border-white/30 px-6 py-2 rounded-full font-semibold backdrop-blur active:scale-95 transition shadow-[6px_6px_0_0_#3a3f47]"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => navigate("/wish")}
                                className="bg-pink-600 text-white px-6 py-2 rounded-full font-semibold  active:scale-95 transition shadow-[6px_6px_0_0_#3a3f47]"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 2) CENTER IMAGES DIV */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-[420px] h-[520px] flex justify-between items-center">
                    {/* GIRL */}
                    <motion.div
                        ref={girlRef}
                        className="flex flex-col items-center pt-24"
                        animate={{ x: bothMatched ? 55 : 0, scale: bothMatched ? 1.03 : 1 }}
                        transition={{ type: "spring", stiffness: 140, damping: 16 }}
                    >
                        <div ref={girlHeartAnchorRef} className="w-0 h-0 overflow-visible">
                            {!boyMatched && (
                                <div
                                    ref={blueHeartRef}
                                    onPointerDown={onBluePointerDown}
                                    onPointerMove={onBluePointerMove}
                                    onPointerUp={onBluePointerUp}
                                    className="text-[44px] select-none touch-none cursor-grab active:cursor-grabbing"
                                    style={{
                                        transform: `translate(${bluePos.x}px, ${bluePos.y}px)`,
                                    }}
                                >
                                    ❤️
                                </div>
                            )}
                        </div>

                        <img
                            src={girlSrc}
                            alt="girl"
                            className="w-[240px] h-[320px] object-contain select-none"
                            draggable={false}
                        />
                    </motion.div>

                    {/* BOY */}
                    <motion.div
                        ref={boyRef}
                        className="flex flex-col items-center pt-24"
                        animate={{ x: bothMatched ? -55 : 0, scale: bothMatched ? 1.03 : 1 }}
                        transition={{ type: "spring", stiffness: 140, damping: 16 }}
                    >
                        <div ref={boyHeartAnchorRef} className="w-0 h-0 overflow-visible">
                            {!girlMatched && (
                                <div
                                    ref={redHeartRef}
                                    onPointerDown={onRedPointerDown}
                                    onPointerMove={onRedPointerMove}
                                    onPointerUp={onRedPointerUp}
                                    className="text-[44px] select-none touch-none cursor-grab active:cursor-grabbing"
                                    style={{ transform: `translate(${redPos.x}px, ${redPos.y}px)` }}
                                >
                                    💙
                                </div>
                            )}
                        </div>

                        <img
                            src={boySrc}
                            alt="boy"
                            className="w-[240px] h-[320px] object-contain select-none"
                            draggable={false}
                        />
                    </motion.div>
                </div>
            </div>

            {/* 3) CTA + HELPER TEXT DIV */}
            <div className="pb-10 px-4 flex flex-col items-center gap-4">
                {!bothMatched ? (
                    <>
                        <p className="text-white/90 font-medium text-center">
                            Drag my heart to you and your heart to me
                        </p>
                    </>
                ) : (
                    <></>
                    // <div className="flex gap-5 justify-center">
                    //     <button
                    //         onClick={handleReset}
                    //         className="bg-white/25 text-white border border-white/30 px-6 py-2 rounded-full font-semibold backdrop-blur active:scale-95 transition shadow-[6px_6px_0_0_#3a3f47]"
                    //     >
                    //         Reset
                    //     </button>
                    //     <button
                    //         onClick={() => navigate("/wish")}
                    //         className="bg-pink-600 text-white px-6 py-2 rounded-full font-semibold  active:scale-95 transition shadow-[6px_6px_0_0_#3a3f47]"
                    //     >
                    //         Continue
                    //     </button>
                    // </div>
                )}
            </div>
        </div>
    );
};
