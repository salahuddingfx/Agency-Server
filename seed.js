/**
 * Nextora Studio — Full Database Seeder
 * Run:  node seed.js
 *
 * Seeds all collections from the frontend mockData so the API returns real data.
 */

import mongoose from 'mongoose';
import env from './config/env.config.js';
import Service from './models/service.model.js';
import Portfolio from './models/portfolio.model.js';
import CaseStudy from './models/caseStudy.model.js';
import Blog from './models/blog.model.js';
import Team from './models/team.model.js';
import Technology from './models/technology.model.js';
import Testimonial from './models/testimonial.model.js';
import Career from './models/career.model.js';

const MONGO_URI = env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found. Add it to server/.env');
  process.exit(1);
}

/* ─── Data ─────────────────────────────────────────────────────────── */

const services = [
  {
    title: 'Web Development',
    category: 'Web Development',
    metric: '99.9% Uptime SLA',
    status: 'Published',
    shortDesc: 'Stunning, high-performance web applications built with modern frameworks.',
    longDesc: 'We build fast, secure, and search-optimized web experiences designed to engage users and scale effortlessly. From corporate landing pages to complex web-based products, our code is written to the highest standards.',
  },
  {
    title: 'Mobile App Development',
    category: 'Mobile App Development',
    metric: '4.8+ Avg App Store Rating',
    status: 'Published',
    shortDesc: 'Native and cross-platform mobile apps with frictionless user journeys.',
    longDesc: 'Reach your audience on iOS and Android with elegant, feature-rich mobile applications. We use React Native and Flutter to deliver near-native performance while optimizing development cost and time-to-market.',
  },
  {
    title: 'Custom Software Development',
    category: 'Custom Software Development',
    metric: '100% Tailored Workflows',
    status: 'Published',
    shortDesc: 'Bespoke software solutions tailored to solve complex business problems.',
    longDesc: 'When off-the-shelf software falls short, we design custom systems that align with your exact workflows. We build robust microservices, robust APIs, and automate legacy operations to increase efficiency.',
  },
  {
    title: 'Point of Sale (POS) Systems',
    category: 'POS Solutions',
    metric: '10x Faster Checkouts',
    status: 'Published',
    shortDesc: 'Modern cloud POS software that streamlines retail and restaurant operations.',
    longDesc: 'Empower your storefront or restaurant with a sleek, cloud-connected POS system. Features real-time stock synchronization, multi-terminal support, offline caching, and direct hardware integrations.',
  },
  {
    title: 'ERP & CRM Systems',
    category: 'ERP & CRM Systems',
    metric: '40% Increase in Operational Speed',
    status: 'Published',
    shortDesc: 'Unified platforms to manage enterprise resources and customer relationships.',
    longDesc: 'Centralize your customer profiles, pipeline tracking, inventory control, and financial planning. We build and customize CRM and ERP systems that break down departmental silos.',
  },
  {
    title: 'UI/UX Design',
    category: 'UI/UX Design',
    metric: '99% Positive User Usability Score',
    status: 'Published',
    shortDesc: 'Figma-to-code design systems focusing on aesthetics and user psychology.',
    longDesc: 'Design is not just how it looks; it is how it works. We construct modular design systems, clickable prototypes, and run comprehensive usability tests.',
  },
  {
    title: 'SEO & Digital Marketing',
    category: 'SEO & Digital Marketing',
    metric: '+310% Avg Organic Traffic Increase',
    status: 'Published',
    shortDesc: 'Data-driven campaigns that boost rankings and maximize inbound leads.',
    longDesc: 'Rank higher where your customers search. We do deep technical SEO audits, keyword research, content marketing, and structured metadata implementations.',
  },
  {
    title: 'Graphics Design',
    category: 'Graphics Design',
    metric: '200+ Brands Designed',
    status: 'Published',
    shortDesc: 'Brand identities, visual assets, and creative designs that make businesses stand out.',
    longDesc: 'From logo design and brand guidelines to marketing collateral and social media creatives, we craft visually compelling graphics that communicate your brand story.',
  },
  {
    title: 'AI & Machine Learning',
    category: 'AI & Machine Learning',
    metric: '95%+ Model Accuracy',
    status: 'Published',
    shortDesc: 'Intelligent automation, predictive analytics, and custom AI solutions for modern businesses.',
    longDesc: 'Harness the power of artificial intelligence to automate workflows, predict trends, and unlock insights hidden in your data.',
  },
];

const portfolios = [
  {
    title: 'CoxIan TechForce',
    category: 'Web Development',
    client: 'CoxIan TechForce',
    description: 'Developer community, technical workshop index, and open-source collaboration hub tailored for tech students and enthusiasts in Cox\'s Bazar.',
    imageColor: 'from-purple-600 to-indigo-600',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651767/nextora/screenshots/techforge_desktop.png',
    featured: true,
  },
  {
    title: 'StudyFlow',
    category: 'Web Development',
    client: 'StudyFlow Inc.',
    description: 'A full-stack productivity and study-management application designed to help self-learners track progress, use Pomodoro timers, and build consistent study habits.',
    imageColor: 'from-blue-600 to-cyan-500',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651711/nextora/screenshots/studyflow_desktop.png',
    featured: true,
  },
  {
    title: 'NoteSphere',
    category: 'Web Development',
    client: 'NoteSphere App',
    description: 'A high-performance Academic Intelligence platform and note-sharing system designed for student resource indexing, search optimization, and academic collaboration.',
    imageColor: 'from-purple-600 to-blue-500',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651605/nextora/screenshots/notespher_desktop.png',
    featured: true,
  },
  {
    title: 'Acharu',
    category: 'Web Development',
    client: 'Acharu Specialty Foods',
    description: 'Premium e-commerce platform for Cox\'s Bazar specialty foods - chocolate, achar, nuts, and authentic Burmese items.',
    imageColor: 'from-yellow-500 to-amber-600',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651576/nextora/screenshots/acharu_desktop.png',
    featured: true,
  },
  {
    title: 'Taja Shutki',
    category: 'Web Development',
    client: 'Taja Shutki Co.',
    description: 'Seafood distribution and premium dry-fish e-commerce marketplace connecting local fishermen of Cox\'s Bazar directly with consumers.',
    imageColor: 'from-emerald-500 to-teal-600',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651742/nextora/screenshots/tajashutki_desktop.png',
    featured: true,
  },
  {
    title: 'DPIAN Alumni',
    category: 'Web Development',
    client: 'DPIAN Association',
    description: 'Official alumni connectivity portal and student network hub built for Cox\'s Bazar Model Polytechnic Institute graduates.',
    imageColor: 'from-sky-500 to-indigo-600',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651589/nextora/screenshots/alumni_desktop.png',
    featured: true,
  },
  {
    title: 'Sirat Boutique',
    category: 'Web Development',
    client: 'Sirat Modest Fashion',
    description: 'High-fidelity modest fashion e-commerce storefront with complex filtration pipelines, live order status updates, and a responsive shopping ecosystem.',
    imageColor: 'from-violet-600 to-fuchsia-600',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651647/nextora/screenshots/sirat_desktop.png',
    featured: false,
  },
  {
    title: 'Steam-X Pro',
    category: 'Web Development',
    client: 'Steam-X Inc.',
    description: 'Cinematic media streaming and information platform integrated with TMDB API, featuring dynamic category rows, video preview popups, and user watchlist curation.',
    imageColor: 'from-red-600 to-orange-500',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651688/nextora/screenshots/steam_x_desktop.png',
    featured: false,
  },
  {
    title: 'CMPI Portal',
    category: 'Web Development',
    client: 'Cox\'s Bazar Model Polytechnic Institute',
    description: 'Comprehensive student results verification and academic dashboard system designed for Cox\'s Bazar Model Polytechnic Institute.',
    imageColor: 'from-blue-600 to-violet-600',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651595/nextora/screenshots/cmpi_desktop.png',
    featured: false,
  },
  {
    title: 'English StepUp',
    category: 'Web Development',
    client: 'StepUp ESL',
    description: 'Interactive language learning platform offering step-by-step progress tracking, interactive quizzes, and speech training resources.',
    imageColor: 'from-emerald-600 to-green-500',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651598/nextora/screenshots/english_stepup_desktop.png',
    featured: false,
  },
  {
    title: 'Engr. Alam Ashik',
    category: 'Web Development',
    client: 'Engr. Alam Ashik Portfolio',
    description: 'Premium portfolio and professional consultancy website designed for a structural engineering professional, featuring elegant 3D animations.',
    imageColor: 'from-gray-700 to-slate-800',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651601/nextora/screenshots/engralamashik_desktop.png',
    featured: false,
  },
  {
    title: 'RongRani',
    category: 'Web Development',
    client: 'RongRani Clothing',
    description: 'A luxury boutique e-commerce application focusing on traditional clothing, featuring real-time inventory management and seamless payment integrations.',
    imageColor: 'from-pink-500 to-rose-600',
    imageUrl: 'https://res.cloudinary.com/dpezmbted/image/upload/v1782651620/nextora/screenshots/rongrani_desktop.png',
    featured: false,
  }
];

const caseStudies = [
  {
    title: 'Re-Architecting Apex E-Commerce for Global Scale',
    client: 'Apex Retail International',
    status: 'Published',
    problem: 'Apex faced high server costs, rigid layout customization templates, and slow load times (5.6 seconds page load average) that led to high bounce rates during peak Black Friday traffic.',
    solution: 'We built a decoupled headless architecture using React, Vite, and Tailwind CSS on the frontend. The backend was refactored into Node.js microservices hosted on autoscaling cloud servers with TanStack Query managing client state.',
    result: 'Average page loading times plummeted from 5.6s to 0.8s, resulting in a 42% lift in conversion rate. Infrastructure cost was reduced by 60%.',
  },
  {
    title: 'Velo Logistics: Optimizing Route Efficiency by 24%',
    client: 'Velo Delivery Inc.',
    status: 'Published',
    problem: 'Drivers frequently lost cellular coverage in rural areas, leading to data loss, outdated package statuses, and poorly synchronized delivery routes.',
    solution: 'We engineered a React Native mobile application that utilizes a local SQLite database cache for offline capability. Package actions sync automatically with the server when network signals restore.',
    result: 'Drivers completed deliveries 24% faster on average. The client experienced zero package logging data losses, and the driver onboarding training time dropped from days to a few minutes.',
  },
];

const blogs = [
  {
    title: 'Why Headless React Frontends are Dominating E-Commerce in 2026',
    author: 'Sarah Jenkins',
    category: 'Web Development',
    status: 'Published',
    metaTitle: 'Headless React E-Commerce 2026',
    metaDesc: 'Learn how headless React frontends double conversion metrics for e-commerce.',
    content: '<p>Modern web users expect page navigation to be instantaneous. In the e-commerce landscape, even a one-second delay in page load time can translate to millions in lost revenue.</p><h3>The Headless Solution</h3><p>By decoupling the frontend (built with React and Vite) from backend logic, static content is served directly from edge CDNs.</p>',
    tags: ['E-Commerce', 'React', 'Performance'],
  },
  {
    title: 'Building Consistent Design Systems with Tailwind CSS Utility Classes',
    author: 'Amina Al-Masri',
    category: 'UI/UX Design',
    status: 'Published',
    metaTitle: 'Tailwind CSS Design Systems',
    metaDesc: 'Discover a workflow to translate design components from Figma directly to styled React code.',
    content: '<p>Design systems ensure brand consistency, but maintaining styling tokens across a growing developer team is difficult.</p><h3>Config-First Architecture</h3><p>The secret is placing design values inside tailwind.config.js.</p>',
    tags: ['Tailwind', 'Design Systems', 'CSS'],
  },
  {
    title: 'How to Implement Offline-First App Features with React Native',
    author: 'David Carter',
    category: 'Mobile App Development',
    status: 'Published',
    metaTitle: 'Offline-First React Native',
    metaDesc: 'Build local cache managers that sync queue updates seamlessly on network recovery.',
    content: '<p>User experiences suffer when mobile apps freeze during spotty cell service. An offline-first layout stores input data locally.</p><h3>Local Caching Strategies</h3><p>Using database libraries like SQLite or IndexedDB, client actions are saved with timestamps.</p>',
    tags: ['Mobile', 'React Native', 'Offline-First'],
  },
];

const teams = [
  {
    name: 'Sarah Jenkins',
    role: 'CEO & Principal Architect',
    experience: '12+ Years (Ex-Stripe Architect)',
    skills: 'System Design:98,Cloud Infrastructure:90,Product Strategy:95',
    avatarUrl: '',
  },
  {
    name: 'David Carter',
    role: 'VP of Engineering',
    experience: '9 Years (Ex-Vercel Contributor)',
    skills: 'React / Frontend:96,Node.js Backend:94,CI/CD Pipelines:88',
    avatarUrl: '',
  },
  {
    name: 'Amina Al-Masri',
    role: 'Lead UI/UX Designer',
    experience: '7 Years (Ex-Framer Designer)',
    skills: 'Figma Systems:97,User Research:92,Interaction Design:95',
    avatarUrl: '',
  },
];

const technologies = [
  { name: 'HTML5', category: 'Frontend', desc: 'Semantic markup for accessible, SEO-friendly web pages.' },
  { name: 'CSS3', category: 'Frontend', desc: 'Modern layouts with Flexbox, Grid, and animations.' },
  { name: 'Tailwind CSS', category: 'Frontend', desc: 'Utility-first CSS for rapid, consistent UI development.' },
  { name: 'JavaScript', category: 'Frontend', desc: 'Dynamic scripting for interactive web applications.' },
  { name: 'WordPress', category: 'Frontend', desc: 'CMS-driven websites with custom themes and plugins.' },
  { name: 'React', category: 'Frontend', desc: 'Component-driven frontend UI for scalable SPAs.' },
  { name: 'PHP', category: 'Backend', desc: 'Server-side language powering millions of web apps.' },
  { name: 'Laravel', category: 'Backend', desc: 'Elegant PHP framework with MVC architecture and Eloquent ORM.' },
  { name: 'Python', category: 'Backend', desc: 'Versatile language for backend, scripting, and AI/ML.' },
  { name: 'Django', category: 'Backend', desc: 'High-level Python framework for secure, scalable web apps.' },
  { name: 'Node.js', category: 'Backend', desc: 'JavaScript runtime for server-side and API development.' },
  { name: 'Prisma', category: 'Database', desc: 'Next-gen TypeScript ORM for type-safe database access.' },
  { name: 'MySQL', category: 'Database', desc: 'World\'s most popular open-source relational database.' },
  { name: 'PostgreSQL', category: 'Database', desc: 'Advanced relational database for complex queries and JSON.' },
  { name: 'Figma', category: 'Design', desc: 'Collaborative UI/UX design and prototyping tool.' },
  { name: 'Adobe Illustrator', category: 'Design', desc: 'Vector graphics for logos, icons, and brand assets.' },
  { name: 'Adobe Photoshop', category: 'Design', desc: 'Image editing, compositing, and digital art creation.' },
  { name: 'Adobe InDesign', category: 'Design', desc: 'Professional layout design for print and digital media.' },
  { name: 'Docker', category: 'Infrastructure', desc: 'Containerization for consistent deployment environments.' },
  { name: 'AWS', category: 'Infrastructure', desc: 'Cloud computing platform for scalable infrastructure.' },
  { name: 'Cloudflare', category: 'Infrastructure', desc: 'CDN, edge caching, and DDoS protection.' },
  { name: 'GitHub', category: 'Tools', desc: 'Version control, code review, and CI/CD automation.' },
];

const testimonials = [
  {
    name: 'James Whitfield',
    company: 'Apex Retail International',
    text: 'Nextora took our bloated Shopify setup and turned it into a blazing-fast headless platform. Page load dropped from 5.6s to under a second. Incredible work.',
    stars: 5,
  },
  {
    name: 'Priya Menon',
    company: 'Velo Delivery Inc.',
    text: 'The offline-first React Native app they built works flawlessly in dead zones. Our drivers have zero complaints and the app store rating sits at 4.9.',
    stars: 5,
  },
  {
    name: 'Omar Hassan',
    company: 'DineSync Hospitality Group',
    text: 'Our POS system now runs on tablets at all 12 locations simultaneously. Real-time order sync, offline support, and a clean UI that staff actually love.',
    stars: 5,
  },
];

const careers = [
  {
    title: 'Senior Frontend Engineer (React/Tailwind)',
    department: 'Engineering',
    status: 'Open',
    salary: '$110,000 - $140,000',
    description: 'Build reusable layout elements and responsive features. Collaborate with designers to implement custom CSS micro-animations.',
    requirements: [
      'Expertise in React, Vite, Tailwind CSS, and state managers like TanStack Query.',
      'Proficiency in setting up clean, component-based folder architectures.',
      'Strong eye for detail, matching interactive prototypes from Figma.',
      'Experience optimizing React bundle sizes and Lighthouse speeds.',
    ],
  },
  {
    title: 'Product & UI/UX Designer',
    department: 'Design',
    status: 'Open',
    salary: '$90,000 - $115,000',
    description: 'Create custom visual mockups and interactive user maps. Participate in client discovery sessions to gather product specifications.',
    requirements: [
      'Advanced portfolio of web applications, landing pages, and SaaS dashboards in Figma.',
      'Deep understanding of grid systems, visual weights, and typographic systems.',
      'Ability to prototype transitions and present options clearly.',
    ],
  },
  {
    title: 'Backend Developer (Node.js/Express)',
    department: 'Engineering',
    status: 'Open',
    salary: '$105,000 - $130,000',
    description: 'Develop scalable, fast endpoints for POS and CRM system clients. Manage cloud infrastructure deployments and webhook handlers.',
    requirements: [
      'Expert backend development in Node.js, Express.js, and SQL/NoSQL databases.',
      'Experience constructing secure RESTful APIs with auth rules (JWT/OAuth).',
      'Knowledge of Docker container configuration.',
    ],
  },
  {
    title: 'Frontend Developer Intern',
    department: 'Engineering',
    status: 'Open',
    salary: '$2,500 / Month',
    description: 'Assist with building responsive pages, FAQ accordions, and buttons. Help fix layout display bugs across mobile and tablet viewports.',
    requirements: [
      'Foundational understanding of HTML, CSS, JavaScript, and React.',
      'Knowledge of git version control workflows.',
      'Eagerness to learn clean coding conventions and styling tricks.',
    ],
  },
];

/* ─── Seeder ───────────────────────────────────────────────────────── */

async function seed() {
  console.log('\n🌱  Nextora Studio — Database Seeder\n');

  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅  Connected to MongoDB\n');

    // Clear existing data
    await Promise.all([
      Service.deleteMany({}),
      Portfolio.deleteMany({}),
      CaseStudy.deleteMany({}),
      Blog.deleteMany({}),
      Team.deleteMany({}),
      Technology.deleteMany({}),
      Testimonial.deleteMany({}),
      Career.deleteMany({}),
    ]);
    console.log('🗑️   Cleared all existing data\n');

    // Insert data
    const [s, p, cs, b, t, tech, te, c] = await Promise.all([
      Service.insertMany(services),
      Portfolio.insertMany(portfolios),
      CaseStudy.insertMany(caseStudies),
      Blog.insertMany(blogs),
      Team.insertMany(teams),
      Technology.insertMany(technologies),
      Testimonial.insertMany(testimonials),
      Career.insertMany(careers),
    ]);

    console.log(`✅  Services:       ${s.length} seeded`);
    console.log(`✅  Portfolios:     ${p.length} seeded`);
    console.log(`✅  Case Studies:   ${cs.length} seeded`);
    console.log(`✅  Blog Posts:     ${b.length} seeded`);
    console.log(`✅  Team Members:   ${t.length} seeded`);
    console.log(`✅  Technologies:   ${tech.length} seeded`);
    console.log(`✅  Testimonials:   ${te.length} seeded`);
    console.log(`✅  Careers:        ${c.length} seeded`);

    console.log('\n🎉  Database seeded successfully!\n');
  } catch (err) {
    console.error('❌  Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
