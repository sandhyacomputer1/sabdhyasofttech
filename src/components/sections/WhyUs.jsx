import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import { HiLightningBolt, HiShieldCheck, HiPuzzle, HiSupport } from 'react-icons/hi';

const features = [
    {
        icon: <HiLightningBolt className="text-3xl text-orange-500" />,
        title: 'Rapid Delivery',
        desc: 'We follow agile methodologies to ship high-quality products fast, reducing time-to-market without compromising quality.',
    },
    {
        icon: <HiShieldCheck className="text-3xl text-orange-500" />,
        title: 'Enterprise Security',
        desc: 'Every solution is built with security-first principles — end-to-end encryption, secure APIs, and GDPR compliance baked in.',
    },
    {
        icon: <HiPuzzle className="text-3xl text-orange-500" />,
        title: 'Scalable Architecture',
        desc: 'We design systems to grow with your business — cloud-native, microservices, and auto-scaling from day one.',
    },
    {
        icon: <HiSupport className="text-3xl text-orange-500" />,
        title: 'Dedicated Support',
        desc: '24/7 post-launch support and maintenance with transparent communication and SLA-backed response times.',
    },
];

// Each card is its own component so hooks can be called at the top level
const FeatureCard = ({ feature, index }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="relative group"
        >
            {/* Unique card design with layered effects */}
            <div className="relative glass rounded-2xl p-7 overflow-hidden border border-orange-500/10 hover:border-orange-500/30 transition-all duration-500">
                
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-500/0 to-orange-500/5 group-hover:from-orange-500/3 group-hover:via-orange-500/5 group-hover:to-orange-500/8 transition-all duration-700 rounded-2xl" />
                
                {/* Geometric pattern overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="url(#gradient-${index})" strokeWidth="0.5"/>
                        </pattern>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.1"/>
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                </svg>

                {/* Floating particles */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-60"
                        style={{
                            top: `${15 + i * 20}%`,
                            left: `${10 + i * 15}%`,
                        }}
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    />
                ))}

                {/* Icon container with enhanced hover */}
                <div className="relative z-10 flex justify-center mb-6">
                    <motion.div
                        whileHover={{ 
                            scale: 1.15,
                            rotate: [0, -5, 5, 0],
                            backgroundColor: "rgba(255, 107, 0, 0.2)",
                            boxShadow: "0 0 25px rgba(255, 107, 0, 0.4)"
                        }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 15,
                            duration: 0.6
                        }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 flex items-center justify-center relative overflow-hidden"
                    >
                        {/* Animated ring around icon */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl border border-orange-500/30"
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        {feature.icon}
                    </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                    <h3 className="font-display font-bold text-white text-base mb-3 group-hover:text-orange-300 transition-all duration-300 relative">
                        {feature.title}
                        <motion.div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent w-0 group-hover:w-full transition-all duration-500"
                        />
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {feature.desc}
                    </p>
                </div>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-orange-500/0 group-hover:border-orange-500/40 transition-all duration-500 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-orange-500/0 group-hover:border-orange-500/40 transition-all duration-500 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-orange-500/0 group-hover:border-orange-500/40 transition-all duration-500 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-orange-500/0 group-hover:border-orange-500/40 transition-all duration-500 rounded-br-lg" />
            </div>

            {/* Card lift effect */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                whileHover={{ y: -4 }}
            />
        </motion.div>
    );
};

const WhyUs = () => (
    <section id="why-us" className="section-padding bg-dark-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/3 via-transparent to-transparent pointer-events-none" />
        <div className="container-custom">
            <SectionTitle
                label="Why Choose Us"
                title={<>Why Businesses Trust<br /><span className="text-gradient">Sandhya SoftTech</span></>}
                subtitle="We combine technical excellence with deep business understanding to deliver software that truly matters."
                center
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, i) => (
                    <FeatureCard key={f.title} feature={f} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default WhyUs;
