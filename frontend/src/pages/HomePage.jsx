import React from "react";
import { Box } from "@mui/material";
import Page from "../components/Page";

import Introduction from "../sections/Intro/Introduction/index";
import Features from "../sections/Intro/Features/index";
import Usecases from "../sections/Intro/Usecases/index";
import LastSection from "../sections/Intro/LastSection/index";

const HomePage = () => {
    return (
        <Page title="Homepage">
            <Box maxWidth="2xl">
                <Introduction />
                <Features />
                <Usecases />
                <LastSection />
            </Box>
        </Page>
    );
};

export default HomePage;