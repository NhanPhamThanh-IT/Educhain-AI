import React from "react";
import { Box, Typography } from "@mui/material";
import { FeatureBackground } from "./FeatureBackground";
import { SocialProof } from "./SocialProof";
import { constants } from "./constants";
import { AuthDropdown } from "./AuthDropdown";

export const Hero = () => {
    return (
        <Box position="relative" textAlign="center" p={5} minHeight="60vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <FeatureBackground />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2, userSelect: "none" }}>
                <Typography variant="h4" color="#1976d2" fontWeight={"bold"}>Edu</Typography>
                <Typography variant="h4" color="black" fontWeight={"bold"}>Chain</Typography>
            </Box>
            <Typography variant="h3" fontWeight={700} sx={{ userSelect: "none" }}>
                {constants.abstract}
            </Typography>
            <Typography variant="h6" color="textSecondary" mt={2} sx={{ userSelect: "none" }}>
                {constants.description}
            </Typography>
            <SocialProof />
            <AuthDropdown />
        </Box>
    );
};
