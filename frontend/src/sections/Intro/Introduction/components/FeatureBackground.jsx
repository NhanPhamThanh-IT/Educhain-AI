import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

const floating = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const features = [
    { img: "/Homepage/PDF.png", hover_img: "", color: "white", top: "0%", left: "5%" },
    { img: "/Homepage/QUIZ.png", hover_img: "", color: "white", top: "0%", right: "5%" },
    { img: "/Homepage/VIDEO.png", hover_img: "", color: "white", bottom: "0%", left: "5%" },
    { img: "/Homepage/COURSE.png", hover_img: "", color: "white", bottom: "0%", right: "5%" },
    { img: "/Homepage/EXAM.png", hover_img: "", color: "white", top: "40%", left: "2%" },
    { img: "/Homepage/DOCS.png", hover_img: "", color: "white", top: "40%", right: "2%" },
];

export const FeatureBackground = () => {
    return (
        <>
            {features.map((feature, index) => (
                <Box
                    key={index}
                    sx={{
                        position: "absolute",
                        backgroundColor: feature.color,
                        padding: 5,
                        borderRadius: "50%",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                        animation: `${floating} 3s infinite ease-in-out`,
                        zIndex: 10,
                        width: 60,
                        height: 60,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                            transform: "scale(1.1)",
                            opacity: 1,
                            animation: "none", // Ngừng animation khi hover
                        },
                        ...feature, // Đặt thuộc tính vị trí (top, left, right, bottom)
                    }}
                >
                    <img
                        src={feature.img}
                        alt="Feature Icon"
                        style={{
                            width: 40,
                            height: 40,
                            objectFit: "contain",
                        }}
                    />
                </Box>
            ))}
        </>
    );
};
