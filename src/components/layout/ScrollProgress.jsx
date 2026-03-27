import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

    return (
        <motion.div
            style={{ scaleX, transformOrigin: '0%' }}
            className="fixed top-0 left-0 right-0 h-[3px] z-[9998] bg-gradient-to-r from-orange-600 to-orange-400"
        />
    );
};

export default ScrollProgress;
