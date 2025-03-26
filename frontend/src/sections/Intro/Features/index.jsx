import React from "react";
import { Box } from "@mui/material";

import TitleSection from "./title-section";
import MainFeature from "./main-feature";
import OtherFeatures from "./other-features";
import BonusFeatures from "./bonus-features";

const main = () => {
    return (
        <Box maxWidth="md" mx="auto" p={3} pt={8} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <TitleSection />
            <MainFeature />
            <OtherFeatures />
            <BonusFeatures />
        </Box>
    );
};

export default main;
