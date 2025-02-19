import React from "react";
import { Box } from "@mui/material";
import IntroSection from "../sections/HomePage/Introduction";
import BenefitsSection from "../sections/HomePage/Benefits";
import RecommendedCourses from "../sections/HomePage/RecommendedCourses";
import ExchangeRate from "../sections/HomePage/ExchangeRate";
import FAQSection from "../sections/HomePage/FAQ";

const Homepage = () => {
    return (
        <Box maxWidth="2xl" sx={{ mt: 13}}>
            <IntroSection />
            <BenefitsSection />
            <RecommendedCourses />
            <ExchangeRate />
            <FAQSection />
        </Box>
    );
};

export default Homepage;