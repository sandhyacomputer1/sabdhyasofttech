import { motion } from 'framer-motion';
import { HiX, HiLocationMarker, HiDownload, HiExternalLink, HiCalendar, HiUsers, HiBriefcase, HiGlobeAlt } from 'react-icons/hi';

const FranchiseModal = ({ franchise, onClose, onDownloadBrochure, onGetLocation }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-dark-100 rounded-3xl max-w-4xl mx-auto my-4 max-h-[90vh] overflow-y-auto border border-orange-500/20 relative"
            >
                {/* Header Image */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                    {franchise.image ? (
                        <img
                            src={franchise.image}
                            alt={franchise.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-500/30 to-orange-600/30 flex items-center justify-center">
                            <HiLocationMarker className="text-6xl text-orange-400" />
                        </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Close Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                    >
                        <HiX className="text-xl" />
                    </motion.button>

                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="font-display font-bold text-white text-3xl mb-2">
                            {franchise.name}
                        </h2>
                        <div className="flex items-center gap-3 text-gray-200">
                            <HiLocationMarker className="text-orange-400" />
                            <span className="text-lg">{franchise.location}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {/* Status Badge */}
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-400 font-medium">Active Franchise</span>
                        </div>
                    </div>

                    {/* Description */}
                    {franchise.description && (
                        <div className="mb-8">
                            <h3 className="font-display font-bold text-white text-xl mb-3">About This Location</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {franchise.description}
                            </p>
                        </div>
                    )}

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {franchise.established && (
                            <div className="glass rounded-2xl p-6 border border-orange-500/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                        <HiCalendar className="text-orange-400 text-lg" />
                                    </div>
                                    <span className="text-gray-400 text-sm">Established</span>
                                </div>
                                <p className="text-white text-xl font-bold">{franchise.established}</p>
                            </div>
                        )}

                        {franchise.teamSize && (
                            <div className="glass rounded-2xl p-6 border border-orange-500/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                        <HiUsers className="text-orange-400 text-lg" />
                                    </div>
                                    <span className="text-gray-400 text-sm">Team Size</span>
                                </div>
                                <p className="text-white text-xl font-bold">{franchise.teamSize}</p>
                            </div>
                        )}

                        <div className="glass rounded-2xl p-6 border border-orange-500/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                    <HiBriefcase className="text-orange-400 text-lg" />
                                </div>
                                <span className="text-gray-400 text-sm">Services</span>
                            </div>
                            <p className="text-white text-xl font-bold">
                                {franchise.services?.length || 0}+
                            </p>
                        </div>
                    </div>

                    {/* Services */}
                    {franchise.services && franchise.services.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-display font-bold text-white text-xl mb-4">Core Services</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {franchise.services.map((service, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-orange-400 rounded-full" />
                                        <span className="text-gray-300">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onDownloadBrochure}
                            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-orange-500/20"
                        >
                            <HiDownload className="text-xl" />
                            <span>Download Brochure</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onGetLocation}
                            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/15 hover:border-orange-500/30 transition-all duration-300"
                        >
                            <HiGlobeAlt className="text-xl" />
                            <span>Get Location</span>
                        </motion.button>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="text-center">
                            <p className="text-gray-400 mb-4">Interested in partnering with this location?</p>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.location.href = '/contact'}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 font-medium rounded-xl hover:bg-orange-500/20 transition-all duration-300"
                            >
                                <span>Contact This Franchise</span>
                                <HiExternalLink />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FranchiseModal;
