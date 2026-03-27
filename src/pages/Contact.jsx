import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '../firebase/firestore';
import SectionTitle from '../components/ui/SectionTitle';
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle, HiChat } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            await submitContactForm(form);
            setStatus('success');
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            setStatus('error');
            setErrorMsg('Failed to send. Please try again or email us directly.');
            console.error(err);
        }
    };

    const contactInfo = [
        {
            icon: <HiLocationMarker className="text-orange-500 text-xl" />,
            label: 'Head Office',
            value: 'Sandhya Softtech Pvt Ltd,\nMondha Rd, Miya Bhai Colony,\nAmbajogai, Maharashtra 431515'
        },
        { icon: <HiPhone className="text-orange-500 text-xl" />, label: 'Phone', value: '+91 87671 45100\n+91 95275 37131' },
        { icon: <HiMail className="text-orange-500 text-xl" />, label: 'Email', value: 'sandhyasofttechpvtltd@gmail.com' },
        { icon: <HiChat className="text-orange-500 text-xl" />, label: 'Business Hours', value: 'Mon – Sat: 9 AM – 7 PM IST' },
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0F] pt-24 relative">
            {/* WhatsApp Floating Button */}
            <motion.a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl shadow-[0_4px_24px_rgba(37,211,102,0.5)]"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp />
            </motion.a>

            {/* Hero */}
            <section className="py-16 container-custom text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <span className="text-xs font-semibold tracking-[0.3em] text-orange-500 uppercase mb-4 block">Get In Touch</span>
                    <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
                        Let's Build Something<br /><span className="text-gradient">Amazing Together</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you within 24 hours.
                    </p>
                </motion.div>
            </section>

            <section className="pb-20 pt-12">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-5 gap-10">
                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-5">
                            <SectionTitle label="Contact Info" title={<>Reach <span className="text-gradient">Us Here</span></>} />
                            {contactInfo.map((c, i) => (
                                <motion.div
                                    key={c.label}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="glass rounded-xl p-4 flex items-start gap-4 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group"
                                    whileHover={{ 
                                        y: -2,
                                        boxShadow: "0 8px 25px rgba(255, 107, 0, 0.15)"
                                    }}
                                >
                                    <motion.div 
                                        className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors duration-300"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {c.icon}
                                    </motion.div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5 group-hover:text-orange-400 transition-colors duration-300">{c.label}</p>
                                        <p className="text-gray-400 text-sm whitespace-pre-line group-hover:text-white transition-colors duration-300">{c.value}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Map */}
                            <a
                                href="https://maps.app.goo.gl/94LMs6pfSSgrvVWv5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-xl overflow-hidden border border-orange-500/10 h-48"
                            >
                                <iframe
                                    title="Sandhya SoftTech Location"
                                    src="https://www.google.com/maps?q=Sandhya+Softtech+Pvt+Ltd,Mondha+Rd,Miya+Bhai+Colony,Ambajogai,Maharashtra+431515&z=15&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9)', pointerEvents: 'none' }}
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </a>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-3">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="glass rounded-2xl p-12 text-center border border-orange-500/20 h-full flex flex-col items-center justify-center"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <HiCheckCircle className="text-7xl text-orange-500 mx-auto mb-5" />
                                        </motion.div>
                                        <h3 className="font-display font-bold text-white text-2xl mb-3">Message Sent!</h3>
                                        <p className="text-gray-400 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                        <button onClick={() => setStatus('idle')} className="btn-outline">Send Another</button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        onSubmit={handleSubmit}
                                        className="glass rounded-2xl p-8 border border-orange-500/10 space-y-5"
                                    >
                                        <h3 className="font-display font-bold text-white text-xl mb-2">Send Us a Message</h3>
                                        <div className="grid sm:grid-cols-2 gap-8">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-3">Your Name *</label>
                                                <input name="name" value={form.name} onChange={handleChange} required placeholder="Rajesh Sharma" />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-3">Email Address *</label>
                                                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="rajesh@sandhyasofttech.com" />
                                            </div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-8">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-3">Phone Number</label>
                                                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9999 999999" />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-3">Subject *</label>
                                                <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Project Inquiry" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-3">Message *</label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                placeholder="Tell us about your project..."
                                            />
                                        </div>
                                        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                                        <motion.button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="btn-primary w-full py-3.5 disabled:opacity-60"
                                        >
                                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                                        </motion.button>
                                        <p className="text-gray-600 text-xs text-center">We typically reply within 24 hours.</p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
