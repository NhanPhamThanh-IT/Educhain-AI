// Desc: This file contains the LearningOutcomesSection component that displays a course description and a responsive image slider showcasing learning outcomes.

// Import MUI necessary modules
import { Box, Typography } from "@mui/material";

// Import react-slick for carousel functionality
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * LearningOutcomesSection Component
 * 
 * This component displays a course description along with a responsive image slider
 * showcasing learning outcomes. It utilizes Material-UI for styling and react-slick
 * for the carousel functionality.
 * 
 * Props:
 * @param {string} content - Course description text.
 * @param {string[]} list_images - Array of image URLs to be displayed in the slider.
 */
const LearningOutcomesSection = ({ content, list_images }) => {
    // Slider settings configuration
    const settings = {
        dots: true, // Show navigation dots below the slider
        infinite: true, // Enable infinite looping of slides
        speed: 500, // Transition speed in milliseconds
        slidesToShow: 2, // Display 2 images per slide on larger screens
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Enable automatic sliding
        autoplaySpeed: 3000, // Set autoplay interval to 3 seconds
        adaptiveHeight: true, // Adjust height dynamically based on content
        responsive: [
            {
                breakpoint: 600, // For screens smaller than 600px
                settings: {
                    slidesToShow: 1, // Show only one image per slide
                },
            },
        ],
    };

    return (
        <Box sx={{ py: 4 }}>
            {/* Course title */}
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#365ACA", mb: 2 }}>
                Course Description
            </Typography>

            {/* Course content description */}
            <Typography variant="body1" textAlign="justify" sx={{ whiteSpace: "pre-line" }}>
                {content || "Not given"}
            </Typography>

            {/* Image slider section */}
            <Box sx={{ mt: 2 }}>
                <Slider {...settings}>
                    {/* Map through images and render each one inside the slider */}
                    {(list_images || ["https://source.unsplash.com/800x400/?students,learning"]).map((src, index) => (
                        <Box key={index} sx={{ px: 1, display: "flex", justifyContent: "center" }}>
                            <img
                                src={src}
                                alt={`learning-outcome-${index}`}
                                style={{ width: "100%", maxWidth: 500, borderRadius: 8 }}
                            />
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};

// Export the LearningOutcomesSection component
export default LearningOutcomesSection;
