import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionTitle = ({ label, title, subtitle, center = false }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`mb-14 ${center ? 'text-center' : ''}`}
        >
            {label && (
                <span className="text-xs font-semibold tracking-[0.3em] text-orange-500 uppercase mb-3 block">
                    {label}
                </span>
            )}
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className={`text-gray-400 text-lg leading-relaxed ${center ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}>
                    {subtitle}
                </p>
            )}
            <div className={`orange-line mt-5 ${center ? 'mx-auto' : ''}`} />
        </motion.div>
    );
};

export default SectionTitle;
