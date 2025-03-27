import { Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import QuizIcon from "@mui/icons-material/Quiz";
import BookIcon from "@mui/icons-material/Book";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import StorageIcon from "@mui/icons-material/Storage";
import ChatSection from "../../sections/LearningPage/chat-section/index";
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
        history: ["overview"],
    },
    {
        key: "quizzes",
        label: getColoredLabel("Quizzes", "#FC8181"),
        icon: <QuizIcon sx={{ color: "#FC8181" }} />,
        content: <QuizSection />,
        history: [ "create-quiz", "overview", "visual retrieval"],
    },
    {
        key: "studyGuides",
        label: getColoredLabel("Study Guides", "#48BB78"),
        icon: <BookIcon sx={{ color: "#48BB78" }} />,
        content: <StudyGuidesSection />,
        history: ["overview", "create-guide", "visual retrieval"],
    },
    {
        key: "learningByVideo",
        label: getColoredLabel("Learning by Video", "#FB923C"),
        icon: <VideoIcon sx={{ color: "#FB923C" }} />,
        content: <VideoSection />,
        history: [],
    },
    {
        key: "learningMaterials",
        label: getColoredLabel("Learning Materials", "#9F7AEA"),
        icon: <StorageIcon sx={{ color: "#9F7AEA" }} />,
        content: <MaterialsSection />,
        history: [],
    },
];