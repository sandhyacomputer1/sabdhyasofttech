import { Link } from 'react-router-dom';
import { HiArrowLeft, HiShieldCheck, HiLockClosed, HiDatabase } from 'react-icons/hi';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
            <div className="container-custom">
                {/* Back to Home */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
                    >
                        <HiArrowLeft className="text-lg" />
                        Back to Home
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold tracking-[0.3em] text-orange-500 uppercase mb-4 block">Legal</span>
                    <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-5">
                        Privacy <span className="text-gradient">Policy</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                    </p>
                </div>

                {/* Content */}
                <div className="glass rounded-2xl p-8 border border-orange-500/10 max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {/* Information We Collect */}
                        <div className="flex gap-4">
                            <HiDatabase className="text-orange-500 text-xl shrink-0 mt-1" />
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-3">Information We Collect</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. 
                                    This may include your name, email address, phone number, and other information you choose to provide.
                                </p>
                            </div>
                        </div>

                        {/* How We Use Information */}
                        <div className="flex gap-4">
                            <HiShieldCheck className="text-orange-500 text-xl shrink-0 mt-1" />
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-3">How We Use Your Information</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    We use information we collect to provide, maintain, and improve our services, communicate with you, 
                                    and develop new services. We may also use your information to personalize your experience.
                                </p>
                            </div>
                        </div>

                        {/* Data Security */}
                        <div className="flex gap-4">
                            <HiLockClosed className="text-orange-500 text-xl shrink-0 mt-1" />
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-3">Data Security</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    We implement appropriate security measures to protect your personal information against unauthorized access, 
                                    alteration, disclosure, or destruction. Your data is stored on secure servers.
                                </p>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-display font-bold text-white text-lg mb-3">Contact Us</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-400">
                                    <span className="text-orange-500">Email:</span> sandhyasofttechpvtltd@gmail.com
                                </p>
                                <p className="text-gray-400">
                                    <span className="text-orange-500">Phone:</span> +91 87671 45100
                                </p>
                            </div>
                        </div>

                        {/* Last Updated */}
                        <div className="border-t border-white/10 pt-6">
                            <p className="text-gray-500 text-xs">
                                This Privacy Policy was last updated on {new Date().toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
