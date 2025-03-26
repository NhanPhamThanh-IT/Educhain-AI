import { Box, Card, CardContent, CardMedia, Typography, IconButton, Chip } from "@mui/material";
import { CardActionArea, Stack } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloudUpload, Link } from "@mui/icons-material";
import { settings, topics, courses } from "../constants";

const options = [
    { icon: <CloudUpload fontSize="large" color="primary" />, title: "Upload", subtitle: "PDF, PPT, DOC, TXT" },
    { icon: <Link fontSize="large" color="secondary" />, title: "Paste", subtitle: "YouTube, Website" },
];

const TitleSection = ({ title }) => (
    <Typography variant="h5" fontWeight={700} color="text.primary">
        {title}
    </Typography>
)

const YourCourses = ({courses}) => (
    <>
        <TitleSection title={"Your Courses"} />
        <Box sx={{ width: "100%", mx: "auto", overflow: "hidden" }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
                {courses.map((item) => (
                    <Chip key={item.id} label={item.title} variant="outlined" />
                ))}
            </Stack>
        </Box>
    </>
);

const ExploreTopics = () => (
    <>
        <TitleSection title={"Explore more topics"} />
        <Box sx={{ width: "100%", mx: "auto", overflow: "hidden" }}>
            <Slider {...settings}>
                {topics.map(({ img, title }, index) => (
                    <Box key={index} sx={{ px: 2 }}>
                        <Card sx={topicCardStyles}>
                            <CardMedia component="img" height="160" image={img} alt={title}
                                sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                            />
                            <CardContent>
                                <Typography align="center" fontWeight={600}>{title}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    </>
);

const Content = () => (
    <>
        <TitleSection title={"What do you want to learn now?"} />

        <Stack direction="row" justifyContent="center" gap={3} mb={4} flexWrap="wrap">
            {options.map(({ icon, title, subtitle }) => (
                <Card key={title} sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                    <CardActionArea>
                        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                            <IconButton size="large" aria-label={title} color="primary">
                                {icon}
                            </IconButton>
                            <Typography variant="h6" mt={1} fontWeight={600} textAlign="center">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mt={1} textAlign="center">
                                {subtitle}
                            </Typography>
                        </Box>
                    </CardActionArea>
                </Card>
            ))}
        </Stack>
    </>
);

const ContentArea = ({ sections, selectedSection, selectedHistory }) => {
    const contentData = sections.find(
        (s) => s.key === selectedSection && s.history?.includes(selectedHistory)
    )?.content;

    return (
        <Box sx={{ p: 6, flexGrow: 1, overflow: "auto", bgcolor: "background.default", minHeight: "100vh", mt: 4 }}>
            {contentData || (
                <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 4, justifyContent: "center", alignItems: "center" }}>
                    <Content />
                    <YourCourses courses={courses}/>
                    <ExploreTopics />
                </Box>
            )}
        </Box>
    );
};

const topicCardStyles = {
    bgcolor: "#ffffff",
    borderRadius: 3,
    boxShadow: 3,
    transition: "box-shadow 0.3s ease",
    '&:hover': {
        boxShadow: 5,
    }
};

export default ContentArea;
