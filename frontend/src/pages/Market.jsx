import React from "react";
import { Container } from "@mui/material";
import IntroSection from "../sections/Market/Intro";
import CategorySection from "../sections/Market/Categories";
import ListCourses from "../sections/Market/ListCourses";
import Page from "../components/Page";

const Market = () => {
    return (
        <Page title="Courses&Docs">
            <Container maxWidth="xl" sx={{ mt: 5 }}>
                <IntroSection />
                <CategorySection />
                <ListCourses title="Highly Recommended Courses" subcontent="Edunity Course Student Can Join With Us!" />
                <ListCourses title="Courses For You" subcontent="Course Tailored Just For You!" />
                <ListCourses title="Top Popular Course" subcontent="Course Tailored Just For You!" />
            </Container>
        </Page>
    );
};

export default Market;