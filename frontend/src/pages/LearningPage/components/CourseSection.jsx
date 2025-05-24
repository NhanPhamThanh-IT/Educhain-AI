import { data } from "./constants"; // Assuming data is imported from a constants file

import React from "react";
import { Grid, Card, CardContent, Box, Typography, Button, CardMedia, Chip } from "@mui/material"; // Added missing imports
// Assuming Rocket icon is available, e.g., from 'lucide-react' or similar
// import { Rocket } from 'lucide-react'; 

const CourseCard = ({ course }) => {
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 4,
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
                height: '100%' // Ensure card takes full height of its container in CourseList
            }}
        >
            {course.images && course.images.length > 0 && (
                <CardMedia
                    component="img"
                    height="120" // Compact height
                    image={course.images[0]} // Display only the first image
                    alt={`${course.title} image`}
                />
            )}
            <CardContent sx={{ p: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}> {/* Reduced padding */}
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1rem' }}> {/* Smaller title */}
                        {course.title}
                    </Typography>
                    <Typography
                        variant="body2" // Smaller body text
                        color="textSecondary"
                        gutterBottom
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2, // Show 2 lines
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minHeight: '2.4em', // Approx 2 lines height
                            mb: 1 // Reduced margin bottom
                        }}
                    >
                        {course.description}
                    </Typography>
                </Box>

                <Box mt={1}> {/* Grouping details and button */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Box display="flex" gap={1}>
                            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}> {/* Smaller font */}
                                {course.duration}
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}> {/* Smaller font */}
                                {course.level}
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="textSecondary" fontWeight="bold" sx={{ fontSize: '0.7rem' }}> {/* Smaller font */}
                            By {course.instructor.name}
                        </Typography>
                    </Box>

                    <Box display="flex" flexWrap="wrap" gap={0.5} mb={1.5}> {/* Reduced gap and margin */}
                        {course.curriculum?.slice(0, 2).map(topic => ( // Show first 2 topics
                            <Chip
                                key={topic}
                                label={topic}
                                variant="outlined"
                                color="secondary"
                                size="small"
                                sx={{ fontSize: '0.65rem', height: '20px' }} // Even smaller chip
                            />
                        ))}
                        {course.curriculum && course.curriculum.length > 2 && (
                            <Chip label="..." size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: '20px' }} />
                        )}
                    </Box>

                    <Button
                        variant="outlined"
                        fullWidth // Make button take full width of its container
                        sx={{
                            border: "1px solid #3F51B5", // Thinner border
                            color: "#3F51B5",
                            borderRadius: "8px", // Smaller radius
                            textTransform: "none",
                            fontSize: "0.75rem", // Smaller font
                            fontWeight: "bold",
                            padding: "4px 8px", // Reduced padding
                            transition: "0.3s",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 255, 0.05)", // Lighter hover
                                transform: "scale(1.02)" // Subtle scale
                            },
                        }}
                    >
                        Get Started
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

const CourseList = ({ courses }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                overflowX: 'auto',
                py: 1.5, // Reduced vertical padding for the scrollable area
                px: 1,   // Horizontal padding for the container
                gap: 1.5, // Reduced spacing between cards
                // Minimal scrollbar styling (optional)
                '&::-webkit-scrollbar': {
                    height: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    borderRadius: '3px',
                }
            }}
        >
            {courses.map(course => (
                <Box
                    key={course.id}
                    sx={{
                        minWidth: { xs: 220, sm: 240 }, // Further reduced min-width for cards
                        flexShrink: 0,
                        height: 'auto' // Allow card to determine its height
                    }}
                >
                    <CourseCard course={course} />
                </Box>
            ))}
        </Box>
    );
};

const CourseSection = () => {
    return (
        <CourseList courses={data} />
    );
}

export default CourseSection;