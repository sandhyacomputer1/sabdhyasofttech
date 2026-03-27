import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import {
    HiCode,
    HiDesktopComputer,
    HiDeviceMobile,
    HiTrendingUp,
} from 'react-icons/hi';

const services = [
    {
        icon: <HiCode className="text-4xl text-orange-500" />,
        title: 'Software Development',
        desc: 'The process of creating, designing, coding, testing, and maintaining software systems that fulfill specific user or business requirements. A cornerstone of modern technology enabling businesses to deliver innovative solutions.',
        features: ['Custom Solutions', 'System Architecture', 'Quality Assurance'],
    },
    {
        icon: <HiDesktopComputer className="text-4xl text-orange-500" />,
        title: 'Web Development',
        desc: 'Creation and maintenance of websites or web applications, combining various technologies to deliver engaging and functional digital experiences. From coding structure to styling design and adding dynamic features.',
        features: ['Responsive Design', 'Interactive Features', 'Performance Optimization'],
    },
    {
        icon: <HiDeviceMobile className="text-4xl text-orange-500" />,
        title: 'Android Development',
        desc: 'Creating software applications for devices running the Android operating system, including smartphones, tablets, smart TVs, wearables, and automotive systems with tailored platform solutions.',
        features: ['Native Apps', 'Cross-Platform', 'Device Optimization'],
    },
    {
        icon: <HiTrendingUp className="text-4xl text-orange-500" />,
        title: 'Digital Marketing',
        desc: 'Leveraging online channels to connect businesses with their target audiences through SEO, SEM, social media marketing, and personalized email campaigns designed to reach specific audiences.',
        features: ['SEO/SEM', 'Social Media Marketing', 'Email Campaigns'],
    },
];

const ServiceCard = ({ service, index }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="glass rounded-2xl p-7 group relative overflow-hidden"
            whileHover={{ 
                y: -12,
                scale: 1.03,
                rotateX: 5,
                rotateY: -5,
                boxShadow: "0 25px 50px rgba(255, 107, 0, 0.25), 0 0 30px rgba(255, 107, 0, 0.1)"
            }}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* AI Neural Network Background */}
            <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-700" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id={`neural-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.1"/>
                    </linearGradient>
                </defs>
                <motion.g
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.3, ease: "easeInOut" }}
                >
                    <path d="M10,20 Q50,10 90,20 T170,20" fill="none" stroke={`url(#neural-${index})`} strokeWidth="0.5"/>
                    <path d="M20,40 Q60,30 100,40 T160,40" fill="none" stroke={`url(#neural-${index})`} strokeWidth="0.5"/>
                    <path d="M15,60 Q55,50 95,60 T165,60" fill="none" stroke={`url(#neural-${index})`} strokeWidth="0.5"/>
                    <circle cx="10" cy="20" r="2" fill="#FF6B00" className="opacity-60"/>
                    <circle cx="90" cy="20" r="2" fill="#FF6B00" className="opacity-60"/>
                    <circle cx="170" cy="20" r="2" fill="#FF6B00" className="opacity-60"/>
                    <circle cx="20" cy="40" r="1.5" fill="#FF8C00" className="opacity-40"/>
                    <circle cx="100" cy="40" r="1.5" fill="#FF8C00" className="opacity-40"/>
                    <circle cx="160" cy="40" r="1.5" fill="#FF8C00" className="opacity-40"/>
                </motion.g>
            </svg>

            {/* Dynamic gradient mesh */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500 rounded-full filter blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-400 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-orange-600 rounded-full filter blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Holographic particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-80"
                    style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 12}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        opacity: [0, 0.8, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Glitch effect overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-orange-400/5 to-transparent animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>

            {/* Icon with AI-enhanced hover */}
            <motion.div
                whileHover={{ 
                    rotate: 720,
                    scale: 1.2,
                    backgroundColor: "rgba(255, 107, 0, 0.25)",
                    boxShadow: "0 0 30px rgba(255, 107, 0, 0.5)"
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 150, 
                    damping: 10,
                    duration: 0.8
                }}
                className="w-16 h-16 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 relative z-10"
            >
                <motion.div
                    animate={{
                        rotate: [0, 3, -3, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {service.icon}
                </motion.div>
                
                {/* AI orbit ring */}
                <motion.div
                    className="absolute inset-0 rounded-xl border border-orange-500/30"
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </motion.div>

            <h3 className="font-display font-bold text-white text-lg mb-3 group-hover:text-orange-300 transition-all duration-300 relative z-10">
                {service.title}
                <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 w-0 group-hover:w-full transition-all duration-700"
                    style={{ boxShadow: "0 0 8px rgba(255, 107, 0, 0.3)" }}
                />
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-5 group-hover:text-gray-200 transition-colors duration-300 relative z-10">{service.desc}</p>

            <ul className="space-y-2 relative z-10">
                {service.features.map((f, i) => (
                    <motion.li 
                        key={f} 
                        className="flex items-center gap-2 text-xs text-gray-300 group-hover:text-gray-100 transition-all duration-300"
                        initial={{ x: -10, opacity: 0 }}
                        animate={inView ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: index * 0.12 + i * 0.05, duration: 0.4 }}
                        whileHover={{ x: 5 }}
                    >
                        <motion.span 
                            className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:bg-orange-300 transition-all duration-300"
                            whileHover={{ 
                                scale: 2,
                                boxShadow: "0 0 10px rgba(255, 107, 0, 0.5)"
                            }}
                        />
                        {f}
                    </motion.li>
                ))}
            </ul>

            {/* Enhanced bottom accent with AI glow */}
            <motion.div 
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 rounded-b-2xl"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: index * 0.12 + 0.3 }}
                style={{
                    boxShadow: "0 0 15px rgba(255, 107, 0, 0.4), 0 0 30px rgba(255, 107, 0, 0.2)"
                }}
            />
            
            {/* AI-powered side glow */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="absolute inset-0 animate-pulse" />
            </div>

            {/* Corner holographic effects */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-orange-500/0 group-hover:border-orange-500/40 transition-all duration-500 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-orange-500/0 group-hover:border-orange-500/40 transition-all duration-500 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-orange-500/0 group-hover:border-orange-500/40 transition-all duration-500 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-orange-500/0 group-hover:border-orange-500/40 transition-all duration-500 rounded-br-lg" />
        </motion.div>
    );
};

const Services = () => (
    <section id="services" className="section-padding bg-[#0A0A0F] relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

        <div className="container-custom">
            <SectionTitle
                label="What We Do"
                title={<>Our Core <span className="text-gradient">Services</span></>}
                subtitle="We deliver end-to-end software solutions tailored to accelerate your business growth and digital transformation."
                center
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                {services.map((s, i) => (
                    <ServiceCard key={s.title} service={s} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default Services;
