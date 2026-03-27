import { HiArrowLeft, HiShieldCheck, HiAdjustments } from 'react-icons/hi';

const CookiePolicy = () => {
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
                        Cookie <span className="text-gradient">Policy</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        This Cookie Policy explains how Sandhya SoftTech uses cookies and similar technologies on our website.
                    </p>
                </div>

                {/* Content */}
                <div className="glass rounded-2xl p-8 border border-orange-500/10 max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {/* What Are Cookies */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                <span className="text-2xl">🍪</span>
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-3">What Are Cookies</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Cookies are small text files that are stored on your device (computer, smartphone, tablet) when you 
                                    visit a website. They help the website remember information about your visit, like your preferred language 
                                    and other settings.
                                </p>
                            </div>
                        </div>

                        {/* How We Use Cookies */}
                        <div className="flex gap-4">
                            <HiAdjustments className="text-orange-500 text-xl shrink-0 mt-1" />
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-3">How We Use Cookies</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    We use cookies to enhance your experience, analyze website traffic, and personalize content. 
                                    Cookies help us understand how visitors interact with our website and improve our services accordingly.
                                </p>
                            </div>
                        </div>

                        {/* Types of Cookies */}
                        <div className="flex gap-4">
                            <HiShieldCheck className="text-orange-500 text-xl shrink-0 mt-1" />
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-3">Types of Cookies We Use</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="text-orange-500 font-medium mb-1">Essential Cookies</p>
                                        <p className="text-gray-300">Required for the website to function properly.</p>
                                    </div>
                                    <div>
                                        <p className="text-orange-500 font-medium mb-1">Performance Cookies</p>
                                        <p className="text-gray-300">Help us understand how visitors interact with our website.</p>
                                    </div>
                                    <div>
                                        <p className="text-orange-500 font-medium mb-1">Functional Cookies</p>
                                        <p className="text-gray-300">Enable enhanced functionality and personalization.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Managing Cookies */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-display font-bold text-white text-lg mb-3">Managing Your Cookies</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your 
                                computer and you can set most browsers to prevent them from being placed. However, if you do this, 
                                you may have to manually adjust some preferences every time you visit a site.
                            </p>
                        </div>

                        {/* Third-Party Cookies */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-display font-bold text-white text-lg mb-3">Third-Party Cookies</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                In some special cases we also use cookies provided by trusted third parties. The following section details 
                                which third party cookies you might encounter through this site.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-display font-bold text-white text-lg mb-3">Contact Us</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                If you have any questions about this Cookie Policy, please contact us:
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
                                This Cookie Policy was last updated on {new Date().toLocaleDateString('en-US', { 
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

export default CookiePolicy;
