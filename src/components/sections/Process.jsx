import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineSearch, HiOutlinePencilAlt, HiOutlineCode, HiOutlineBeaker, HiOutlineCloudUpload } from 'react-icons/hi';
import SectionTitle from '../ui/SectionTitle';

const steps = [
    {
        id: '01',
        title: 'Requirement Analysis',
        desc: 'Understanding client needs and business goals',
        icon: <HiOutlineSearch className="w-6 h-6" />,
    },
    {
        id: '02',
        title: 'Design & Planning',
        desc: 'Creating UI/UX and system architecture',
        icon: <HiOutlinePencilAlt className="w-6 h-6" />,
    },
    {
        id: '03',
        title: 'Development',
        desc: 'Building scalable and high-performance applications',
        icon: <HiOutlineCode className="w-6 h-6" />,
    },
    {
        id: '04',
        title: 'Testing',
        desc: 'Ensuring quality, performance, and security',
        icon: <HiOutlineBeaker className="w-6 h-6" />,
    },
    {
        id: '05',
        title: 'Deployment',
        desc: 'Launching and maintaining the final product',
        icon: <HiOutlineCloudUpload className="w-6 h-6" />,
    },
];

const Process = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="process" className="section-padding bg-dark-200 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-20">
                    <SectionTitle
                        label="Work Flow"
                        title={<>Our Development <span className="text-gradient">Process</span></>}
                        center={true}
                    />
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                        We follow a structured, agile approach to ensure every project is delivered with 
                        precision, scalability, and technical excellence.
                    </p>
                </div>

                <div ref={ref} className="relative">
                    {/* Progress Line (Desktop) */}
                    <div className="absolute top-[45px] left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent hidden lg:block" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: idx * 0.15 }}
                                className="relative group text-center lg:text-left"
                            >
                                {/* Step Number & Icon */}
                                <div className="flex flex-col items-center lg:items-start mb-6">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-orange-500 group-hover:border-orange-500/40 group-hover:bg-orange-500/5 transition-all duration-500 shadow-xl relative z-10">
                                            {step.icon}
                                        </div>
                                        {/* Step Number Badge */}
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-dark-300 border border-white/10 flex items-center justify-center text-[10px] font-black text-orange-500 font-display z-20 shadow-lg">
                                            {step.id}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-4 lg:px-0">
                                    <h3 className="text-white font-display font-bold text-xl mb-3 group-hover:text-orange-500 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0 group-hover:text-gray-400 transition-colors">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Link Indicator (Mobile) */}
                                {idx < steps.length - 1 && (
                                    <div className="w-px h-12 bg-gradient-to-b from-orange-500/20 to-transparent mx-auto mt-8 lg:hidden" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
