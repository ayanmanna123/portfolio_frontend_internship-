const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fallback initial data in case the backend API is starting up or disconnected
export const FALLBACK_DATA = {
  about: {
    name: 'Ayan Manna',
    title: 'Full-Stack Engineer & CMS Architect',
    bio: 'I build high-performance web applications that drive business growth. Specializing in React, Node.js, and scalable architecture for startups and enterprises.',
    location: 'Kolkata, West Bengal, India',
    email: 'mannaayan777@gmail.com',
    phone: '9907072795',
    avatarUrl: '/profile-logo.jpeg',
    resumeUrl: '/uploads/ayan-manna.pdf',
    socialLinks: {
      github: 'https://github.com/ayanmanna123',
      linkedin: 'https://www.linkedin.com/in/ayan-manna-4a67ab34a/',
      twitter: 'https://x.com/@AyanMan13756317',
      instagram: 'https://www.instagram.com/ayan.manna.90834',
      website: 'https://www.youtube.com/@ayanmanna1007'
    },
    stats: [
      { label: 'Hackathons', value: '7+' },
      { label: 'Projects', value: '14+' },
      { label: 'Freelancing', value: '1+' },
      { label: 'Internships', value: '1+' }
    ],
    highlights: [
      'Designed & built custom CMS architecture from scratch',
      'Full-stack React, Next.js, Node.js & Express developer',
      'Focus on performance, SEO, animations, and visual polish',
      '15+ scalable web apps delivered with clean architecture'
    ]
  },
  skills: [
    { _id: '1', name: 'React', category: 'Frontend', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', isFeatured: true, order: 1 },
    { _id: '2', name: 'Next.js', category: 'Frontend', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', isFeatured: true, order: 2 },
    { _id: '3', name: 'JavaScript', category: 'Frontend', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', isFeatured: true, order: 3 },
    { _id: '4', name: 'Tailwind CSS', category: 'Frontend', level: 90, icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', isFeatured: true, order: 4 },
    { _id: '5', name: 'Node.js', category: 'Backend', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', isFeatured: true, order: 5 },
    { _id: '6', name: 'Express', category: 'Backend', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', isFeatured: true, order: 6 },
    { _id: '7', name: 'MongoDB', category: 'Database', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', isFeatured: true, order: 7 },
    { _id: '8', name: 'Python', category: 'Backend', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', isFeatured: true, order: 8 },
    { _id: '9', name: 'Docker', category: 'DevOps & Tools', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', isFeatured: false, order: 9 },
    { _id: '10', name: 'Git & GitHub', category: 'DevOps & Tools', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', isFeatured: false, order: 10 }
  ],
  projects: [
    {
      _id: 'p1',
      title: 'Where Is My Bus',
      slug: 'where-is-my-bus',
      tagline: 'Live Bus Location Tracking • Smart Route Planning',
      description: 'Real-time bus tracking and smart public transport platform with live location tracking, route planning, and secure booking system.',
      category: 'Full Stack',
      thumbnail: '/projects/project9.png',
      tags: ['MERN Stack', 'Real-Time Tracking', 'Google Maps API', 'Socket.io', 'Razorpay Payments', 'JWT Auth'],
      githubUrl: 'https://github.com/ayanmanna123/GPS_Tracker',
      liveUrl: 'https://gps-tracker-umber.vercel.app/',
      featured: true,
      order: 1
    },
    {
      _id: 'p2',
      title: 'CollabLearn',
      slug: 'collablearn',
      tagline: 'Smart Mentor Discovery • Real-Time Chat & Video Sessions',
      description: 'A full-stack mentorship and collaborative learning platform enabling students to connect with mentors through real-time chat, video sessions, task management, and progress tracking.',
      category: 'Full Stack',
      thumbnail: '/projects/project10.jpeg',
      tags: ['MERN Stack', 'Real-Time Chat', 'Video Conferencing', 'EdTech SaaS', 'JWT Auth', 'Razorpay', 'Socket.io'],
      githubUrl: 'https://github.com/ayanmanna123/CollabLearn',
      liveUrl: 'https://collab-learn-ruby.vercel.app/',
      featured: true,
      order: 2
    },
    {
      _id: 'p3',
      title: 'JobFlux',
      slug: 'jobflux',
      tagline: 'Professional Profile System • Job Posting & Applications',
      description: 'A full-stack professional networking and job portal platform enabling users to build professional profiles, connect with others, apply for jobs, and communicate in real time.',
      category: 'Full Stack',
      thumbnail: '/projects/project11.png',
      tags: ['MERN Stack', 'Professional Networking', 'Job Portal', 'Real-Time Chat', 'JWT Auth', 'Cloud Media'],
      githubUrl: 'https://github.com/ayanmanna123/Jobflux_FullStack',
      liveUrl: 'https://jobflux-full-stack-8sja.vercel.app/',
      featured: true,
      order: 3
    },
    {
      _id: 'p4',
      title: 'Live Canvas',
      slug: 'live-canvas',
      tagline: 'Real-Time Collaborative Drawing • Integrated Video Calls',
      description: 'A real-time collaborative workspace designed for shared drawing canvases, integrated video calls, synchronized watch parties, and AI image generation.',
      category: 'Frontend',
      thumbnail: '/projects/project12.png',
      tags: ['MERN Stack', 'Socket.io', 'WebRTC', 'Generative AI', 'Real-Time Collaboration'],
      githubUrl: 'https://github.com/ayanmanna123/Live_canvas-',
      liveUrl: 'https://live-canvas-phxf.vercel.app/',
      featured: true,
      order: 4
    },
    {
      _id: 'p5',
      title: 'BPPIMT Quiz',
      slug: 'bppimt-quiz',
      tagline: 'User Authentication • Dynamic Quiz Generation',
      description: 'An interactive quiz platform developed for B.P. Poddar Institute of Management and Technology, facilitating engaging quizzes for students with real-time scoring.',
      category: 'Full Stack',
      thumbnail: '/projects/project8.png',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel', 'Educational'],
      githubUrl: 'https://github.com/ayanmanna123/bppimt_quiz',
      liveUrl: 'https://bppimt-quiz.vercel.app',
      featured: true,
      order: 5
    },
    {
      _id: 'p6',
      title: 'Off-Road Semantic Segmentation',
      slug: 'off-road-semantic-segmentation',
      tagline: 'DeepLabV3+ with EfficientNet-B3 • Real-time Inference',
      description: 'A deep learning pipeline leveraging DINOv2 and DeepLabV3+ with an EfficientNet-B3 backbone for semantic scene segmentation in unstructured off-road environments.',
      category: 'Artificial Intelligence',
      thumbnail: '/projects/project2.jpg',
      tags: ['PyTorch', 'DeepLabV3+', 'DINOv2', 'Computer Vision', 'OpenCV'],
      githubUrl: 'https://github.com/ayanmanna123/Duality-AI-s-Offroad-Semantic-Scene-Segmentation',
      liveUrl: '',
      featured: true,
      order: 6
    }
  ],
  services: [
    {
      _id: 's1',
      title: 'Full Stack Web Development',
      icon: 'code',
      description: 'End-to-end custom web applications built with Next.js, Node.js, Express, MongoDB, and modern reactive libraries.',
      features: ['Full Stack Architecture', 'REST & Real-time APIs', 'Responsive High-Performance UI', 'Database Modeling'],
      priceRange: 'Custom Quote',
      isFeatured: true,
      order: 1
    },
    {
      _id: 's2',
      title: 'Custom CMS Architecture',
      icon: 'layout',
      description: 'Bespoke admin dashboards, headless content management backends, and decoupled APIs tailored to custom workflows.',
      features: ['JWT Authentication', 'Media Upload & Cloud Storage', 'Flexible Schemas', 'No vendor lock-in'],
      priceRange: 'Custom Quote',
      isFeatured: true,
      order: 2
    },
    {
      _id: 's3',
      title: 'Real-Time & AI Systems',
      icon: 'zap',
      description: 'Integrating Socket.io real-time streaming, WebRTC audio/video sessions, and generative AI features into web apps.',
      features: ['Socket.io Live Sync', 'WebRTC Video Conferencing', 'AI LLM / Vision Integration', 'Low Latency Infrastructure'],
      priceRange: 'Custom Quote',
      isFeatured: true,
      order: 3
    }
  ],
  experiences: [
    {
      _id: 'e1',
      title: 'Hackathon Participant & Competitive Coder',
      company: 'TechStorm | PLUTUS | Code@Frost',
      location: 'Kolkata, India',
      type: 'freelance',
      startDate: '2025',
      endDate: 'Present',
      current: true,
      description: [
        'Active participant in national-level hackathons and coding competitions. Secured positions in various tech fests like TechStorm and PLUTUS.'
      ],
      skillsUsed: ['Problem Solving', 'Rapid Prototyping', 'Team Collaboration'],
      order: 1
    },
    {
      _id: 'e2',
      title: 'Full Stack Developer',
      company: 'Personal & Client Projects',
      location: 'Kolkata, India',
      type: 'full-time',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      description: [
        "Designed and developed scalability-focused web applications including 'Where Is My Bus', 'CollabLearn', and 'JobFlux'."
      ],
      skillsUsed: ['MERN Stack', 'System Design', 'Real-time Architecture'],
      order: 2
    },
    {
      _id: 'e3',
      title: 'Engineering Student (B.Tech)',
      company: 'B.P. Poddar Institute of Management and Technology',
      location: 'Kolkata, India',
      type: 'internship',
      startDate: '2023',
      endDate: '2027',
      current: true,
      description: [
        'B.Tech in Electrical Engineering with intensive focus on Data Structures, Algorithms, C/C++, Java, and modern Web Technologies.'
      ],
      skillsUsed: ['Data Structures', 'Algorithms', 'C/C++', 'Java'],
      order: 3
    }
  ],
  testimonials: [
    {
      _id: 't1',
      clientName: 'Alex Johnson',
      position: 'Product Director',
      company: 'TechCorp',
      quote: "Working with Ayan Manna was seamless from day one. Not only did they deliver a full-stack solution ahead of schedule, but they also communicated clearly throughout the project. It's rare to find a developer who understands both the tech and the business side so well.",
      rating: 5,
      avatar: '/testimonials/alex-johnson.png',
      order: 1
    },
    {
      _id: 't2',
      clientName: 'Maria Chen',
      position: 'Senior UX Designer',
      company: 'DesignHub',
      quote: "I've reviewed hundreds of portfolios, and his work is truly exceptional. The way the animations guide attention while maintaining performance is masterful. The gradient elements add depth without overwhelming.",
      rating: 5,
      avatar: '/testimonials/maria-chen.png',
      order: 2
    },
    {
      _id: 't3',
      clientName: 'David Wilson',
      position: 'CTO',
      company: 'Startup Ventures',
      quote: 'From wireframes to deployment, Ayan Manna owned the entire stack with confidence and creativity. The final product is fast, reliable, and looks incredible. I wouldn\'t hesitate to work with them again.',
      rating: 5,
      avatar: '/testimonials/David Wilson.png',
      order: 3
    }
  ],
  blogs: [
    {
      _id: 'b1',
      title: 'Building Scalable Real-Time Applications with MERN and Socket.io',
      slug: 'building-scalable-real-time-applications-mern-socketio',
      excerpt: 'How we engineered Where Is My Bus and CollabLearn to achieve sub-100ms real-time event streaming and map synchronization.',
      content: `Real-time web applications require low-latency architecture, persistent bidirectional WebSocket connections, and clean state synchronization across client nodes.\n\nIn this article, we dive into how Socket.io, Redis adapter, and React 19 hooks combine to power GPS tracking and collaborative canvas editing seamlessly.`,
      tags: ['React', 'Node.js', 'Socket.io', 'MERN'],
      status: 'published',
      views: 284,
      publishedAt: new Date().toISOString()
    }
  ]
};

// Generic fetch wrapper with timeout & error safety
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[API Warning] Request to ${endpoint} failed (${err.message}). Using fallback data if available.`);
    throw err;
  }
}

// API methods
export const api = {
  getAbout: async () => {
    try {
      const res = await apiRequest('/about');
      return res.data || FALLBACK_DATA.about;
    } catch {
      return FALLBACK_DATA.about;
    }
  },

  getSkills: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/skills?${query}` : '/skills';
    try {
      const res = await apiRequest(endpoint);
      return res.data || FALLBACK_DATA.skills;
    } catch {
      return FALLBACK_DATA.skills;
    }
  },

  getProjects: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/projects?${query}` : '/projects';
    try {
      const res = await apiRequest(endpoint);
      return res.data || FALLBACK_DATA.projects;
    } catch {
      return FALLBACK_DATA.projects;
    }
  },

  getBlogs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/blogs?${query}` : '/blogs';
    try {
      const res = await apiRequest(endpoint);
      return res.data || FALLBACK_DATA.blogs;
    } catch {
      return FALLBACK_DATA.blogs;
    }
  },

  getBlog: async (slugOrId) => {
    try {
      const res = await apiRequest(`/blogs/${slugOrId}`);
      return res.data || null;
    } catch {
      const fallback = FALLBACK_DATA.blogs.find(
        (b) => b.slug === slugOrId || b._id === slugOrId
      );
      return fallback || null;
    }
  },

  getExperiences: async () => {
    try {
      const res = await apiRequest('/experience');
      return res.data || FALLBACK_DATA.experiences;
    } catch {
      return FALLBACK_DATA.experiences;
    }
  },

  getTestimonials: async () => {
    try {
      const res = await apiRequest('/testimonials');
      return res.data || FALLBACK_DATA.testimonials;
    } catch {
      return FALLBACK_DATA.testimonials;
    }
  },

  getServices: async () => {
    try {
      const res = await apiRequest('/services');
      return res.data || FALLBACK_DATA.services;
    } catch {
      return FALLBACK_DATA.services;
    }
  },

  sendMessage: async (messageData) => {
    return await apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(messageData)
    });
  }
};
