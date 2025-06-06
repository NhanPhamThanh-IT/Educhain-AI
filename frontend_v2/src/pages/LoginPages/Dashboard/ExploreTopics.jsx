import { Box, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TitleSection from '@/components/ui/TitleSection';
import { topics } from './constants';

const ExploreTopics = () => {
    const theme = useTheme();

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <TitleSection title={"Explore more topics"} description={"Discover trending topics and expand your knowledge"} />
            <Box sx={{ width: "100%", mx: "auto", overflow: "hidden" }}>
                <Slider {...settings}>
                    {topics.map(({ img, title }, index) => (                        <Box key={index} sx={{ px: 2 }}>
                            <div>
                                <Card
                                    sx={{
                                        bgcolor: theme.palette.background.paper,
                                        borderRadius: 3,
                                        boxShadow: theme.shadows[2],
                                        transition: "all 0.3s ease",
                                        overflow: "hidden",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: theme.shadows[8],
                                            "& .MuiCardMedia-root": {
                                                transform: "scale(1.1)",
                                            },
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={img}
                                        alt={title}
                                        sx={{
                                            borderTopLeftRadius: 12,
                                            borderTopRightRadius: 12,
                                            transition: "transform 0.3s ease",
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            align="center"
                                            fontWeight={600}
                                            sx={{
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    color: theme.palette.primary.main,
                                                }
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                    </CardContent>                                </Card>
                            </div>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </>
    );
};

export default ExploreTopics;