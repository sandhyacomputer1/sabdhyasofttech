import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const LegalModal = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="bg-dark-100 rounded-2xl p-8 max-w-4xl mx-auto my-4 max-h-[90vh] overflow-y-auto border border-orange-500/20 relative"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-display font-bold text-white text-xl mb-4">
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-orange-500 transition-colors p-2"
                            >
                                <HiX className="text-xl" />
                            </button>
                        </div>

                        <div className="text-gray-300 text-sm leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LegalModal;
