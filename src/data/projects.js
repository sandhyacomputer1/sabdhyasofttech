export const categories = ['All', 'Web App', 'Mobile', 'SaaS', 'Enterprise'];

export const projects = [
    { 
        id: 1, 
        title: 'Hospital Management System', 
        category: 'Enterprise', 
        tech: 'React, Node.js, MongoDB', 
        color: 'from-blue-600/30 to-purple-600/30',
        description: 'A comprehensive, cloud-based platform designed to manage all hospital operations. From patient registration and electronic health records to billing and pharmacy management, this system streamlines clinical workflows and improves operational efficiency.',
        keyFeatures: [
            'Electronic Health Records (EHR) integration',
            'Automated billing and insurance processing',
            'Real-time bed availability tracking',
            'Telemedicine and video consultation module',
            'Actionable analytics dashboard for hospital administrators'
        ],
        keyPoints: [
            { label: 'Efficiency Increased', value: '45%' },
            { label: 'Daily Users', value: '10,000+' },
            { label: 'Zero Downtime', value: '99.99%' },
        ]
    },
    { 
        id: 2, 
        title: 'E-Commerce Platform', 
        category: 'Web App', 
        tech: 'Next.js, Stripe, PostgreSQL', 
        color: 'from-green-600/30 to-emerald-600/30',
        description: 'A high-performance, scalable e-commerce solution architected for large enterprise retailers. It features lightning-fast page loads for better SEO, seamless third-party payment integrations, and a robust inventory management system.',
        keyFeatures: [
            'Server-side rendering (SSR) for optimal SEO',
            'Multi-currency and multi-language support',
            'Advanced inventory synchronization',
            'Secure checkout with Stripe and PayPal',
            'AI-powered product recommendations'
        ],
        keyPoints: [
            { label: 'Sales Growth', value: '300%' },
            { label: 'Avg Load Time', value: '< 1.2s' },
            { label: 'Active Sellers', value: '1,500+' },
        ]
    },
    { 
        id: 3, 
        title: 'Inventory SaaS', 
        category: 'SaaS', 
        tech: 'React, Firebase, Tailwind', 
        color: 'from-orange-600/30 to-red-600/30',
        description: 'A modern, real-time inventory tracking application built for global supply chains. It offers warehouse managers complete visibility over their stock, with automated low-stock alerts and integrated barcode scanning capabilities.',
        keyFeatures: [
            'Real-time stock level synchronization across warehouses',
            'Barcode and QR code generation/scanning',
            'Customizable low-stock alerts via Email & SMS',
            'Rich data visualization and exportable reports',
            'Role-based access control (RBAC)'
        ],
        keyPoints: [
            { label: 'Accuracy', value: '99.9%' },
            { label: 'Warehouses', value: '75+' },
            { label: 'Saved Hours/Wk', value: '40+' },
        ]
    },
    { 
        id: 4, 
        title: 'Delivery Tracking App', 
        category: 'Mobile', 
        tech: 'React Native, Maps API', 
        color: 'from-cyan-600/30 to-blue-600/30',
        description: 'An intuitive mobile application connecting delivery drivers with customers. Featuring real-time GPS tracking, optimized route planning, and seamless push notifications, ensuring packages arrive on time, every time.',
        keyFeatures: [
            'Live GPS location sharing with estimated time of arrival (ETA)',
            'Algorithmic route optimization to save fuel and time',
            'In-app chat and call masking for driver-customer privacy',
            'Proof of delivery via signature and photo capture',
            'Dark mode and accessible UI design'
        ],
        keyPoints: [
            { label: 'Deliveries/Day', value: '50K+' },
            { label: 'Driver Rating', value: '4.8/5' },
            { label: 'Platform', value: 'iOS & Android' },
        ]
    },
    { 
        id: 5, 
        title: 'HR Management Portal', 
        category: 'Enterprise', 
        tech: 'Angular, .NET, SQL Server', 
        color: 'from-pink-600/30 to-rose-600/30',
        description: 'An end-to-end human resources system engineered for large corporate organizations. It digitizes the entire employee lifecycle—from recruitment and onboarding to payroll, performance reviews, and offboarding.',
        keyFeatures: [
            'Automated payroll calculation and direct deposit integration',
            'Comprehensive leave management and approval workflows',
            'Self-service employee portal (payslips, tax docs, company news)',
            'Performance evaluation and goal tracking modules',
            'Custom analytics on employee turnover and satisfaction'
        ],
        keyPoints: [
            { label: 'Employees Managed', value: '50,000+' },
            { label: 'Payroll Errors', value: '0%' },
            { label: 'Onboarding Speed', value: '3x Faster' },
        ]
    },
    { 
        id: 6, 
        title: 'EdTech Learning Platform', 
        category: 'SaaS', 
        tech: 'Vue.js, Python, AWS', 
        color: 'from-yellow-600/30 to-orange-600/30',
        description: 'An interactive, remote learning environment built to scale globally. The platform features live video classes, interactive whiteboards, and an AI-driven progress tracking system to personalize education for every student.',
        keyFeatures: [
            'Live streaming with ultra-low latency via AWS IVS',
            'Interactive assignments, quizzes, and automated grading',
            'AI-tailored learning paths based on student performance',
            'Discussion forums and peer-to-peer engagement tools',
            'Parental dashboards for progress monitoring'
        ],
        keyPoints: [
            { label: 'Active Students', value: '2M+' },
            { label: 'Course Completion', value: '85%' },
            { label: 'Global Reach', value: '30+ Countries' },
        ]
    },
];
