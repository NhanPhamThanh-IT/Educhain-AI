import React from 'react';
import { motion } from 'framer-motion';

const bubbleVariants = {
    animate: (custom) => ({
        x: [custom.startX, custom.endX],
        y: [custom.startY, custom.endY],
        transition: {
            duration: custom.duration,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
        }
    })
};

const Bubble = ({ custom }) => (
    <motion.div
        custom={custom}
        variants={bubbleVariants}
        initial={{ x: custom.startX, y: custom.startY }}
        animate="animate"
        style={{
            position: 'absolute',
            borderRadius: '50%',
            background: `rgba(250, 204, 21, ${custom.opacity})`,
            width: custom.size,
            height: custom.size
        }}
    />
);

// Component hiệu ứng bong bóng nền
const BubbleBackground = () => {
    // Tạo mảng các bong bóng với các thuộc tính ngẫu nhiên
    const bubbles = Array.from({ length: 20 }, () => {
        const size = Math.random() * 20 + 10; // kích thước từ 10 đến 30px
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        // Tạo chuyển động theo hướng ngẫu nhiên
        const endX = startX + (Math.random() * 200 - 100);
        const endY = startY + (Math.random() * 200 - 100);
        const duration = Math.random() * 5 + 5; // thời gian từ 5 đến 10 giây
        const opacity = Math.random() * 0.5 + 0.2;
        return { startX, startY, endX, endY, size, duration, opacity };
    });

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, // Để hiệu ứng nền nằm sau các nội dung khác
                overflow: 'hidden'
            }}
        >
            {bubbles.map((bubble, index) => (
                <Bubble key={index} custom={bubble} />
            ))}
        </div>
    );
};

export default BubbleBackground;
