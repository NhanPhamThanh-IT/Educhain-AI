import React from "react";
import { Box } from "@mui/material";
import Page from "../components/Page";
import Introduction from "../sections/Intro/Introduction/index";
import Features from "../sections/Intro/Features/index";

const HomePage = () => {
    return (
        <Page title="Homepage">
            <Box maxWidth="2xl">
                <Introduction />
                <Features />
            </Box>
        </Page>
    );
};

export default HomePage;