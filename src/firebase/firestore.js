import { collection, addDoc, getDocs, serverTimestamp, orderBy, query, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './config';

export const submitContactForm = async (data) => {
    return await addDoc(collection(db, 'contactMessages'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'unread',
    });
};

export const submitJobApplication = async (data) => {
    return await addDoc(collection(db, 'jobApplications'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'pending',
    });
};

export const getContactMessages = async () => {
    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getJobApplications = async () => {
    const q = query(collection(db, 'jobApplications'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addJob = async (jobData) => {
    return await addDoc(collection(db, 'jobs'), {
        ...jobData,
        createdAt: serverTimestamp(),
    });
};

export const updateJob = async (jobId, jobData) => {
    const jobRef = doc(db, 'jobs', jobId);
    return await updateDoc(jobRef, jobData);
};

export const deleteJob = async (jobId) => {
    const jobRef = doc(db, 'jobs', jobId);
    return await deleteDoc(jobRef);
};

export const getJobs = async () => {
    const q = query(collection(db, 'jobs'), orderBy('posted', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const submitDemoRequest = async (data) => {
    return await addDoc(collection(db, 'demoRequests'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'pending',
    });
};

export const submitFutureApplication = async (data) => {
    return await addDoc(collection(db, 'futureApplications'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'pending',
    });
};

// --- Projects CRUD ---

export const getProjects = async () => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProject = async (projectId) => {
    const projectRef = doc(db, 'projects', projectId);
    const snap = await getDocs(query(collection(db, 'projects'))); // This is inefficient, let's use getDoc
    // Actually, getDoc is better
    const { getDoc } = await import('firebase/firestore'); 
    const docSnap = await getDoc(projectRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
};

export const addProject = async (projectData) => {
    return await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: serverTimestamp(),
    });
};

export const updateProject = async (projectId, projectData) => {
    const projectRef = doc(db, 'projects', projectId);
    return await updateDoc(projectRef, projectData);
};

export const deleteProject = async (projectId) => {
    const projectRef = doc(db, 'projects', projectId);
    return await deleteDoc(projectRef);
};
