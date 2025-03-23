import React from "react";
import { Box } from "@mui/material";

import TitleSection from "./title-section";
import MainFeature from "./main-feature";
import OtherFeatures from "./other-features";

const main = () => {
    return (
        <Box maxWidth="md" mx="auto" p={3}>
            <TitleSection />
            <MainFeature />
            <OtherFeatures />
        </Box>
    );
};

export default main;
