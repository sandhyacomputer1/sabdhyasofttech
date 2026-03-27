import { motion } from 'framer-motion';
import {
    HiCheckCircle, HiUpload, HiUser, HiMail,
    HiPhone, HiBriefcase, HiPencilAlt, HiArrowRight, HiExternalLink
} from 'react-icons/hi';

const HR_EMAIL = 'sandhyasofttechpvtltd@gmail.com';

const inputCls = "w-full px-3 py-2 pl-8 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 focus:outline-none transition-all text-xs";
const labelCls = "block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1";
const sectionHeadCls = "text-[10px] text-gray-600 uppercase tracking-widest font-semibold mb-2.5 pb-1.5 border-b border-white/5";

const FieldIcon = ({ icon: Icon }) => (
    <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
);

const FutureApplicationForm = ({ form, onChange, onSubmit, status, errorMsg, fileRef, onReset, jobs = [] }) => {

    const handleEmailApply = (jobTitle = '') => {
        const subject = jobTitle
            ? encodeURIComponent(`Job Application – ${jobTitle}`)
            : encodeURIComponent('General Application – Talent Pool');
        const body = encodeURIComponent(
            `Dear Hiring Team,\n\nI would like to express my interest in ${jobTitle ? `the ${jobTitle} position` : 'any suitable openings'} at Sandhya SoftTech.\n\nPlease find my resume attached.\n\nName: \nPhone: \nLinkedIn / Portfolio: \n\nBest regards,`
        );
        window.open(`mailto:${HR_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 px-4 flex flex-col items-center gap-3"
            >
                <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                    <HiCheckCircle className="text-orange-500 text-3xl" />
                </div>
                <h4 className="font-display font-bold text-white text-lg">Application Received</h4>
                <p className="text-gray-400 max-w-xs leading-relaxed text-xs">
                    We've added your profile to our talent pool and will contact you when a suitable opportunity arises.
                </p>
                <div className="w-full max-w-xs p-3 rounded-lg bg-orange-500/5 border border-orange-500/20 text-left">
                    <p className="text-[10px] text-orange-400 font-semibold uppercase tracking-widest mb-1.5">Also Send Your Resume</p>
                    <a
                        href={`mailto:${HR_EMAIL}?subject=${encodeURIComponent('Job Application – Talent Pool')}`}
                        className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 transition-colors text-xs font-medium break-all"
                        target="_blank" rel="noreferrer"
                    >
                        <HiMail className="text-sm flex-shrink-0" />
                        {HR_EMAIL}
                    </a>
                </div>
                <p className="text-gray-600 text-[10px]">Expected response within 5–7 business days</p>
                <button onClick={onReset} className="text-xs text-gray-500 hover:text-orange-400 transition-colors underline underline-offset-4">
                    Submit another profile
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">

            {/* Personal Information */}
            <div>
                <p className={sectionHeadCls}>Personal Information</p>
                <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>Full Name <span className="text-orange-500 normal-case tracking-normal font-normal">*</span></label>
                        <div className="relative">
                            <FieldIcon icon={HiUser} />
                            <input name="name" value={form.name} onChange={onChange} required placeholder="e.g. Rahul Sharma" className={inputCls} />
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>Email Address <span className="text-orange-500 normal-case tracking-normal font-normal">*</span></label>
                        <div className="relative">
                            <FieldIcon icon={HiMail} />
                            <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@domain.com" className={inputCls} />
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>Phone Number</label>
                        <div className="relative">
                            <FieldIcon icon={HiPhone} />
                            <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" className={inputCls} />
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>Preferred Role <span className="text-orange-500 normal-case tracking-normal font-normal">*</span></label>
                        <div className="relative">
                            <FieldIcon icon={HiBriefcase} />
                            <input name="role" value={form.role} onChange={onChange} required placeholder="e.g. Full Stack Developer" className={inputCls} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Brief Introduction */}
            <div>
                <p className={sectionHeadCls}>Brief Introduction</p>
                <div className="relative">
                    <HiPencilAlt className="absolute left-2.5 top-2.5 text-gray-500 text-sm pointer-events-none" />
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        rows={3}
                        placeholder="Summarize your experience and skills..."
                        className="w-full px-3 py-2 pl-8 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 focus:outline-none transition-all text-xs resize-none"
                    />
                </div>
            </div>

            {/* Resume Upload */}
            <div>
                <p className={sectionHeadCls}>Resume / CV</p>
                <label className="group flex items-center gap-3 p-3 rounded-lg border border-dashed border-white/15 hover:border-orange-500/40 bg-white/[0.02] hover:bg-orange-500/[0.03] cursor-pointer transition-all">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                        <HiUpload className="text-orange-500 text-base" />
                    </div>
                    <div className="flex-1 min-w-0">
                        {form.resume ? (
                            <>
                                <p className="text-white text-xs font-medium truncate">{form.resume.name}</p>
                                <p className="text-gray-500 text-[10px]">Click to change</p>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-300 text-xs font-medium">Upload your Resume or CV</p>
                                <p className="text-gray-500 text-[10px]">PDF, DOC, or DOCX — Max 5 MB</p>
                            </>
                        )}
                    </div>
                    <input ref={fileRef} type="file" name="resume" accept=".pdf,.doc,.docx" onChange={onChange} className="hidden" />
                </label>
            </div>

            {errorMsg && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 text-xs">{errorMsg}</p>
                </div>
            )}

            {/* Primary CTA */}
            <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,107,0,0.2)]"
            >
                {status === 'loading' ? (
                    <>
                        <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Submitting...
                    </>
                ) : (
                    <>Submit Resume <HiArrowRight /></>
                )}
            </motion.button>

            <p className="text-center text-gray-600 text-[10px]">
                By submitting, you agree to our <span className="text-orange-500/70 hover:text-orange-400 cursor-pointer transition-colors">Privacy Policy</span>. We never share your data.
            </p>
        </form>
    );
};

export default FutureApplicationForm;
