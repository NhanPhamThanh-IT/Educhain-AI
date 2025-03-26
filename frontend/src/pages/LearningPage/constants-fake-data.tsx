export const categories = [
  "Web Development",
  "Data Science & AI",
  "Design & Creative",
  "Healthcare & Medicine",
  "Security & DevOps"
] as const;

export const categoryColors = {
  "Web Development": { border: "#4CAF50", text: "#388E3C" }, // Xanh lá
  "Data Science & AI": { border: "#7E57C2", text: "#512DA8" }, // Tím
  "Design & Creative": { border: "#FFEB3B", text: "#FBC02D" }, // Vàng
  "Healthcare & Medicine": { border: "#FF9800", text: "#E65100" }, // Cam
  "Security & DevOps": { border: "#F44336", text: "#D32F2F" }, // Đỏ
};

export const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript to build modern, responsive websites from scratch. Learn best practices and industry standards.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "12 weeks",
    level: "Beginner"
  },
  {
    id: 2,
    title: "React.js Mastery",
    description: "Deep dive into React.js, including hooks, context, Redux, and advanced patterns for building scalable applications.",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "10 weeks",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Vue.js for Beginners",
    description: "Learn Vue.js 3 from the ground up, including composition API, Vuex, and Vue Router for modern web applications.",
    img: "https://images.unsplash.com/photo-1537884944318-390069bb8665?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "8 weeks",
    level: "Beginner"
  },
  {
    id: 4,
    title: "Angular Complete Guide",
    description: "Comprehensive guide to Angular framework, covering components, services, RxJS, and enterprise-level applications.",
    img: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "14 weeks",
    level: "Intermediate"
  },
  {
    id: 5,
    title: "Node.js and Express",
    description: "Build scalable backend services with Node.js and Express. Learn REST APIs, authentication, and database integration.",
    img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "10 weeks",
    level: "Intermediate"
  },
  {
    id: 6,
    title: "Python for Data Science",
    description: "Learn Python programming with focus on data analysis using NumPy, Pandas, and data visualization libraries.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    category: "Data Science & AI",
    duration: "12 weeks",
    level: "Beginner"
  },
  {
    id: 7,
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms, including supervised and unsupervised learning techniques.",
    img: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=600",
    category: "Data Science & AI",
    duration: "16 weeks",
    level: "Intermediate"
  },
  {
    id: 8,
    title: "Deep Learning with TensorFlow",
    description: "Master deep learning using TensorFlow. Build neural networks for computer vision and natural language processing.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
    category: "Data Science & AI",
    duration: "14 weeks",
    level: "Advanced"
  },
  {
    id: 9,
    title: "Natural Language Processing",
    description: "Learn NLP techniques for text analysis, sentiment analysis, and building chatbots using modern frameworks.",
    img: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?auto=format&fit=crop&q=80&w=600",
    category: "Data Science & AI",
    duration: "12 weeks",
    level: "Advanced"
  },
  {
    id: 10,
    title: "Cybersecurity Essentials",
    description: "Foundation in cybersecurity principles, network security, and threat detection techniques.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    category: "Security & DevOps",
    duration: "10 weeks",
    level: "Beginner"
  },
  {
    id: 11,
    title: "Blockchain Development",
    description: "Learn blockchain technology, smart contracts, and decentralized application development.",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "12 weeks",
    level: "Advanced"
  },
  {
    id: 12,
    title: "AI Applications",
    description: "Practical applications of AI in business, healthcare, and automation using modern frameworks.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
    category: "Data Science & AI",
    duration: "14 weeks",
    level: "Advanced"
  },
  {
    id: 13,
    title: "Game Development Fundamentals",
    description: "Create interactive games using Unity engine. Learn game design principles and C# programming.",
    img: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "16 weeks",
    level: "Intermediate"
  },
  {
    id: 14,
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications using React Native and modern mobile development practices.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "12 weeks",
    level: "Intermediate"
  },
  {
    id: 15,
    title: "Full-Stack JavaScript",
    description: "Comprehensive course covering both frontend and backend JavaScript development with modern frameworks.",
    img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "16 weeks",
    level: "Advanced"
  },
  {
    id: 16,
    title: "Cloud Computing with AWS",
    description: "Master AWS services and cloud architecture principles for modern application deployment.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    category: "Security & DevOps",
    duration: "12 weeks",
    level: "Intermediate"
  },
  {
    id: 17,
    title: "Data Structures and Algorithms",
    description: "Essential computer science concepts for efficient problem-solving and optimization.",
    img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "14 weeks",
    level: "Advanced"
  },
  {
    id: 18,
    title: "Database Management",
    description: "Learn database design, SQL, and modern database systems including PostgreSQL and MongoDB.",
    img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600",
    category: "Web Development",
    duration: "10 weeks",
    level: "Intermediate"
  },
  {
    id: 19,
    title: "DevOps and CI/CD",
    description: "Master DevOps practices, continuous integration, and deployment automation tools.",
    img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=600",
    category: "Security & DevOps",
    duration: "12 weeks",
    level: "Advanced"
  },
  {
    id: 20,
    title: "UI/UX Design Principles",
    description: "Learn user interface and experience design principles for creating engaging digital products.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "10 weeks",
    level: "Beginner"
  },
  {
    id: 21,
    title: "Digital Design with Photoshop",
    description: "Master Adobe Photoshop for professional graphic design and photo manipulation.",
    img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "8 weeks",
    level: "Intermediate"
  },
  {
    id: 22,
    title: "Digital Illustration",
    description: "Create stunning digital illustrations using professional tools and techniques.",
    img: "https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "12 weeks",
    level: "Intermediate"
  },
  {
    id: 23,
    title: "3D Modeling and Animation",
    description: "Learn 3D modeling, texturing, and animation using industry-standard software.",
    img: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "16 weeks",
    level: "Advanced"
  },
  {
    id: 24,
    title: "Motion Graphics",
    description: "Create engaging motion graphics and visual effects for video and digital media.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "14 weeks",
    level: "Advanced"
  },
  {
    id: 25,
    title: "Brand Design",
    description: "Comprehensive course on creating effective brand identities and design systems.",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "10 weeks",
    level: "Intermediate"
  },
  {
    id: 26,
    title: "Professional Photography",
    description: "Master digital photography techniques, composition, and post-processing.",
    img: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "12 weeks",
    level: "Beginner"
  },
  {
    id: 27,
    title: "Character Animation",
    description: "Learn character design and animation principles for games and digital media.",
    img: "https://images.unsplash.com/photo-1616499370260-485b3e5ed653?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "14 weeks",
    level: "Advanced"
  },
  {
    id: 28,
    title: "Concept Art",
    description: "Create professional concept art for games, films, and entertainment media.",
    img: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "12 weeks",
    level: "Advanced"
  },
  {
    id: 29,
    title: "Architectural Visualization",
    description: "Create photorealistic 3D architectural visualizations and presentations.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    category: "Design & Creative",
    duration: "16 weeks",
    level: "Advanced"
  },
  {
    id: 30,
    title: "Medical Terminology",
    description: "Essential medical terminology and language used in healthcare settings.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "8 weeks",
    level: "Beginner"
  },
  {
    id: 31,
    title: "Human Anatomy",
    description: "Comprehensive study of human anatomy and physiological systems.",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "16 weeks",
    level: "Intermediate"
  },
  {
    id: 32,
    title: "Emergency Care",
    description: "Learn essential first aid and emergency medical care procedures.",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "10 weeks",
    level: "Beginner"
  },
  {
    id: 33,
    title: "Clinical Pharmacology",
    description: "Study of medications, their effects, and proper administration in healthcare.",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "14 weeks",
    level: "Advanced"
  },
  {
    id: 34,
    title: "Surgical Techniques",
    description: "Introduction to basic surgical procedures and operating room protocols.",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "16 weeks",
    level: "Advanced"
  },
  {
    id: 35,
    title: "Clinical Pathology",
    description: "Study of disease processes and laboratory diagnostic techniques.",
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "12 weeks",
    level: "Advanced"
  },
  {
    id: 36,
    title: "Medical Imaging",
    description: "Understanding various medical imaging techniques and their applications.",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "14 weeks",
    level: "Intermediate"
  },
  {
    id: 37,
    title: "Mental Health Care",
    description: "Understanding mental health conditions and therapeutic approaches.",
    img: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "12 weeks",
    level: "Intermediate"
  },
  {
    id: 38,
    title: "Clinical Nutrition",
    description: "Study of nutrition principles and dietary therapy in healthcare.",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "10 weeks",
    level: "Intermediate"
  },
  {
    id: 39,
    title: "Public Health",
    description: "Understanding population health and disease prevention strategies.",
    img: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "12 weeks",
    level: "Intermediate"
  },
  {
    id: 40,
    title: "Healthcare Informatics",
    description: "Digital health records and healthcare information management systems.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "10 weeks",
    level: "Intermediate"
  },
  {
    id: 41,
    title: "Neuroscience",
    description: "Study of the nervous system and brain function in health and disease.",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "16 weeks",
    level: "Advanced"
  },
  {
    id: 42,
    title: "Clinical Dermatology",
    description: "Study of skin conditions and their treatment in clinical practice.",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "12 weeks",
    level: "Advanced"
  },
  {
    id: 43,
    title: "Pediatric Care",
    description: "Specialized healthcare for infants, children, and adolescents.",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "14 weeks",
    level: "Advanced"
  },
  {
    id: 44,
    title: "Orthopedics",
    description: "Study of musculoskeletal conditions and their treatment.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "16 weeks",
    level: "Advanced"
  },
  {
    id: 45,
    title: "Dental Medicine",
    description: "Fundamentals of dental care and oral health management.",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "14 weeks",
    level: "Advanced"
  },
  {
    id: 46,
    title: "Sports Medicine",
    description: "Medical care for athletes and sports-related injuries.",
    img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "12 weeks",
    level: "Advanced"
  },
  {
    id: 47,
    title: "Healthcare AI",
    description: "Applications of artificial intelligence in medical diagnosis and treatment.",
    img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "14 weeks",
    level: "Advanced"
  },
  {
    id: 48,
    title: "Biomedical Engineering",
    description: "Engineering principles applied to healthcare and medical devices.",
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "16 weeks",
    level: "Advanced"
  },
  {
    id: 49,
    title: "Molecular Biology",
    description: "Study of biological processes at the molecular and cellular level.",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600",
    category: "Healthcare & Medicine",
    duration: "16 weeks",
    level: "Advanced"
  },
  {
    id: 50,
    title: "Cybersecurity Advanced",
    description: "Advanced techniques in ethical hacking and system security.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    category: "Security & DevOps",
    duration: "14 weeks",
    level: "Advanced"
  }
];