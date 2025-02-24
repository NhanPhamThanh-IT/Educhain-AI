// Importing necessary libraries and tools
import React, { useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Array of blue shades in RGB format
const blueColors = ["173,216,230", "135,206,235", "70,130,180", "0,191,255"];

/**
 * Generates a random blue color with varying opacity levels.
 * @param {number} opacity - The opacity level for the color.
 * @returns {object} An object containing the main, mid, and transparent variations of the color.
 */
const getRandomBlue = (opacity) => {
    const color = blueColors[Math.floor(Math.random() * blueColors.length)];
    return {
        main: `rgba(${color}, ${opacity})`,
        mid: `rgba(${color}, ${opacity * 0.7})`,
        transparent: `rgba(${color}, 0)`,
    };
};

/**
 * Motion variants for bubble animation.
 */
const bubbleVariants = {
    animate: (custom) => ({
        x: [custom.startX, custom.endX, custom.startX],
        y: [custom.startY, custom.endY, custom.startY],
        opacity: [0, custom.opacity, 0],
        scale: [1, custom.scaleFactor, 1],
        rotate: [0, 360],
        transition: {
            delay: custom.delay,
            duration: custom.duration,
            ease: [0.42, 0, 0.58, 1], // Bezier curve for smooth motion
            repeat: Infinity,
            repeatType: "loop",
        },
    }),
};

/**
 * Bubble component representing an animated floating bubble.
 * @param {object} props - Component props.
 * @param {object} props.custom - Custom properties defining the bubble's behavior and appearance.
 */
const Bubble = ({ custom }) => (
    <motion.div
        custom={custom}
        variants={bubbleVariants}
        initial={{
            x: custom.startX,
            y: custom.startY,
            opacity: 0,
            scale: 1,
            rotate: 0,
        }}
        animate="animate"
        style={{
            position: "absolute",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${custom.color.main} 0%, ${custom.color.mid} 40%, ${custom.color.transparent} 80%)`,
            width: custom.size,
            height: custom.size,
            filter: `blur(${custom.blur}px)`,
            boxShadow: `0 0 8px ${custom.color.main}`,
            mixBlendMode: "soft-light",
            willChange: "transform, opacity", // Helps GPU optimize rendering
        }}
    />
);

/**
 * Background component that generates and animates floating bubbles.
 */
const BubbleBackgroundBlue = () => {
    // Stores the window size to ensure responsive behavior
    const windowSize = useRef({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Updates window size on resize event
    useEffect(() => {
        const handleResize = () => {
            windowSize.current = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /**
     * Generates an array of bubbles with randomized properties.
     */
    const bubbles = useMemo(
        () =>
            Array.from({ length: 70 }, () => {
                // Reduce bubble count for optimization
                const size = Math.random() * 25 + 15;
                const startX = Math.random() * windowSize.current.width;
                const startY = Math.random() * windowSize.current.height;
                const endX = startX + (Math.random() * 300 - 150);
                const endY = startY + (Math.random() * 300 - 150);
                const duration = Math.random() * 6 + 4;
                const delay = Math.random() * 3;
                const opacity = Math.random() * 0.6 + 0.3;
                const blur = Math.random() * 4 + 2;
                const scaleFactor = Math.random() * 0.5 + 1.2;
                const color = getRandomBlue(opacity);
                return {
                    startX,
                    startY,
                    endX,
                    endY,
                    size,
                    duration,
                    delay,
                    opacity,
                    blur,
                    scaleFactor,
                    color,
                };
            }),
        []
    );

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                overflow: "hidden",
            }}
        >
            {bubbles.map((bubble, index) => (
                <Bubble key={index} custom={bubble} />
            ))}
        </div>
    );
};

export default BubbleBackgroundBlue;
