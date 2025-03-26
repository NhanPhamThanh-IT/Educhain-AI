import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

import { FeatureBackground } from "./FeatureBackground";
import { SocialProof } from "./SocialProof";

import { constants } from "./constants"

export const Hero = () => {
    return (
        <Box position="relative" textAlign="center" p={5} minHeight="60vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <FeatureBackground />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <Typography variant="h5" color="#1976d2" fontWeight={"bold"}>Edu</Typography>
                <Typography variant="h5" color="black" fontWeight={"bold"}>Chain</Typography>
            </Box>
            <Typography variant="h4" fontWeight={700}>
                {constants.abstract}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mt={2}>
                {constants.description}
            </Typography>
            <SocialProof />
            <Button
                variant="contained"
                endIcon={<SchoolIcon />}
                sx={{
                    mt: 4, textTransform: "none", fontWeight: 600, bgcolor: "#1976d2", color: "white",
                    "&:hover": {
                        bgcolor: "transparent",
                    }
                }}
            >
                {constants.button.text}
            </Button>
        </Box>
    );
};
