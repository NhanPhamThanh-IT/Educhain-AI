// Desc: This file defines the BasicInformationsSection component, which displays the course image, description, and detailed information.
//       The component also renders the CourseInfoCard component, which displays individual course information (e.g., author, rating, etc.).

// Importing necessary libraries and tools
import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Info } from "@mui/icons-material";
import courseInfo from "../../constants/CourseDetails/courseInfo";

// Array holding the keys for the course data to be displayed
const values = ["author", "modifiedDate", "rating", "level", "students", "duration"];

// Component CourseInfoCard: displays individual course information (e.g., author, rating, etc.)
const CourseInfoCard = ({ icon: Icon, value, bg, color }) => (
    <Grid item xs={12} md={4}>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 2,
                bgcolor: bg,
                borderRadius: 2,
            }}
        >
            {/* Display the icon */}
            <Icon sx={{ fontSize: 30, color }} />
            {/* Display the information value */}
            <Typography
                variant="body1"
                sx={{
                    color,
                    fontWeight: 600,
                    fontSize: 16,
                    textAlign: "center",
                    mt: 1,
                }}
            >
                {value}
            </Typography>
        </Box>
    </Grid>
);

// Component BasicInformationsSection: displays the course image, description, and detailed information
const BasicInformationsSection = ({
    img,
    name,
    abstraction,
    author,
    modifiedDate,
    rating,
    level,
    students,
    duration,
}) => {
    // Create an object to hold course information based on the received props
    const courseData = { author, modifiedDate, rating, level, students, duration };

    return (
        <Grid container spacing={4}>
            {/* Main course information section */}
            <Grid item xs={12} md={8} sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                    {/* Display the course image */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={img}
                            alt="Course"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: 2,
                            }}
                        />
                    </Grid>
                    {/* Display course name, description, and enroll button */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                    >
                        <Box>
                            {/* Course name */}
                            <Typography
                                variant="h4"
                                fontSize={25}
                                fontWeight="bold"
                                sx={{ color: "#365ACA" }}
                            >
                                {name}
                            </Typography>
                            {/* Course description */}
                            <Typography
                                variant="body1"
                                sx={{ mt: 2, textAlign: "justify", color: "text.secondary" }}
                            >
                                {abstraction}
                            </Typography>
                        </Box>
                        <Box>
                            {/* Enroll button */}
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: "#365ACA",
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                    py: 1.5,
                                    px: 3,
                                    mt: 3,
                                    "&:hover": { bgcolor: "primary.dark" },
                                }}
                                aria-label="Enroll in Course"
                            >
                                Enroll Now
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            {/* Detailed course information section */}
            <Grid item xs={12} md={4}>
                <Box sx={{ borderRadius: 2, bgcolor: "background.paper", p: 2 }}>
                    {/* Section title */}
                    <Typography
                        variant="h4"
                        fontSize={25}
                        fontWeight="bold"
                        sx={{
                            mb: 2,
                            color: "#365ACA",
                            borderBottom: 2,
                            borderColor: "#365ACA",
                            display: "flex",
                            alignItems: "center",
                            textTransform: "capitalize",
                        }}
                    >
                        {/* Information icon */}
                        <Info sx={{ mr: 1 }} /> COURSE INFORMATION
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Iterate through each item in courseInfo and render a CourseInfoCard */}
                        {courseInfo.map((item, index) => {
                            // Retrieve the corresponding key name from the values array based on the index
                            const keyName = values[index];
                            return (
                                <CourseInfoCard
                                    key={index}
                                    icon={item.icon}
                                    value={courseData[keyName]}
                                    bg={item.bg}
                                    color={item.color}
                                />
                            );
                        })}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default BasicInformationsSection;
