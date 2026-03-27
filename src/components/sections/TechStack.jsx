import { motion } from 'framer-motion';
import { SiReact, SiNodedotjs, SiFirebase, SiTailwindcss, SiFramer, SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiDocker, SiAmazonwebservices, SiFlutter } from 'react-icons/si';

const technologies = [
    { icon: <SiReact />, name: 'React', color: '#61DAFB' },
    { icon: <SiNodedotjs />, name: 'Node.js', color: '#339933' },
    { icon: <SiFirebase />, name: 'Firebase', color: '#FFCA28' },
    { icon: <SiTailwindcss />, name: 'Tailwind', color: '#06B6D4' },
    { icon: <SiFramer />, name: 'Framer', color: '#0055FF' },
    { icon: <SiJavascript />, name: 'JavaScript', color: '#F7DF1E' },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
    { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#4169E1' },
    { icon: <SiDocker />, name: 'Docker', color: '#2496ED' },
    { icon: <SiAmazonwebservices />, name: 'AWS', color: '#FF9900' },
    { icon: <SiFlutter />, name: 'Flutter', color: '#02569B' }
];

const TechStack = () => {
    return (
        <section className="py-24 bg-dark-100 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs font-semibold tracking-[0.3em] text-orange-500 uppercase mb-4 block"
                    >
                        Our Arsenal
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-display font-bold text-4xl md:text-5xl text-white mb-6"
                    >
                        Technologies We <span className="text-gradient">Master</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        We use the most advanced and reliable technologies to build scalable, 
                        high-performance solutions for our clients.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {technologies.map((tech, idx) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 group hover:bg-white/[0.05] hover:border-orange-500/30 transition-all cursor-default"
                        >
                            <div 
                                className="text-4xl transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]"
                                style={{ color: tech.color }}
                            >
                                {tech.icon}
                            </div>
                            <span className="text-gray-400 text-xs font-medium tracking-wide group-hover:text-white transition-colors">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
                
                {/* Bottom line */}
                <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent mt-20"
                />
            </div>
        </section>
    );
};

export default TechStack;
