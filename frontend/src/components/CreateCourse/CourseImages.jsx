// Description: Course Images Upload Component
// This component allows users to upload up to 5 images for their course. 
// Uploaded images are displayed in a grid layout with preview thumbnails. 
// The images are stored using object URLs for temporary rendering.

// Import React & MUI
import React, { useCallback } from "react";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

const MAX_IMAGES = 5;

const CourseImages = ({ courseImages, setCourseData }) => {
    // Handle Image Upload
    const handleImageUpload = useCallback((event) => {
        const files = Array.from(event.target.files);
        if (files.length + courseImages.length > MAX_IMAGES) {
            alert(`You can only upload up to ${MAX_IMAGES} images.`);
            return;
        }
        const newImages = files.map((file) => URL.createObjectURL(file));
        setCourseData("courseImages", [...courseImages, ...newImages]);
    }, [courseImages, setCourseData]);

    return (
        <>
            {/* Title */}
            <Typography sx={styles.title}>Course Images</Typography>

            {/* Upload Box */}
            <Box sx={styles.uploadBox}>
                <input accept="image/*" type="file" multiple onChange={handleImageUpload} hidden id="image-upload" />
                <label htmlFor="image-upload">
                    <IconButton component="span">
                        <AddPhotoAlternate fontSize="large" sx={styles.icon} />
                    </IconButton>
                </label>
            </Box>

            {/* Display Uploaded Images */}
            <Grid container spacing={1} sx={{ mt: 2 }}>
                {courseImages.map((src, index) => (
                    <Grid item key={index}>
                        <img src={src} alt="Course" width={80} height={50} style={styles.image} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

// Styles Object
const styles = {
    title: { fontWeight: "bold", color: "rgba(54, 90, 202, 1)" },
    uploadBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        border: "2px dashed rgba(54, 90, 202, 1)",
        mt: 1,
        borderRadius: 2,
    },
    icon: { color: "rgba(54, 90, 202, 1)" },
    image: {
        border: "1px solid rgba(54, 90, 202, 1)",
        borderRadius: 5,
    },
};

export default CourseImages;
