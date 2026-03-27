import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { HiRocketLaunch, HiUsers, HiClock, HiCube } from 'react-icons/hi2';

// Standalone counter component - hooks called at top level
const CounterCard = ({ stat, index }) => {
    const countRef = useRef(null);
    const started = useRef(false);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

    useEffect(() => {
        if (!inView || started.current) return;
        started.current = true;
        const end = stat.value;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.floor(eased * end);
            if (countRef.current) {
                countRef.current.textContent = current + stat.suffix;
            }
            if (progress < 1) requestAnimationFrame(animate);
            else if (countRef.current) countRef.current.textContent = end + stat.suffix;
        };

        requestAnimationFrame(animate);
    }, [inView, stat.value, stat.suffix]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="glass rounded-2xl p-6 text-center border border-orange-500/10 hover:border-orange-500/30 transition-all card-hover group"
        >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                {stat.icon}
            </div>
            <p className="font-display font-bold text-3xl sm:text-4xl text-gradient mb-2">
                <span ref={countRef}>0{stat.suffix}</span>
            </p>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{stat.label}</p>
        </motion.div>
    );
};

const stats = [
    { label: 'Projects Completed', value: 30, suffix: '+', icon: <HiRocketLaunch className="text-2xl" /> },
    { label: 'Happy Clients', value: 80, suffix: '+', icon: <HiUsers className="text-2xl" /> },
    { label: 'Years of Experience', value: 3, suffix: '+', icon: <HiClock className="text-2xl" /> },
    { label: 'Technologies Used', value: 25, suffix: '+', icon: <HiCube className="text-2xl" /> },
];

const Stats = () => (
    <section className="py-20 relative overflow-hidden bg-[#0D0D15]">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none" />
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage:
                    'linear-gradient(rgba(255,107,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            }}
        />
        <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <CounterCard key={stat.label} stat={stat} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default Stats;
