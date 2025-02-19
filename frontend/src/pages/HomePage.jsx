import React from "react";
import { Container } from "@mui/material";
import IntroSection from "../sections/HomePage/Introduction";
import BenefitsSection from "../sections/HomePage/Benefits";
import RecommendedCourses from "../sections/HomePage/RecommendedCourses";
import ExchangeRate from "../sections/HomePage/ExchangeRate";
import FAQSection from "../sections/HomePage/FAQ";

const Homepage = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 15 }}>
            <IntroSection />
            <BenefitsSection />
            <RecommendedCourses />
            <ExchangeRate />
            <FAQSection />
        </Container>
    );
};

export default Homepage;