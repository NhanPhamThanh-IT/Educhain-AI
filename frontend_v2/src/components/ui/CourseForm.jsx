// Description: Course Form Component

// Import React & MUI
import React, { memo } from "react";
import { TextField, Autocomplete, Grid } from "@mui/material";

// Course Categories
const categories = ["Information Technology", "Computer Science", "Business", "Design", "Marketing"];

const CourseForm = memo(({ courseName, category, introduction, description, setCourseData, errors }) => {
    // Handle Input Change
    const handleChange = (field) => (event, value) => {
        setCourseData(field, value ?? event.target.value);
    };

    return (
        <Grid container spacing={3}>
            {/* Course Name */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="Course Name"
                    variant="outlined"
                    value={courseName}
                    onChange={handleChange("courseName")}
                    error={!!errors.courseName}
                    helperText={errors.courseName}
                    sx={styles.input}
                />
            </Grid>

            {/* Course Category */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Autocomplete
                    options={categories}
                    value={category}
                    onChange={handleChange("category")}
                    renderInput={(params) => (
                        <TextField {...params} label="Category" error={!!errors.category} helperText={errors.category} sx={styles.input} />
                    )}
                />
            </Grid>

            {/* Course Introduction */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="Course Introduction"
                    multiline
                    rows={3}
                    value={introduction}
                    onChange={handleChange("introduction")}
                    error={!!errors.introduction}
                    helperText={errors.introduction}
                    sx={styles.input}
                />
            </Grid>

            {/* Course Description */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="Course Description"
                    multiline
                    rows={3}
                    value={description}
                    onChange={handleChange("description")}
                    error={!!errors.description}
                    helperText={errors.description}
                    sx={styles.input}
                />
            </Grid>
        </Grid>    );
}, (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    return prevProps.courseName === nextProps.courseName &&
           prevProps.category === nextProps.category &&
           prevProps.introduction === nextProps.introduction &&
           prevProps.description === nextProps.description &&
           JSON.stringify(prevProps.errors) === JSON.stringify(nextProps.errors);
});

// Styles Object
const styles = {
    input: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(54, 90, 202, 1)" },
            "&.Mui-focused": { boxShadow: "none" },
        },
    },
};

export default CourseForm;
