import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
    return (
        <motion.div
            className="loader-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onAnimationComplete={onComplete}
        >
            {/* Theme inspired background glows and effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[130px]" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.03, 0.08, 0.03]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute top-1/2 -left-32 w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-[100px]" 
                />
            </div>

            <motion.div
                className="relative z-10 flex flex-col items-center gap-6"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="w-72 h-72 flex items-center justify-center p-4"
                >
                    <img src="/navlogo.png" alt="Sandhya SoftTech" className="w-full h-full object-contain" />
                </motion.div>
                <motion.div
                    className="flex flex-col items-center mt-6"
                    animate={{ opacity: 1 }}
                >
                    <p className="font-display font-bold text-center tracking-[0.2em] leading-tight">
                        <span className="text-orange-500 text-3xl block mb-2">SANDHYA</span>
                        <span className="text-white text-xl">SOFTTECH PVT LTD</span>
                    </p>
                </motion.div>
                <div className="flex gap-2 mt-4">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2.5 h-2.5 rounded-full bg-orange-500"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
