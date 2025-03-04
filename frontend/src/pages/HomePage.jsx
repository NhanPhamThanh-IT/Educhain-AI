import React from "react";
import { Box } from "@mui/material";
import Page from "../components/Page";
import IntroSection from "../sections/Intro/Introduction";
import BenefitsSection from "../sections/Intro/Benefits";
import RecommendedCourses from "../sections/Intro/RecommendedCourses";
import ExchangeRate from "../sections/Intro/ExchangeRate";
import FAQSection from "../sections/Intro/FAQ";

const HomePage = () => {
    return (
        <Page title="Homepage">
            <Box maxWidth="2xl" sx={{ mt: 13 }}>
                <IntroSection />
                <BenefitsSection />
                <RecommendedCourses />
                <ExchangeRate />
                <FAQSection />
            </Box>
        </Page>
    );
};

export default HomePage;