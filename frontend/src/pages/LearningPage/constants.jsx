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

export const topics = [
    { title: "The Genetic Code and Translation", img: "/images/genetic.png" },
    { title: "How To Find The Range of a Function", img: "/images/range.png" },
    { title: "But what is a neural network?", img: "/images/neural.png" },
    { title: "Introduction to Cell Biology", img: "/images/cell.png" },
    { title: "Social Class", img: "/images/social.png" },
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