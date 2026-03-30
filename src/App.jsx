import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import Loader from './components/layout/Loader';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Careers = lazy(() => import('./pages/Careers.jsx'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <header><Navbar /></header>}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          role="main"
          id="main-content"
        >
          <Suspense fallback={<div className="min-h-screen bg-[#0A0A0F]" aria-label="Loading content" />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio/:id" element={<ProjectDetails />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      {!isAdmin && <footer><Footer /></footer>}
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app" role="application" aria-label="Sandhya SoftTech Website">
          <ScrollProgress />
          <CustomCursor />
          <AnimatePresence mode="wait">
            {loading ? (
              <Loader key="loader" />
            ) : (
              <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <AnimatedRoutes />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
