import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TypeWriterEffect = ({ text, className }) => {
    const [displayed, setDisplayed] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayed((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 35);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    useEffect(() => {
        setDisplayed("");
        setIndex(0);
    }, [text]);

    return (
        <motion.h1 className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {displayed}
            {index < text.length && <span className="animate-pulse">|</span>}
        </motion.h1>
    );
};
