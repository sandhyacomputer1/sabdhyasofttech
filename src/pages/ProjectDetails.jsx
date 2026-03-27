import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiChevronLeft, HiChevronRight, HiCheckCircle, HiCalendar, HiChip } from 'react-icons/hi';
import { getProject } from '../firebase/firestore';
import Loader from '../components/layout/Loader';
import DemoModal from '../components/ui/DemoModal';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProject(id);
                if (data) {
                    setProject(data);
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    // Handle slider images
    const images = project?.sliderImages?.length > 0
        ? project.sliderImages
        : (project?.logoURL ? [project.logoURL] : []);

    // Auto-slide every 4 seconds
    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [images]);

    const handleBackToPortfolio = (e) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            const el = document.getElementById('portfolio');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }, 150);
    };

    if (loading) return <Loader />;
    if (!project) return null;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <main
            className="min-h-screen relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0a0a0b 0%, #151518 50%, #0a0a0b 100%)',
                paddingTop: '115px',
                paddingBottom: '40px'
            }}
        >
            {/* Background effects - Logo inspired orange glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]" />
                <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] rounded-full bg-orange-600/5 blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            {/* Container pushed to left edge specifically (px-[30px]) */}
            <div className="w-full max-w-[1600px] px-[20px] md:px-[30px] mx-auto relative z-10">

                {/* Title perfectly centered relative to entire screen */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-display font-bold text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white mb-10 leading-tight text-center drop-shadow-lg break-words w-full"
                >
                    {project.title}
                </motion.h1>

                {/* Main Content Layout - Grid 12 Columns */}
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">

                    {/* Left Column: Image Slider */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-6 flex flex-col items-center lg:items-start lg:sticky"
                        style={{ top: '30px' }}
                    >

                        {/* Slider Container explicitly increased height */}
                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden glass border border-white/10 w-full xl:max-w-[650px] h-[350px] lg:h-[500px] xl:h-[600px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                            <div className="absolute inset-0 bg-dark-200 animate-pulse -z-10" />

                            <AnimatePresence mode="wait">
                                {images.length > 0 ? (
                                    <motion.img
                                        key={currentImageIndex}
                                        src={images[currentImageIndex]}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full object-contain p-4"
                                        alt="Project Screenshot"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                                        <HiChip className="text-9xl text-orange-500/20" />
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* Slider Controls FIXED TO LEFT/RIGHT EDGES */}
                            <button
                                onClick={prevImage}
                                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 md:p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-orange-500 hover:border-orange-500 transition-all shadow-lg hover:scale-105 active:scale-95 z-20"
                            >
                                <HiChevronLeft className="text-lg md:text-xl" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 md:p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-orange-500 hover:border-orange-500 transition-all shadow-lg hover:scale-105 active:scale-95 z-20"
                            >
                                <HiChevronRight className="text-lg md:text-xl" />
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-orange-500 w-8 md:w-10' : 'bg-white/50 hover:bg-white/90'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Key Features, Description & Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-6 w-full space-y-10"
                    >
                        {/* Key Features (Transparent outer, cards inner) */}
                        <div className="mt-0">
                            <h3 className="font-display font-bold text-white text-3xl mb-6 flex items-center gap-2">
                                <span className="text-orange-500">_</span> Key Features
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {project.keyFeatures.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 glass bg-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-orange-500/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,107,0,0.1)] transition-all cursor-default group"
                                    >
                                        <HiCheckCircle className="text-orange-500 shrink-0 text-xl mt-0.5 group-hover:scale-110 transition-transform" />
                                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-display font-bold text-white text-3xl mb-4 flex items-center gap-2">
                                <span className="text-orange-500">_</span> Description
                            </h3>
                            <div className="text-gray-400 leading-relaxed text-base space-y-4 glass p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-[50px] pointer-events-none" />
                                <p className="relative z-10">{project.description}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center gap-10">
                            <button
                                onClick={() => setIsDemoModalOpen(true)}
                                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_25px_rgba(255,107,0,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                <HiCalendar className="text-base" />
                                Schedule a Demo
                            </button>

                            <button
                                onClick={handleBackToPortfolio}
                                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-orange-500/50 font-bold text-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                <HiArrowLeft className="text-base" />
                                Back to Portfolio
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
        </main>
    );
};

export default ProjectDetails;