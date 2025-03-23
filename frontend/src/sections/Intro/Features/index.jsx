import React from "react";
import { Box } from "@mui/material";

import MainFeature from "./main-feature";
import OtherFeatures from "./other-features";

const main = () => {
    return (
        <Box maxWidth="lg" mx="auto" p={3}>
            <MainFeature />
            <OtherFeatures />
        </Box>
    );
};

export default main;
