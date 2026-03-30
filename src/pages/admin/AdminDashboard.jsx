import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getContactMessages, getJobApplications, addJob, updateJob, deleteJob, getJobs, getProjects, addProject, updateProject, deleteProject, getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialStatus, getFranchises, addFranchise, updateFranchise, deleteFranchise, toggleFranchiseStatus } from '../../firebase/firestore';
import { uploadProjectImage } from '../../firebase/storage';
import { HiMail, HiBriefcase, HiDownload, HiLogout, HiRefresh, HiPlus, HiTrash, HiPencil, HiEye, HiChip, HiStar, HiUser } from 'react-icons/hi';

const AdminDashboard = () => {
    const { currentUser, logout } = useAuth();
    const [tab, setTab] = useState('messages');
    const [messages, setMessages] = useState([]);
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [projects, setProjects] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [franchises, setFranchises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showJobForm, setShowJobForm] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showTestimonialForm, setShowTestimonialForm] = useState(true);
    const [showFranchiseForm, setShowFranchiseForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [editingFranchise, setEditingFranchise] = useState(null);
    const [jobForm, setJobForm] = useState({
        title: '',
        dept: '',
        type: 'Full-Time',
        location: '',
        exp: '',
        skills: '',
        description: '',
        posted: new Date().toISOString().split('T')[0]
    });
    const [projectForm, setProjectForm] = useState({
        title: '',
        category: 'Web App',
        tech: '',
        description: '',
        keyFeatures: [''],
        logo: null,
        slider: [],
        sliderPreviews: []
    });
    const [testimonialForm, setTestimonialForm] = useState({
        name: '',
        position: '',
        rating: 5,
        testimonial: '',
        status: 'active'
    });
    const [franchiseForm, setFranchiseForm] = useState({
        name: '',
        location: '',
        image: '',
        brochure: '',
        mapLink: '',
        description: '',
        established: '',
        teamSize: '',
        services: [''],
        status: 'active'
    });

    if (!currentUser) return <Navigate to="/admin" replace />;

    const fetchData = async () => {
        setLoading(true);
        try {
            const [msgs, apps, jobList, projList, testimonialList, franchiseList] = await Promise.all([
                getContactMessages(),
                getJobApplications(),
                getJobs(),
                getProjects(),
                getTestimonials(),
                getFranchises()
            ]);
            setMessages(msgs);
            setApplications(apps);
            setJobs(jobList);
            setProjects(projList);
            setTestimonials(testimonialList);
            setFranchises(franchiseList);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleJobSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting job:', jobForm);
        try {
            if (editingJob) {
                console.log('Updating job:', editingJob.id, jobForm);
                await updateJob(editingJob.id, jobForm);
                setEditingJob(null);
                console.log('Job updated successfully');
            } else {
                console.log('Adding new job:', jobForm);
                await addJob(jobForm);
                console.log('Job added successfully');
            }
            setJobForm({
                title: '',
                dept: '',
                type: 'Full-Time',
                location: '',
                exp: '',
                skills: '',
                description: '',
                posted: new Date().toISOString().split('T')[0]
            });
            setShowJobForm(false);
            await fetchData();
            console.log('Data refreshed');
        } catch (err) {
            console.error('Error saving job:', err);
            console.error('Error details:', err.code, err.message);
            alert('Error saving job: ' + err.message);
        }
    };

    const handleEditJob = (job) => {
        setEditingJob(job);
        setJobForm({
            title: job.title,
            dept: job.dept,
            type: job.type,
            location: job.location,
            exp: job.exp,
            skills: job.skills,
            description: job.description,
            posted: job.posted
        });
        setShowJobForm(true);
    };

    const handleDeleteJob = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await deleteJob(jobId);
                await fetchData();
            } catch (err) {
                console.error('Error deleting job:', err);
            }
        }
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let logoURL = editingProject?.logoURL || '';
            let sliderImages = editingProject?.sliderImages || [];

            // Add or Update Project
            let projectData = {
                title: projectForm.title,
                category: projectForm.category,
                tech: projectForm.tech,
                description: projectForm.description,
                keyFeatures: projectForm.keyFeatures.filter(f => f.trim()),
                logoURL,
                sliderImages
            };

            let projectId;
            if (editingProject) {
                projectId = editingProject.id;
                await updateProject(projectId, projectData);
            } else {
                const docRef = await addProject(projectData);
                projectId = docRef.id;
            }

            // Handle Logo Upload if any
            if (projectForm.logo) {
                const { downloadURL } = await uploadProjectImage(projectForm.logo, projectId, 'logo');
                logoURL = downloadURL;
                await updateProject(projectId, { logoURL });
            }

            // Handle Slider Images Upload
            if (projectForm.slider.length > 0) {
                const uploadPromises = Array.from(projectForm.slider).map(file =>
                    uploadProjectImage(file, projectId, 'slider')
                );
                const results = await Promise.all(uploadPromises);
                const newSliderURLs = results.map(r => r.downloadURL);
                sliderImages = [...sliderImages, ...newSliderURLs];
                await updateProject(projectId, { sliderImages });
            }

            setProjectForm({
                title: '', category: 'Web App', tech: '',
                description: '', keyFeatures: [''],
                logo: null, slider: [], sliderPreviews: []
            });
            setShowProjectForm(false);
            setEditingProject(null);
            await fetchData();
        } catch (err) {
            console.error('Error saving project:', err);
            alert('Error saving project: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditProject = (proj) => {
        setEditingProject(proj);
        let features = [''];
        if (Array.isArray(proj.keyFeatures)) {
            features = proj.keyFeatures.length > 0 ? proj.keyFeatures : [''];
        } else if (typeof proj.keyFeatures === 'string') {
            features = proj.keyFeatures.split('\n').filter(f => f.trim()) || [''];
            if (features.length === 0) features = [''];
        }

        setProjectForm({
            title: proj.title || '',
            category: proj.category || 'Web App',
            tech: proj.tech || '',
            description: proj.description || '',
            keyFeatures: features,
            logo: null,
            slider: [],
            sliderPreviews: []
        });
        setShowProjectForm(true);
    };

    const handleDeleteProject = async (projId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(projId);
                await fetchData();
            } catch (err) {
                console.error('Error deleting project:', err);
            }
        }
    };

    // Testimonial handlers
    const handleTestimonialSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTestimonial) {
                await updateTestimonial(editingTestimonial.id, testimonialForm);
                setEditingTestimonial(null);
            } else {
                await addTestimonial(testimonialForm);
            }
            setTestimonialForm({
                name: '',
                position: '',
                rating: 5,
                testimonial: '',
                status: 'active'
            });
            setShowTestimonialForm(false);
            await fetchData();
        } catch (err) {
            console.error('Error saving testimonial:', err);
            alert('Error saving testimonial: ' + err.message);
        }
    };

    const handleEditTestimonial = (testimonial) => {
        setEditingTestimonial(testimonial);
        setTestimonialForm({
            name: testimonial.name || '',
            position: testimonial.position || '',
            rating: testimonial.rating || 5,
            testimonial: testimonial.testimonial || '',
            status: testimonial.status || 'active'
        });
        setShowTestimonialForm(true);
    };

    const handleDeleteTestimonial = async (testimonialId) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await deleteTestimonial(testimonialId);
                await fetchData();
            } catch (err) {
                console.error('Error deleting testimonial:', err);
            }
        }
    };

    const handleToggleTestimonialStatus = async (testimonial) => {
        try {
            await toggleTestimonialStatus(testimonial.id, testimonial.status);
            await fetchData();
        } catch (err) {
            console.error('Error toggling testimonial status:', err);
        }
    };

    // Franchise handlers
    const handleFranchiseSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingFranchise) {
                await updateFranchise(editingFranchise.id, franchiseForm);
                setEditingFranchise(null);
            } else {
                await addFranchise(franchiseForm);
            }
            setFranchiseForm({
                name: '',
                location: '',
                image: '',
                brochure: '',
                mapLink: '',
                description: '',
                established: '',
                teamSize: '',
                services: [''],
                status: 'active'
            });
            setShowFranchiseForm(false);
            await fetchData();
        } catch (err) {
            console.error('Error saving franchise:', err);
            alert('Error saving franchise: ' + err.message);
        }
    };

    const handleEditFranchise = (franchise) => {
        setEditingFranchise(franchise);
        setFranchiseForm({
            name: franchise.name || '',
            location: franchise.location || '',
            image: franchise.image || '',
            brochure: franchise.brochure || '',
            mapLink: franchise.mapLink || '',
            description: franchise.description || '',
            established: franchise.established || '',
            teamSize: franchise.teamSize || '',
            services: franchise.services || [''],
            status: franchise.status || 'active'
        });
        setShowFranchiseForm(true);
    };

    const handleDeleteFranchise = async (franchiseId) => {
        if (window.confirm('Are you sure you want to delete this franchise?')) {
            try {
                await deleteFranchise(franchiseId);
                await fetchData();
            } catch (err) {
                console.error('Error deleting franchise:', err);
                alert('Error deleting franchise: ' + err.message);
            }
        }
    };

    const handleToggleFranchiseStatus = async (franchise) => {
        try {
            await toggleFranchiseStatus(franchise.id, franchise.status);
            await fetchData();
        } catch (err) {
            console.error('Error toggling franchise status:', err);
        }
    };

    const formatDate = (ts) => {
        if (!ts) return '–';
        const d = ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-[#0A0A0F]">
            {/* Top bar */}
            <div className="glass-dark border-b border-orange-500/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <img src="/navlogo.png" alt="Sandhya SoftTech Logo" className="h-8 w-8 object-contain" />
                    <div>
                        <p className="font-display font-bold text-white text-sm">Admin Dashboard</p>
                        <p className="text-gray-500 text-xs">Sandhya SoftTech Pvt. Ltd.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-gray-500 text-xs hidden sm:block">{currentUser.email}</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={fetchData}
                        className="p-2 glass rounded-lg text-gray-400 hover:text-orange-500 transition-colors"
                        title="Refresh"
                    >
                        <HiRefresh />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={logout}
                        className="flex items-center gap-1.5 text-xs glass px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                    >
                        <HiLogout /> <span className="hidden sm:inline">Logout</span>
                    </motion.button>
                </div>
            </div>

            <div className="container-custom py-10">
                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {[
                        { label: 'Total Messages', val: messages.length, icon: <HiMail className="text-orange-500" /> },
                        { label: 'Applications', val: applications.length, icon: <HiBriefcase className="text-orange-500" /> },
                        { label: 'Job Postings', val: jobs.length, icon: <HiBriefcase className="text-orange-500" /> },
                        { label: 'Total Projects', val: projects.length, icon: <HiChip className="text-orange-500" /> },
                        { label: 'Testimonials', val: testimonials.length, icon: <HiStar className="text-orange-500" /> },
                        { label: 'Franchises', val: franchises.length, icon: <HiUser className="text-orange-500" /> },
                    ].map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="glass rounded-xl p-5 border border-orange-500/10"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400 text-xs">{s.label}</p>
                                {s.icon}
                            </div>
                            <p className="font-display font-bold text-white text-2xl">{s.val}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-6 flex-wrap">
                    {[
                        { key: 'messages', label: 'Contact Messages', icon: <HiMail /> },
                        { key: 'applications', label: 'Job Applications', icon: <HiBriefcase /> },
                        { key: 'jobs', label: 'Manage Jobs', icon: <HiBriefcase /> },
                        { key: 'projects', label: 'Manage Projects', icon: <HiChip /> },
                        { key: 'testimonials', label: 'Testimonials', icon: <HiStar /> },
                        { key: 'franchises', label: 'Franchises', icon: <HiUser /> },
                    ].map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === t.key ? 'bg-orange-500 text-white shadow-orange' : 'glass text-gray-400 hover:text-white'
                                }`}
                        >
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {/* Projects Management Tab */}
                {tab === 'projects' && (
                    <div className="glass rounded-2xl border border-orange-500/10 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <h2 className="font-display font-bold text-white text-base">Manage Portfolio Projects ({projects.length})</h2>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setShowProjectForm(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <HiPlus /> Add New Project
                            </motion.button>
                        </div>
                        {showProjectForm && (
                            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Project Title</label>
                                        <input
                                            type="text"
                                            value={projectForm.title}
                                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Category</label>
                                        <select
                                            value={projectForm.category}
                                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                            required
                                        >
                                            <option value="Web App">Web App</option>
                                            <option value="Mobile">Mobile</option>
                                            <option value="SaaS">SaaS</option>
                                            <option value="Enterprise">Enterprise</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Tech Stack (comma separated)</label>
                                    <input
                                        type="text"
                                        value={projectForm.tech}
                                        onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                        placeholder="React, Firebase, Node.js"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                                    <textarea
                                        value={projectForm.description}
                                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Key Features</label>
                                    <div className="space-y-2">
                                        {projectForm.keyFeatures.map((feature, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    value={feature}
                                                    onChange={(e) => {
                                                        const newFeatures = [...projectForm.keyFeatures];
                                                        newFeatures[idx] = e.target.value;
                                                        setProjectForm({ ...projectForm, keyFeatures: newFeatures });
                                                    }}
                                                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                                    placeholder={`Feature ${idx + 1}`}
                                                    required
                                                />
                                                {projectForm.keyFeatures.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newFeatures = projectForm.keyFeatures.filter((_, i) => i !== idx);
                                                            setProjectForm({ ...projectForm, keyFeatures: newFeatures });
                                                        }}
                                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    >
                                                        <HiTrash size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setProjectForm({ ...projectForm, keyFeatures: [...projectForm.keyFeatures, ''] })}
                                            className="text-xs text-orange-500 hover:underline flex items-center gap-1 mt-1"
                                        >
                                            <HiPlus /> Add Feature
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Project Logo <span className="text-red-500">*</span></label>
                                        <input
                                            type="file"
                                            onChange={(e) => setProjectForm({ ...projectForm, logo: e.target.files[0] })}
                                            className="w-full text-xs text-gray-500 bg-white/5 p-3 rounded-lg border border-white/10"
                                            accept="image/*"
                                            required={!editingProject}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Gallery Screenshots (Optional, Max 10)</label>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={(e) => {
                                                const newFiles = Array.from(e.target.files);
                                                const currentTotal = projectForm.slider.length + (editingProject?.sliderImages?.length || 0);

                                                if (currentTotal + newFiles.length > 10) {
                                                    alert(`Limit reached: You can only have 10 images total. (Currently have ${currentTotal})`);
                                                    return;
                                                }

                                                const newPreviews = newFiles.map(file => URL.createObjectURL(file));
                                                setProjectForm({
                                                    ...projectForm,
                                                    slider: [...projectForm.slider, ...newFiles],
                                                    sliderPreviews: [...projectForm.sliderPreviews, ...newPreviews]
                                                });
                                            }}
                                            className="w-full text-xs text-gray-500 bg-white/5 p-3 rounded-lg border border-white/10"
                                            accept="image/*"
                                        />
                                        <p className="text-[10px] text-gray-500 mt-1">Tip: You can select multiple files at once, or add them one by one.</p>
                                    </div>
                                </div>

                                {/* Image Previews */}
                                {(projectForm.sliderPreviews.length > 0 || (editingProject?.sliderImages?.length > 0)) && (
                                    <div className="space-y-4">
                                        <p className="text-sm font-medium text-gray-400">Gallery Preview / Management</p>
                                        <div className="flex flex-wrap gap-3">
                                            {/* Existing Images */}
                                            {editingProject?.sliderImages?.map((url, idx) => (
                                                <div key={`existing-${idx}`} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                                                    <img src={url} alt={`Project slide ${idx + 1}`} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={async () => {
                                                                if (window.confirm('Delete this image permanently?')) {
                                                                    const updatedImages = editingProject.sliderImages.filter((_, i) => i !== idx);
                                                                    await updateProject(editingProject.id, { sliderImages: updatedImages });
                                                                    setEditingProject({ ...editingProject, sliderImages: updatedImages });
                                                                }
                                                            }}
                                                            className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                                        >
                                                            <HiTrash size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="absolute top-1 left-1 bg-blue-500 text-[8px] text-white px-1 rounded">Saved</span>
                                                </div>
                                            ))}
                                            {/* New Previews */}
                                            {projectForm.sliderPreviews.map((url, idx) => (
                                                <div key={`new-${idx}`} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-orange-500/30">
                                                    <img src={url} alt={`New project slide ${idx + 1}`} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newFiles = Array.from(projectForm.slider).filter((_, i) => i !== idx);
                                                                const newPreviews = projectForm.sliderPreviews.filter((_, i) => i !== idx);
                                                                setProjectForm({ ...projectForm, slider: newFiles, sliderPreviews: newPreviews });
                                                            }}
                                                            className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                                        >
                                                            <HiTrash size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="absolute top-1 left-1 bg-orange-500 text-[8px] text-white px-1 rounded">New</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-6 mt-4 border-t border-white/5">
                                    <button type="submit" className="btn-primary flex-1 py-3.5 text-sm font-bold tracking-wide">
                                        {editingProject ? 'UPDATE PROJECT' : 'SAVE PROJECT'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowProjectForm(false); setEditingProject(null); }}
                                        className="px-8 py-3.5 border border-white/10 text-gray-400 rounded-lg hover:text-white hover:bg-white/5 transition-all text-sm"
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </form>
                        )}

                        {!showProjectForm && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/2">
                                            {['Project', 'Category', 'Tech Stack', 'Actions'].map((h) => (
                                                <th key={h} className="px-5 py-3 text-left text-xs text-gray-500 font-medium">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((proj, i) => (
                                            <tr key={proj.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex-shrink-0 flex items-center justify-center p-1.5`}>
                                                            {proj.logoURL ? (
                                                                <img src={proj.logoURL} alt={`${proj.title} logo`} className="w-full h-full object-contain" />
                                                            ) : (
                                                                <HiChip className="text-orange-500 text-lg" />
                                                            )}
                                                        </div>
                                                        <span className="text-white font-medium">{proj.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-gray-400">{proj.category}</td>
                                                <td className="px-5 py-3 text-gray-400 text-xs max-w-[200px] truncate">{proj.tech}</td>
                                                <td className="px-5 py-3">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEditProject(proj)}
                                                            className="p-2 glass rounded-lg text-gray-400 hover:text-orange-500 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <HiPencil size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProject(proj.id)}
                                                            className="p-2 glass rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <HiTrash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {projects.length === 0 && <div className="text-center py-10 text-gray-500">No projects added yet.</div>}
                            </div>
                        )}
                    </div>
                )}

                {/* Job Management Tab */}
                {tab === 'jobs' && (
                    <div className="glass rounded-2xl border border-orange-500/10 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <h2 className="font-display font-bold text-white text-base">Manage Job Postings ({jobs.length})</h2>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setShowJobForm(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <HiPlus /> Add New Job
                            </motion.button>
                        </div>
                        {showJobForm && (
                            <form onSubmit={handleJobSubmit} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Job Title</label>
                                        <input
                                            type="text"
                                            value={jobForm.title}
                                            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Department</label>
                                        <select
                                            value={jobForm.dept}
                                            onChange={(e) => setJobForm({ ...jobForm, dept: e.target.value })}
                                            className="w-full px-4 py-2 bg-dark-300 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            required
                                        >
                                            <option value="" className="bg-dark-300">Select Department</option>
                                            <option value="Engineering" className="bg-dark-300">Engineering</option>
                                            <option value="Design" className="bg-dark-300">Design</option>
                                            <option value="Marketing" className="bg-dark-300">Marketing</option>
                                            <option value="Sales" className="bg-dark-300">Sales</option>
                                            <option value="Product" className="bg-dark-300">Product</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Type</label>
                                        <select
                                            value={jobForm.type}
                                            onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                                            className="w-full px-4 py-2 bg-dark-300 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            required
                                        >
                                            <option value="Full-Time" className="bg-dark-300">Full-Time</option>
                                            <option value="Part-Time" className="bg-dark-300">Part-Time</option>
                                            <option value="Contract" className="bg-dark-300">Contract</option>
                                            <option value="Internship" className="bg-dark-300">Internship</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={jobForm.location}
                                            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Experience</label>
                                        <input
                                            type="text"
                                            value={jobForm.exp}
                                            onChange={(e) => setJobForm({ ...jobForm, exp: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            placeholder="e.g., 2-4 years"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm text-gray-400 mb-2">Skills (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={jobForm.skills}
                                        onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                        placeholder="React, Node.js, TypeScript, MongoDB"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                                    <textarea
                                        value={jobForm.description}
                                        onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        {editingJob ? 'Update Job' : 'Add Job'}
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setShowJobForm(false);
                                            setEditingJob(null);
                                            setJobForm({
                                                title: '',
                                                dept: '',
                                                type: 'Full-Time',
                                                location: '',
                                                exp: '',
                                                skills: '',
                                                description: '',
                                                posted: new Date().toISOString().split('T')[0]
                                            });
                                        }}
                                        className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </form>
                        )}

                        {/* Jobs List */}
                        {!showJobForm && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            {['Title', 'Department', 'Type', 'Location', 'Posted', 'Actions'].map((h) => (
                                                <th key={h} className="px-5 py-3 text-left text-xs text-gray-500 font-medium">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobs.map((job, i) => (
                                            <tr key={job.id} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                                                <td className="px-5 py-3 text-white font-medium">{job.title}</td>
                                                <td className="px-5 py-3 text-gray-400">{job.dept}</td>
                                                <td className="px-5 py-3 text-gray-400">{job.type}</td>
                                                <td className="px-5 py-3 text-gray-400">{job.location}</td>
                                                <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">{formatDate(job.posted)}</td>
                                                <td className="px-5 py-3">
                                                    <div className="flex gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => handleEditJob(job)}
                                                            className="p-1 text-orange-500 hover:text-orange-400 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <HiPencil />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => handleDeleteJob(job.id)}
                                                            className="p-1 text-red-500 hover:text-red-400 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <HiTrash />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Messages Tab */}
                {tab === 'messages' && (
                    <div className="glass rounded-2xl border border-orange-500/10 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5">
                            <h2 className="font-display font-bold text-white text-base">Contact Messages ({messages.length})</h2>
                        </div>
                        {messages.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">No messages yet.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            {['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date'].map((h) => (
                                                <th key={h} className="px-5 py-3 text-left text-xs text-gray-500 font-medium">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messages.map((m, i) => (
                                            <tr key={m.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                                                <td className="px-5 py-3.5 text-white font-medium">{m.name}</td>
                                                <td className="px-5 py-3.5 text-gray-400">{m.email}</td>
                                                <td className="px-5 py-3.5 text-gray-400">{m.phone || '–'}</td>
                                                <td className="px-5 py-3.5 text-gray-400 max-w-[150px] truncate">{m.subject}</td>
                                                <td className="px-5 py-3.5 text-gray-500 max-w-[200px] truncate">{m.message}</td>
                                                <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap">{formatDate(m.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Applications Tab */}
                {tab === 'applications' && (
                    <div className="glass rounded-2xl border border-orange-500/10 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5">
                            <h2 className="font-display font-bold text-white text-base">Job Applications ({applications.length})</h2>
                        </div>
                        {applications.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">No applications yet.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            {['S.No', 'Applicant', 'Position', 'Email', 'Phone', 'Resume', 'Applied On'].map((h) => (
                                                <th key={h} className="px-5 py-3 text-left text-xs text-gray-500 font-medium">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map((a, i) => (
                                            <tr key={a.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                                                <td className="px-5 py-3.5 text-gray-400 font-medium">#{i + 1}</td>
                                                <td className="px-5 py-3.5 text-white font-medium">{a.name}</td>
                                                <td className="px-5 py-3.5">
                                                    <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full">{a.position}</span>
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-400">{a.email}</td>
                                                <td className="px-5 py-3.5 text-gray-400">{a.phone || '–'}</td>
                                                <td className="px-5 py-3.5">
                                                    {a.resumeURL ? (
                                                        <a
                                                            href={a.resumeURL}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1.5 text-orange-500 hover:text-orange-400 transition-colors text-xs bg-orange-500/10 px-3 py-1.5 rounded-lg hover:bg-orange-500/20"
                                                        >
                                                            <HiDownload /> Download Resume
                                                        </a>
                                                    ) : <span className="text-gray-600 text-xs">Not uploaded</span>}
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap">{formatDate(a.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Testimonials Management Tab */}
                {tab === 'testimonials' && (
                    <div className="glass rounded-2xl border border-orange-500/10 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <h2 className="font-display font-bold text-white text-base">Manage Testimonials ({testimonials.length})</h2>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setShowTestimonialForm(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <HiPlus /> Add New Testimonial
                            </motion.button>
                        </div>
                        
                        {showTestimonialForm && (
                            <form onSubmit={handleTestimonialSubmit} className="p-6 space-y-4 border-b border-white/5">
                                <h3 className="font-display font-bold text-white text-lg mb-4">
                                    {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Client Name *</label>
                                        <input
                                            type="text"
                                            value={testimonialForm.name}
                                            onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Position *</label>
                                        <input
                                            type="text"
                                            value={testimonialForm.position}
                                            onChange={(e) => setTestimonialForm({ ...testimonialForm, position: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Rating *</label>
                                        <select
                                            value={testimonialForm.rating}
                                            onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                                            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            required
                                        >
                                            <option value={5} className="bg-[#1a1a2e] text-white">5 Stars</option>
                                            <option value={4} className="bg-[#1a1a2e] text-white">4 Stars</option>
                                            <option value={3} className="bg-[#1a1a2e] text-white">3 Stars</option>
                                            <option value={2} className="bg-[#1a1a2e] text-white">2 Stars</option>
                                            <option value={1} className="bg-[#1a1a2e] text-white">1 Star</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Testimonial *</label>
                                    <textarea
                                        value={testimonialForm.testimonial}
                                        onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white h-24 resize-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Status</label>
                                    <select
                                        value={testimonialForm.status}
                                        onChange={(e) => setTestimonialForm({ ...testimonialForm, status: e.target.value })}
                                        className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                    >
                                        <option value="active" className="bg-[#1a1a2e] text-white">Active</option>
                                        <option value="inactive" className="bg-[#1a1a2e] text-white">Inactive</option>
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        type="submit"
                                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        type="button"
                                        onClick={() => {
                                            setShowTestimonialForm(false);
                                            setEditingTestimonial(null);
                                            setTestimonialForm({
                                                name: '',
                                                position: '',
                                                rating: 5,
                                                testimonial: '',
                                                status: 'active'
                                            });
                                        }}
                                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </form>
                        )}

                        {testimonials.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">No testimonials yet. Click "Add New Testimonial" to get started.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="px-5 py-3 text-left text-xs text-gray-500 font-medium">Client</th>
                                            <th className="px-5 py-3 text-left text-xs text-gray-500 font-medium">Position</th>
                                            <th className="px-5 py-3 text-left text-xs text-gray-500 font-medium">Rating</th>
                                            <th className="px-5 py-3 text-left text-xs text-gray-500 font-medium">Status</th>
                                            <th className="px-5 py-3 text-left text-xs text-gray-500 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testimonials.map((testimonial, index) => (
                                            <tr key={testimonial.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${index % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                                            <HiUser className="text-white text-sm" />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{testimonial.name}</p>
                                                            <p className="text-gray-500 text-xs truncate max-w-xs">"{testimonial.testimonial.substring(0, 50)}..."</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-400">{testimonial.position}</td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <HiStar key={i} className={`text-sm ${i < testimonial.rating ? 'text-orange-400 fill-current' : 'text-gray-600'}`} />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <button
                                                        onClick={() => handleToggleTestimonialStatus(testimonial)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                                            testimonial.status === 'active' 
                                                                ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                                                                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                                        }`}
                                                    >
                                                        {testimonial.status === 'active' ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleEditTestimonial(testimonial)}
                                                            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <HiPencil />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                                                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <HiTrash />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Franchises Management Tab */}
                {tab === 'franchises' && (
                    <div className="glass rounded-2xl border border-orange-500/10 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <h2 className="font-display font-bold text-white text-base">Manage Franchises ({franchises.length})</h2>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setShowFranchiseForm(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <HiPlus /> Add New Franchise
                            </motion.button>
                        </div>
                        
                        {showFranchiseForm && (
                            <form onSubmit={handleFranchiseSubmit} className="p-6 space-y-4 border-b border-white/5">
                                <h3 className="font-display font-bold text-white text-lg mb-4">
                                    {editingFranchise ? 'Edit Franchise' : 'Add New Franchise'}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Franchise Name *</label>
                                        <input
                                            type="text"
                                            value={franchiseForm.name}
                                            onChange={(e) => setFranchiseForm({ ...franchiseForm, name: e.target.value })}
                                            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Location *</label>
                                        <input
                                            type="text"
                                            value={franchiseForm.location}
                                            onChange={(e) => setFranchiseForm({ ...franchiseForm, location: e.target.value })}
                                            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            value={franchiseForm.image}
                                            onChange={(e) => setFranchiseForm({ ...franchiseForm, image: e.target.value })}
                                            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            placeholder="/images/franchises/pune.jpg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Brochure PDF URL</label>
                                        <input
                                            type="text"
                                            value={franchiseForm.brochure}
                                            onChange={(e) => setFranchiseForm({ ...franchiseForm, brochure: e.target.value })}
                                            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            placeholder="/pdfs/franchises/pune-brochure.pdf"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Google Maps Link</label>
                                        <input
                                            type="text"
                                            value={franchiseForm.mapLink}
                                            onChange={(e) => setFranchiseForm({ ...franchiseForm, mapLink: e.target.value })}
                                            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            placeholder="https://maps.google.com/?q=Location"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Established Year</label>
                                        <input
                                            type="text"
                                            value={franchiseForm.established}
                                            onChange={(e) => setFranchiseForm({ ...franchiseForm, established: e.target.value })}
                                            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            placeholder="2022"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Team Size</label>
                                        <input
                                            type="text"
                                            value={franchiseForm.teamSize}
                                            onChange={(e) => setFranchiseForm({ ...franchiseForm, teamSize: e.target.value })}
                                            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                            placeholder="25+"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Status</label>
                                        <select
                                            value={franchiseForm.status}
                                            onChange={(e) => setFranchiseForm({ ...franchiseForm, status: e.target.value })}
                                            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                        >
                                            <option value="active" className="bg-[#1a1a2e] text-white">Active</option>
                                            <option value="inactive" className="bg-[#1a1a2e] text-white">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                                    <textarea
                                        value={franchiseForm.description}
                                        onChange={(e) => setFranchiseForm({ ...franchiseForm, description: e.target.value })}
                                        className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white h-24 resize-none focus:border-orange-500 focus:outline-none"
                                        placeholder="Describe the franchise..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Services (comma separated)</label>
                                    <input
                                        type="text"
                                        value={franchiseForm.services.join(', ')}
                                        onChange={(e) => setFranchiseForm({ ...franchiseForm, services: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                                        className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                        placeholder="Web Development, Mobile Apps, SaaS Solutions"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        type="submit"
                                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        {editingFranchise ? 'Update Franchise' : 'Add Franchise'}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        type="button"
                                        onClick={() => {
                                            setShowFranchiseForm(false);
                                            setEditingFranchise(null);
                                            setFranchiseForm({
                                                name: '',
                                                location: '',
                                                image: '',
                                                brochure: '',
                                                mapLink: '',
                                                description: '',
                                                established: '',
                                                teamSize: '',
                                                services: [''],
                                                status: 'active'
                                            });
                                        }}
                                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </form>
                        )}

                        {franchises.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">No franchises yet. Click "Add New Franchise" to get started.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="px-5 py-3 text-left text-xs text-gray-500 font-medium">Franchise</th>
                                            <th className="px-5 py-3 text-left text-xs text-gray-500 font-medium">Location</th>
                                            <th className="px-5 py-3 text-left text-xs text-gray-500 font-medium">Status</th>
                                            <th className="px-5 py-3 text-left text-xs text-gray-500 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {franchises.map((franchise, index) => (
                                            <tr key={franchise.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${index % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                                            <HiUser className="text-white text-sm" />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{franchise.name}</p>
                                                            {franchise.established && <p className="text-gray-500 text-xs">Since {franchise.established}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-400">{franchise.location}</td>
                                                <td className="px-5 py-3.5">
                                                    <button
                                                        onClick={() => handleToggleFranchiseStatus(franchise)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                                            franchise.status === 'active' 
                                                                ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                                                                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                                        }`}
                                                    >
                                                        {franchise.status === 'active' ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleEditFranchise(franchise)}
                                                            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <HiPencil />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleDeleteFranchise(franchise.id)}
                                                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <HiTrash />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
