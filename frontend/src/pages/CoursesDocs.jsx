import React from "react";
import { Container } from "@mui/material";
import IntroSection from "../sections/CoursesDocs/Intro";
import CategorySection from "../sections/CoursesDocs/Categories";
import ListCourses from "../sections/CoursesDocs/ListCourses";

const Homepage = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 15 }}>
            <IntroSection />
            <CategorySection />
            <ListCourses title="Highly Recommended Courses" subcontent="Edunity Course Student Can Join With Us!"/>
            <ListCourses title="Courses For You" subcontent="Course Tailored Just For You!"/>
            <ListCourses title="Top Popular Course" subcontent="Course Tailored Just For You!"/>
        </Container>
    );
};

export default Homepage;