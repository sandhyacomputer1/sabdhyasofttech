// Sample franchise data for Sandhya SoftTech
export const sampleFranchises = [
    {
        id: '1',
        name: 'Sandhya SoftTech Pune',
        location: 'Pune, Maharashtra',
        image: '/images/franchises/pune-office.jpg',
        brochure: '/pdfs/franchises/pune-brochure.pdf',
        mapLink: 'https://maps.google.com/?q=Sandhya+SoftTech+Pune+Maharashtra',
        status: 'active',
        description: 'Our flagship Pune office serves as the headquarters for Maharashtra operations, specializing in enterprise software development and fintech solutions. This strategic location houses our largest development team and serves as an innovation hub for emerging technologies.',
        established: '2022',
        teamSize: '45+',
        services: [
            'Enterprise Software Development',
            'Fintech Solutions',
            'Cloud Migration',
            'API Development',
            'Mobile Applications'
        ],
        contact: {
            phone: '+91 20 1234 5678',
            email: 'pune@sandhyasofttech.com',
            address: 'Koregaon Park, Pune, Maharashtra 411001'
        }
    },
    {
        id: '2',
        name: 'Sandhya SoftTech Mumbai',
        location: 'Mumbai, Maharashtra',
        image: '/images/franchises/mumbai-office.jpg',
        brochure: '/pdfs/franchises/mumbai-brochure.pdf',
        mapLink: 'https://maps.google.com/?q=Sandhya+SoftTech+Mumbai+Maharashtra',
        status: 'active',
        description: 'Strategically located in Mumbai\'s business district, our Mumbai office focuses on serving enterprise clients in the financial services and banking sectors. This location acts as our client relationship hub for western India.',
        established: '2023',
        teamSize: '35+',
        services: [
            'Banking Software Solutions',
            'Financial Technology',
            'Blockchain Development',
            'Data Analytics',
            'Cybersecurity'
        ],
        contact: {
            phone: '+91 22 1234 5678',
            email: 'mumbai@sandhyasofttech.com',
            address: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051'
        }
    },
    {
        id: '3',
        name: 'Sandhya SoftTech Bangalore',
        location: 'Bangalore, Karnataka',
        image: '/images/franchises/bangalore-office.jpg',
        brochure: '/pdfs/franchises/bangalore-brochure.pdf',
        mapLink: 'https://maps.google.com/?q=Sandhya+SoftTech+Bangalore+Karnataka',
        status: 'active',
        description: 'Our Bangalore innovation center is at the heart of India\'s tech ecosystem, focusing on AI/ML, product development, and startup solutions. This location drives our research and development initiatives.',
        established: '2023',
        teamSize: '50+',
        services: [
            'AI & Machine Learning',
            'Product Development',
            'Startup Solutions',
            'IoT Development',
            'DevOps Consulting'
        ],
        contact: {
            phone: '+91 80 1234 5678',
            email: 'bangalore@sandhyasofttech.com',
            address: 'HSR Layout, Bangalore, Karnataka 560102'
        }
    },
    {
        id: '4',
        name: 'Sandhya SoftTech Hyderabad',
        location: 'Hyderabad, Telangana',
        image: '/images/franchises/hyderabad-office.jpg',
        brochure: '/pdfs/franchises/hyderabad-brochure.pdf',
        mapLink: 'https://maps.google.com/?q=Sandhya+SoftTech+Hyderabad+Telangana',
        status: 'active',
        description: 'The Hyderabad office serves as our gateway to South India, specializing in SaaS product development and enterprise solutions. This location has quickly become a key center for product innovation.',
        established: '2024',
        teamSize: '25+',
        services: [
            'SaaS Development',
            'Enterprise Solutions',
            'Product Engineering',
            'Quality Assurance',
            'Technical Support'
        ],
        contact: {
            phone: '+91 40 1234 5678',
            email: 'hyderabad@sandhyasofttech.com',
            address: 'Hitech City, Hyderabad, Telangana 500081'
        }
    },
    {
        id: '5',
        name: 'Sandhya SoftTech Chennai',
        location: 'Chennai, Tamil Nadu',
        image: '/images/franchises/chennai-office.jpg',
        brochure: '/pdfs/franchises/chennai-brochure.pdf',
        mapLink: 'https://maps.google.com/?q=Sandhya+SoftTech+Chennai+Tamil+Nadu',
        status: 'active',
        description: 'Our Chennai office focuses on serving the manufacturing and automotive sectors with custom software solutions. This strategic location provides access to South India\'s industrial belt.',
        established: '2024',
        teamSize: '20+',
        services: [
            'Manufacturing Software',
            'Automotive Solutions',
            'ERP Systems',
            'Supply Chain Management',
            'Industrial IoT'
        ],
        contact: {
            phone: '+91 44 1234 5678',
            email: 'chennai@sandhyasofttech.com',
            address: 'T Nagar, Chennai, Tamil Nadu 600017'
        }
    },
    {
        id: '6',
        name: 'Sandhya SoftTech Delhi',
        location: 'Delhi NCR',
        image: '/images/franchises/delhi-office.jpg',
        brochure: '/pdfs/franchises/delhi-brochure.pdf',
        mapLink: 'https://maps.google.com/?q=Sandhya+SoftTech+Delhi+NCR',
        status: 'active',
        description: 'The Delhi NCR office serves as our northern hub, focusing on government projects and enterprise clients in the capital region. This location handles our largest enterprise accounts.',
        established: '2024',
        teamSize: '30+',
        services: [
            'Government Solutions',
            'Enterprise Architecture',
            'Digital Transformation',
            'Cloud Services',
            'IT Consulting'
        ],
        contact: {
            phone: '+91 11 1234 5678',
            email: 'delhi@sandhyasofttech.com',
            address: 'Connaught Place, New Delhi 110001'
        }
    }
];

// Franchise categories for filtering
export const franchiseCategories = [
    { id: 'all', name: 'All Locations', icon: '🌍' },
    { id: 'headquarters', name: 'Headquarters', icon: '🏢' },
    { id: 'innovation', name: 'Innovation Centers', icon: '💡' },
    { id: 'regional', name: 'Regional Offices', icon: '📍' }
];

// Franchise status options
export const franchiseStatus = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'inactive', label: 'Inactive', color: 'red' },
    { value: 'coming-soon', label: 'Coming Soon', color: 'yellow' }
];
