import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloudUpload, Link } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";

import { settings, topics } from "../constants";

const options = [
    { icon: <CloudUpload />, title: "Upload Document", subtitle: "PDF, PPT, DOC, TXT" },
    { icon: <Link />, title: "Paste", subtitle: "YouTube, website" },
    { icon: <MicIcon />, title: "Record", subtitle: "Record your lecture" }
];

const ContentArea = ({ sections, selectedSection, selectedHistory }) => {
    const content = sections.find(
        (s) => s.key === selectedSection && s.history?.includes(selectedHistory)
    )?.content;

    return (
        <Box sx={{ p: 6, flexGrow: 1, overflow: "auto", position: "relative" }}>
            {content || (
                <Box sx={{ p: 4, minHeight: "80vh" }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        What do you want to learn today?
                    </Typography>

                    <Box display="flex" justifyContent="center" gap={2} mb={4}>
                        {options.map(({ icon, title, subtitle }) => (
                            <Box key={title} sx={{ width: 200, p: 2, border: 1, borderColor: "grey.300", borderRadius: 2, boxShadow: 1, textAlign: "left" }}>
                                {icon}
                                <Typography variant="body1" gutterBottom>{title}</Typography>
                                <Typography variant="body2" color="textSecondary" mt={1}>{subtitle}</Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box border={1} borderColor="gray" p={2} borderRadius={2} mb={4}>+ Add Space</Box>

                    <Typography variant="h6" mb={2}>Explore Topics</Typography>
                    <Box sx={{ width: "70%", mx: "auto", overflow: "hidden" }}>
                        <Slider {...settings}>
                            {topics.map(({ img, title }, index) => (
                                <Box key={index} sx={{ px: 1 }}>
                                    <Card sx={{ bgcolor: "gray.900" }}>
                                        <CardMedia component="img" height="140" image={img} alt={title} />
                                        <CardContent>
                                            <Typography align="center">{title}</Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ContentArea;
