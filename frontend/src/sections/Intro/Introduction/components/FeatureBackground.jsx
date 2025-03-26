import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

const floating = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px) rotate(2deg); }
  100% { transform: translateY(0); }
`;

// Hiệu ứng vệt sáng khi hover
const glowing = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
  100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
`;

const borderColors = ["#FFADAD", "#D8B4F8", "#A0E7E5", "#FFD97D", "#C1E1C1", "#FFB480"];

const features = [
    { img: "/Homepage/PDF.png", hover_img: "/Homepage/PDF_hover.png", top: "0%", left: "5%" },
    { img: "/Homepage/QUIZ.png", hover_img: "/Homepage/QUIZ_hover.png", top: "0%", right: "5%" },
    { img: "/Homepage/VIDEO.png", hover_img: "/Homepage/VIDEO_hover.png", bottom: "0%", left: "5%" },
    { img: "/Homepage/COURSE.png", hover_img: "/Homepage/COURSE_hover.png", bottom: "0%", right: "5%" },
    { img: "/Homepage/EXAM.png", hover_img: "/Homepage/EXAM_hover.png", top: "40%", left: "2%" },
    { img: "/Homepage/DOCS.png", hover_img: "/Homepage/DOCS_hover.png", top: "40%", right: "2%" },
];

export const FeatureBackground = () => {
    return (
        <>
            {features.map((feature, index) => (
                <Box
                    key={index}
                    sx={{
                        position: "absolute",
                        background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
                        backdropFilter: "blur(10px)",
                        padding: 5,
                        borderRadius: "50%",
                        border: `3px solid ${borderColors[index % borderColors.length]}`,
                        transition: "transform 0.3s ease-in-out, border 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        animation: `${floating} 3s infinite ease-in-out ${index * 0.2}s`,
                        zIndex: 10,
                        width: 70,
                        height: 70,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        boxShadow: `0 0 10px ${borderColors[index % borderColors.length]}`, // Tạo ánh sáng xung quanh
                        "&:hover": {
                            transform: "scale(1.2)",
                            border: `3px solid white`,
                            boxShadow: `0 0 25px ${borderColors[index % borderColors.length]}`, // Khi hover, vệt sáng mạnh hơn
                            animation: `${glowing} 1.5s infinite ease-in-out`,
                        },
                        ...feature, // Đặt vị trí (top, left, right, bottom)
                    }}
                >
                    <img
                        src={feature.img}
                        alt="Feature Icon"
                        style={{
                            width: 45,
                            height: 45,
                            objectFit: "contain",
                            transition: "opacity 0.3s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.src = feature.hover_img)}
                        onMouseOut={(e) => (e.currentTarget.src = feature.img)}
                    />
                </Box>
            ))}
        </>
    );
};
