import { Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import QuizIcon from "@mui/icons-material/Quiz";
import BookIcon from "@mui/icons-material/Book";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import StorageIcon from "@mui/icons-material/Storage";
import ChatSection from "../../sections/LearningPage/ChatSection";
import QuizSection from "../../sections/LearningPage/QuizSection";
import StudyGuidesSection from "../../sections/LearningPage/StudyGuidesSection";
import VideoSection from "../../sections/LearningPage/VideoSection";
import MaterialsSection from "../../sections/LearningPage/MaterialsSection";

const getColoredLabel = (text, color) => (
    <Typography sx={{ color, fontWeight: "medium" }}>{text}</Typography>
);

export const data = {
    logo: {
        src: "/logo.png",
        link: "/homepage",
        title: "Educhain",
    },
};

export const courses = [
    { id: 1, title: "Web Development" },
    { id: 2, title: "React.js Fundamentals" },
    { id: 3, title: "Vue.js for Beginners" },
    { id: 4, title: "Angular Complete Guide" },
    { id: 5, title: "Node.js and Express" },
    { id: 6, title: "Python for Data Science" },
    { id: 7, title: "Machine Learning Basics" },
    { id: 8, title: "Deep Learning with TensorFlow" },
    { id: 9, title: "Natural Language Processing" },
    { id: 10, title: "Cybersecurity Essentials" },
    { id: 11, title: "Blockchain and Cryptocurrency" },
    { id: 12, title: "Artificial Intelligence Applications" },
    { id: 13, title: "Game Development with Unity" },
    { id: 14, title: "Mobile App Development" },
    { id: 15, title: "Full-Stack JavaScript" },
    { id: 16, title: "Cloud Computing with AWS" },
    { id: 17, title: "Data Structures and Algorithms" },
    { id: 18, title: "Database Management Systems" },
    { id: 19, title: "DevOps and CI/CD" },
    { id: 20, title: "UI/UX Design Principles" },
    { id: 21, title: "Graphic Design with Photoshop" },
    { id: 22, title: "Illustration and Digital Art" },
    { id: 23, title: "3D Modeling with Blender" },
    { id: 24, title: "Motion Graphics with After Effects" },
    { id: 25, title: "Typography and Branding" },
    { id: 26, title: "Photography and Image Editing" },
    { id: 27, title: "Character Design and Animation" },
    { id: 28, title: "Concept Art for Games and Movies" },
    { id: 29, title: "Architecture Visualization" },
    { id: 30, title: "Medical Terminology" },
    { id: 31, title: "Human Anatomy and Physiology" },
    { id: 32, title: "First Aid and Emergency Care" },
    { id: 33, title: "Pharmacology Basics" },
    { id: 34, title: "Surgical Techniques" },
    { id: 35, title: "Clinical Pathology" },
    { id: 36, title: "Radiology and Medical Imaging" },
    { id: 37, title: "Mental Health and Psychology" },
    { id: 38, title: "Nutrition and Dietetics" },
    { id: 39, title: "Epidemiology and Public Health" },
    { id: 40, title: "Medical Coding and Billing" },
    { id: 41, title: "Neuroscience and Brain Function" },
    { id: 42, title: "Dermatology and Skin Care" },
    { id: 43, title: "Pediatrics and Childcare" },
    { id: 44, title: "Orthopedic Surgery Basics" },
    { id: 45, title: "Dental Hygiene and Care" },
    { id: 46, title: "Sports Medicine and Physiotherapy" },
    { id: 47, title: "Artificial Intelligence in Healthcare" },
    { id: 48, title: "Biomedical Engineering" },
    { id: 49, title: "Genetics and Molecular Biology" },
    { id: 50, title: "Ethical Hacking and Penetration Testing" }
];


export const topics = [
    {
        img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
        title: "Machine Learning"
    },
    {
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
        title: "Web Development"
    },
    {
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
        title: "Cybersecurity"
    },
    {
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
        title: "Data Science"
    }
];

export const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

export const sections = [
    {
        key: "chat",
        label: getColoredLabel("Chat", "#63B3ED"),
        icon: <ChatIcon sx={{ color: "#63B3ED" }} />,
        content: <ChatSection />,
        history: ["overview", "chat2", "chat3"],
    },
    {
        key: "quizzes",
        label: getColoredLabel("Quizzes", "#FC8181"),
        icon: <QuizIcon sx={{ color: "#FC8181" }} />,
        content: <QuizSection />,
        history: ["overview", "create-quiz", "quiz1", "quiz2"],
    },
    {
        key: "studyGuides",
        label: getColoredLabel("Study Guides", "#48BB78"),
        icon: <BookIcon sx={{ color: "#48BB78" }} />,
        content: <StudyGuidesSection />,
        history: ["overview", "create-guide", "study2", "study3"],
    },
    {
        key: "learningByVideo",
        label: getColoredLabel("Learning by Video", "#FB923C"),
        icon: <VideoIcon sx={{ color: "#FB923C" }} />,
        content: <VideoSection />,
        history: ["video1", "video2", "video3"],
    },
    {
        key: "learningMaterials",
        label: getColoredLabel("Learning Materials", "#9F7AEA"),
        icon: <StorageIcon sx={{ color: "#9F7AEA" }} />,
        content: <MaterialsSection />,
        history: ["mat1", "mat2", "mat3"],
    },
];