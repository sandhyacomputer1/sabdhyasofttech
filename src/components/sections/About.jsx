import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import { HiLightningBolt, HiCode, HiChip, HiSparkles, HiShieldCheck, HiGlobe } from 'react-icons/hi';
import CountUp from 'react-countup';

const timelineItems = [
    {
        month: 'Oct 2024',
        title: 'Founded with a Vision',
        desc: 'Sandhya SoftTech was born in Ambajogai, Maharashtra — driven by one ambition: to make world-class software accessible to every business.',
        icon: HiLightningBolt,
    },
    {
        month: 'Nov 2024',
        title: 'First Client. First Win.',
        desc: 'Just one month in, we delivered our first production product — on time, on budget, and beyond expectations.',
        icon: HiCode,
    },
    {
        month: 'Jan 2025',
        title: 'Team & Tools Expanding',
        desc: 'Onboarded expert engineers and adopted a full-stack AI-assisted development pipeline to accelerate delivery.',
        icon: HiChip,
    },
    {
        month: 'Mar 2025',
        title: '30+ Projects. 100% Satisfaction.',
        desc: 'In under 6 months, we have shipped 30+ digital products across industries — and every single client came back happy.',
        icon: HiSparkles,
    },
];

const TimelineItem = ({ item, i }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="relative pl-14 pb-8 last:pb-0 group"
        >
            {/* Icon node */}
            <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 300 }}
                className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#0A0A0F] border-2 border-orange-500/40 group-hover:border-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.2)] transition-all duration-300"
            >
                <item.icon className="text-orange-400 text-base" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <span className="text-xs text-orange-500 font-bold tracking-widest">{item.month}</span>
                <h4 className="font-display font-bold text-white text-base mt-1 mb-1 group-hover:text-orange-100 transition-colors">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
        </motion.div>
    );
};

const About = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [lastRef, lastInView] = useInView({ triggerOnce: true, threshold: 0.5 });

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } }),
    };

    return (
        <section id="about" className="section-padding bg-dark-100 relative overflow-hidden">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full bg-orange-500/3 blur-3xl pointer-events-none" />

            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left */}
                    <div>
                        <SectionTitle
                            label="About Us"
                            title={<>Building Tomorrow's<br /><span className="text-gradient">Digital World</span></>}
                        />
                        <motion.p
                            ref={ref}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="text-gray-400 mb-6 leading-relaxed"
                        >
                            Sandhya SoftTech Pvt. Ltd. is a technology-first company headquartered in Ambajogai, Maharashtra.
                            We specialize in crafting premium software solutions that drive business growth, streamline operations,
                            and unlock new possibilities through intelligent technology.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="text-gray-400 mb-8 leading-relaxed"
                        >
                            With a team of expert engineers and creative designers, we deliver end-to-end digital solutions
                            from concept to deployment, ensuring every product is scalable, secure, and user-centric.
                        </motion.p>

                        {/* Mission & Vision */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {[
                                {
                                    icon: HiShieldCheck,
                                    title: 'Our Mission',
                                    text: 'To build software that works as hard as you do — delivering real results, faster timelines, and technology you can trust. Every project we take on, we treat as our own.',
                                },
                                {
                                    icon: HiGlobe,
                                    title: 'Our Vision',
                                    text: 'To become the go-to software partner for growth-focused businesses — known for quality, reliability, and a team that genuinely cares about your success.',
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate={inView ? 'show' : 'hidden'}
                                    className="glass rounded-xl p-5 card-hover border border-white/5 flex flex-col gap-2"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <item.icon className="text-orange-500 text-lg" />
                                        <h4 className="font-display font-bold text-orange-500 text-sm tracking-wide">{item.title}</h4>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-3"
                        >
                            {[
                                { end: 30, suffix: '+', label: 'Projects' },
                                { end: 20, suffix: '+', label: 'Clients' },
                                { end: 100, suffix: '%', label: 'Satisfaction' },
                                { prefix: '< ', end: 6, suffix: 'mo', label: 'Operating' },
                            ].map((s) => (
                                <div key={s.label} className="glass px-4 py-2.5 rounded-xl border border-white/5 text-center min-w-[100px]">
                                    <p className="font-display font-bold text-lg text-gradient">
                                        {inView ? (
                                            <CountUp start={0} end={s.end} duration={2} suffix={s.suffix} prefix={s.prefix} />
                                        ) : (s.prefix || '') + '0' + s.suffix}
                                    </p>
                                    <p className="text-gray-500 text-xs">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right - Timeline */}
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="font-display font-bold text-white text-xl mb-8 flex items-center gap-2"
                        >
                            Our Journey
                            <span className="text-xs font-normal text-orange-500/70 border border-orange-500/20 bg-orange-500/5 px-2 py-0.5 rounded-full tracking-widest">
                                EST. OCT 2024
                            </span>
                        </motion.h3>

                        <div className="relative">
                            {/* Animated vertical line */}
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={inView ? { scaleY: 1 } : {}}
                                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                                style={{ originY: 0 }}
                                className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-orange-500/30 to-transparent"
                            />

                            {timelineItems.map((item, i) => (
                                <TimelineItem key={item.month} item={item} i={i} />
                            ))}

                            {/* NOW badge */}
                            <motion.div
                                ref={lastRef}
                                initial={{ opacity: 0, x: 30 }}
                                animate={lastInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative pl-14 mt-2"
                            >
                                <motion.div
                                    animate={{ boxShadow: ['0 0 15px rgba(255,107,0,0.3)', '0 0 35px rgba(255,107,0,0.6)', '0 0 15px rgba(255,107,0,0.3)'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute left-0 top-0 w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center"
                                >
                                    <span className="text-orange-400 text-base font-bold">→</span>
                                </motion.div>
                                <span className="text-xs text-orange-400 font-bold tracking-widest">NOW</span>
                                <p className="text-gray-300 text-sm mt-1 font-medium">Scaling fast. The best is yet to come.</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
