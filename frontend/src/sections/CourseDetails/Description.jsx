// Desc: This file contains the DescriptionSection component that displays the course description, requirements, and additional details in a well-structured UI.

// Importing react components
import React from "react";

// Importing Material-UI components
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

// Importing lucide icons
import { CheckCircle } from "lucide-react";

/**
 * DescriptionSection Component
 * Displays the course description, requirements, and additional details in a well-structured UI.
 *
 * Props:
 * @param {string} introduction - The introductory text of the course.
 * @param {string} requirements - The course requirements.
 * @param {string} description - A brief course description.
 */
const DescriptionSection = ({ introduction, requirements, description }) => (
    <Box>
        {/* Course Title */}
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#365ACA", mb: 2 }}>
            Course Description
        </Typography>

        {/* Introduction Text */}
        <Typography variant="body1" sx={{ textAlign: "justify", color: "#333" }}>
            {introduction}
        </Typography>

        {/* Grid layout for displaying "Requirements" and "Description" side by side */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
            {[
                { title: "Requirements", content: requirements },
                { title: "Description", content: description }
            ].map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                    <Card
                        sx={{
                            borderRadius: "12px", // Rounded corners for a soft UI look
                            border: "1px solid #E0E0E0", // Subtle border to create separation
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)", // Light shadow effect
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-5px)", // Slight lift effect on hover
                                boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)" // Enhanced shadow on hover
                            }
                        }}
                    >
                        <CardContent
                            sx={{
                                borderRadius: "10px",
                                background: "#F8F8F8",
                                padding: "16px 20px"
                            }}
                        >
                            {/* Icon and Section Title */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <CheckCircle size={20} color="#365ACA" strokeWidth={2} />
                                <Typography variant="h6" fontWeight="bold" sx={{ color: "#365ACA" }}>
                                    {item.title}
                                </Typography>
                            </Box>

                            {/* Section Content */}
                            <Typography variant="body2" sx={{ textAlign: "justify", color: "#555" }}>
                                {item.content}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default DescriptionSection;
