import { motion } from 'framer-motion';
import { HiOutlineBanknotes, HiOutlineUserPlus, HiOutlineShoppingCart, HiOutlineAcademicCap, HiOutlineCloud } from 'react-icons/hi2';
import SectionTitle from '../ui/SectionTitle';

import fintechImg from '../../assets/industries/fintech.png';
import healthcareImg from '../../assets/industries/healthcare.png';
import ecommerceImg from '../../assets/industries/ecommerce.png';
import educationImg from '../../assets/industries/education.png';
import saasImg from '../../assets/industries/saas.png';

const industries = [
    {
        title: 'Fintech',
        desc: 'Secure and scalable financial solutions',
        image: fintechImg,
        color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
        title: 'Healthcare',
        desc: 'Reliable and efficient healthcare systems',
        image: healthcareImg,
        color: 'from-green-500/20 to-emerald-500/20'
    },
    {
        title: 'E-commerce',
        desc: 'High-performance online shopping platforms',
        image: ecommerceImg,
        color: 'from-orange-500/20 to-red-500/20'
    },
    {
        title: 'Education',
        desc: 'Smart digital learning solutions',
        image: educationImg,
        color: 'from-purple-500/20 to-pink-500/20'
    },
    {
        title: 'SaaS',
        desc: 'Scalable cloud-based software products',
        image: saasImg,
        color: 'from-indigo-500/20 to-blue-500/20'
    }
];

const Industries = () => {
    return (
        <section id="industries" className="section-padding bg-dark-100 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
            
            <div className="container-custom relative z-10">
                <div className="text-center mb-12 px-4">
                    <SectionTitle
                        label="Expertise"
                        title={<>Industries We <span className="text-gradient">Serve</span></>}
                        center={true}
                    />
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-xs md:text-sm">
                        Deliver value across diverse sectors with our domain-specific technology solutions 
                        and industry-leading best practices.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-0 max-w-6xl mx-auto">
                    {industries.map((industry, idx) => (
                        <motion.div
                            key={industry.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="group relative h-full"
                        >
                            {/* Card Glow Effect */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${industry.color} rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500 overflow-hidden`} />
                            
                            <div className="relative glass h-full rounded-3xl border border-white/5 flex flex-col group-hover:border-orange-500/30 transition-all duration-300 overflow-hidden shadow-2xl">
                                {/* Full-Bleed Image Header */}
                                <div className="w-full h-48 md:h-56 relative overflow-hidden">
                                    <img 
                                        src={industry.image} 
                                        alt={industry.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                    {/* Overlay Gradient for contrast */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent opacity-60" />
                                    
                                    {/* Industry Tag */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-dark-100/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-black tracking-widest text-orange-500">
                                            Sector
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 flex flex-col flex-grow bg-dark-200/40">
                                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                                        {industry.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {industry.desc}
                                    </p>
                                    
                                    <div className="mt-auto pt-6 flex items-center justify-between text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                                        <span>Scale Solution</span>
                                        <div className="w-8 h-px bg-white/10 group-hover:w-12 group-hover:bg-orange-500 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* Compact Placeholder Card with matching full-bleed style */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="glass rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center hover:border-orange-500/30 transition-all duration-300 group min-h-[300px]"
                    >
                        <div className="p-5 rounded-2xl bg-white/5 mb-4 group-hover:bg-orange-500/10 transition-colors">
                            <span className="text-white/20 group-hover:text-orange-500 text-3xl font-light">+</span>
                        </div>
                        <h4 className="text-white/40 font-bold group-hover:text-white transition-colors text-sm">Build Your Vision</h4>
                        <p className="text-gray-600 text-[10px] mt-2 uppercase tracking-widest">Custom Industry Solutions</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Industries;
