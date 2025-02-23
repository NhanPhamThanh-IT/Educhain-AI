import React from "react";
import { Grid } from "@mui/material";
import CourseCard from "./CourseCard";

const CourseList = ({ courses }) => {
    return (
        <Grid container spacing={5}>
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </Grid>
    );
};

export default CourseList;
