import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const LegalModal = ({ isOpen, onClose, activeContent }) => {

    const privacyContent = (
        <div className="space-y-6">
            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Information We Collect</h4>
                <p className="text-gray-300 mb-4">We collect information you provide directly to us, such as when you contact us, apply for jobs, or use our services. This may include:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Name and contact information</li>
                    <li>Professional information and resume</li>
                    <li>Communication preferences</li>
                    <li>Usage data and analytics</li>
                </ul>
            </div>
            
            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">How We Use Your Information</h4>
                <p className="text-gray-300 mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Provide and maintain our services</li>
                    <li>Respond to your inquiries and requests</li>
                    <li>Process job applications</li>
                    <li>Improve our website and services</li>
                    <li>Send you marketing communications (with consent)</li>
                </ul>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Data Protection</h4>
                <p className="text-gray-300">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Contact Us</h4>
                <p className="text-gray-300">If you have questions about this Privacy Policy, please contact us at sandhyasofttechpvtltd@gmail.com</p>
            </div>
        </div>
    );

    const termsContent = (
        <div className="space-y-6">
            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Acceptance of Terms</h4>
                <p className="text-gray-300">By accessing and using Sandhya SoftTech's website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Services Description</h4>
                <p className="text-gray-300">Sandhya SoftTech provides software development services including custom software development, web applications, mobile apps, and SaaS solutions.</p>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">User Responsibilities</h4>
                <p className="text-gray-300 mb-4">Users agree to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Provide accurate and complete information</li>
                    <li>Use our services for lawful purposes only</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                    <li>Respect intellectual property rights</li>
                </ul>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Limitation of Liability</h4>
                <p className="text-gray-300">Sandhya SoftTech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.</p>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Termination</h4>
                <p className="text-gray-300">We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason whatsoever.</p>
            </div>
        </div>
    );

    const cookiesContent = (
        <div className="space-y-6">
            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">What Are Cookies</h4>
                <p className="text-gray-300">Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us improve your experience and provide better services.</p>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">How We Use Cookies</h4>
                <p className="text-gray-300 mb-4">We use cookies to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Personalize your experience</li>
                    <li>Improve our website performance</li>
                    <li>Provide security features</li>
                </ul>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Types of Cookies We Use</h4>
                <div className="space-y-3">
                    <div>
                        <h5 className="text-white font-medium mb-2">Essential Cookies</h5>
                        <p className="text-gray-300">Required for the website to function properly.</p>
                    </div>
                    <div>
                        <h5 className="text-white font-medium mb-2">Analytics Cookies</h5>
                        <p className="text-gray-300">Help us understand how visitors interact with our website.</p>
                    </div>
                    <div>
                        <h5 className="text-white font-medium mb-2">Functional Cookies</h5>
                        <p className="text-gray-300">Enable enhanced functionality and personalization.</p>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Managing Cookies</h4>
                <p className="text-gray-300">You can control and manage cookies through your browser settings. However, disabling certain cookies may affect your experience on our website.</p>
            </div>

            <div>
                <h4 className="font-display font-bold text-white text-lg mb-3">Updates to This Policy</h4>
                <p className="text-gray-300">We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
            </div>
        </div>
    );

    const getContent = () => {
        switch (activeContent) {
            case 'privacy':
                return { title: 'Privacy Policy', content: privacyContent };
            case 'terms':
                return { title: 'Terms of Use', content: termsContent };
            case 'cookies':
                return { title: 'Cookie Policy', content: cookiesContent };
            default:
                return { title: 'Privacy Policy', content: privacyContent };
        }
    };

    const { title, content } = getContent();
    return (
        <AnimatePresence>
            {isOpen && (
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
                        className="bg-dark-100 rounded-2xl p-8 max-w-4xl mx-auto my-4 max-h-[90vh] overflow-y-auto border border-orange-500/20 relative"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-display font-bold text-white text-xl mb-4">
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-orange-500 transition-colors p-2"
                            >
                                <HiX className="text-xl" />
                            </button>
                        </div>

                        <div className="text-gray-300 text-sm leading-relaxed">
                            {content}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LegalModal;
