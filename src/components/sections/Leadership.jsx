import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

import founderImg from '../../assets/industries/team/founder.jpeg';
import coFounderImg from '../../assets/industries/team/co-founder.jpeg';
import ceoImg from '../../assets/industries/team/ceo.jpeg';
import directorImg from '../../assets/industries/team/director.jpeg';

const leaders = [
    {
        name: 'Raghunath Jagtap',
        role: 'Director',
        image: directorImg,
        bio: 'Expert in operational management and delivering high-impact business solutions.',
    },
    {
        name: 'Ashish Jagtap',
        role: 'Founder',
        image: founderImg,
        bio: 'Visionary leader with 10+ years of experience in digital transformation.',
    },
    {
        name: 'Akash Jagtap',
        role: 'Co-Founder',
        image: coFounderImg,
        bio: 'Strategic mind focused on building scalable technology for global markets.',
    },
    {
        name: 'Santosh Suvarnkar',
        role: 'Chief Executive Officer (CEO)',
        image: ceoImg,
        bio: 'Driving growth and innovation through excellence in executive leadership.',
    }
];

const LeaderCard = ({ leader, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
        >
            <div className="relative overflow-hidden rounded-2xl glass border border-white/5 aspect-[4/5] mb-4">
                {/* Image */}
                <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-center">
                    <p className="text-gray-300 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 italic">
                        "{leader.bio}"
                    </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 blur-2xl group-hover:bg-orange-500/30 transition-colors duration-500" />
            </div>

            <div className="text-center">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-orange-500 transition-colors">
                    {leader.name}
                </h3>
                <p className="text-orange-500 font-medium text-sm tracking-widest uppercase mt-1">
                    {leader.role}
                </p>
            </div>
        </motion.div>
    );
};

const Leadership = () => {
    return (
        <section id="leadership" className="section-padding bg-dark-100 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute left-0 top-0 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-orange-500/3 blur-[100px] pointer-events-none" />

            <div className="container-custom">
                <SectionTitle
                    label="Meet Our Leadership"
                    title={<>The Minds Behind<br /><span className="text-gradient">Our Success</span></>}
                    center
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    {leaders.map((leader, index) => (
                        <LeaderCard key={leader.role} leader={leader} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;
