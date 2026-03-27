import { HiArrowLeft, HiDocumentText, HiExclamation } from 'react-icons/hi';

const TermsOfUse = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
            <div className="container-custom">
                {/* Back to Home */}
                <div className="mb-8">
                    <button
                        onClick={scrollToTop}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
                    >
                        <HiArrowLeft className="text-lg" />
                        Back to Top
                    </button>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold tracking-[0.3em] text-orange-500 uppercase mb-4 block">Legal</span>
                    <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-5">
                        Terms of <span className="text-gradient">Use</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        These terms govern your use of our services and website. By using our services, you agree to these terms.
                    </p>
                </div>

                {/* Content */}
                <div className="glass rounded-2xl p-8 border border-orange-500/10 max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {/* Acceptance of Terms */}
                        <div className="flex gap-4">
                            <HiDocumentText className="text-orange-500 text-xl shrink-0 mt-1" />
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-3">Acceptance of Terms</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    By accessing and using Sandhya SoftTech's services, you accept and agree to be bound by the terms 
                                    and provision of this agreement. If you do not agree to abide by the above, please do not use our service.
                                </p>
                            </div>
                        </div>

                        {/* Use License */}
                        <div className="flex gap-4">
                            <HiDocumentText className="text-orange-500 text-xl shrink-0 mt-1" />
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-3">Use License</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Permission is granted to temporarily download one copy of materials on Sandhya SoftTech's website 
                                    for personal, non-commercial transitory viewing only. This is a grant of a license, not a transfer of title.
                                </p>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="flex gap-4">
                            <HiExclamation className="text-orange-500 text-xl shrink-0 mt-1" />
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-3">Disclaimer</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    The materials on Sandhya SoftTech's website are provided on an 'as is' basis. Sandhya SoftTech 
                                    makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
                                </p>
                            </div>
                        </div>

                        {/* Limitations */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-display font-bold text-white text-lg mb-3">Limitations</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                In no event shall Sandhya SoftTech or its suppliers be liable for any damages (including, without 
                                limitation, damages for loss of data or profit, or due to business interruption) arising out of the 
                                use or inability to use the materials on Sandhya SoftTech's website.
                            </p>
                        </div>

                        {/* Revisions and Errata */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-display font-bold text-white text-lg mb-3">Revisions and Errata</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                The materials appearing on Sandhya SoftTech's website could include technical, typographical, or photographic 
                                errors. We do not warrant that any of the materials on its website are accurate, complete, or current.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-display font-bold text-white text-lg mb-3">Contact Us</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                If you have any questions about these Terms of Use, please contact us:
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
                                These Terms of Use were last updated on {new Date().toLocaleDateString('en-US', { 
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

export default TermsOfUse;
