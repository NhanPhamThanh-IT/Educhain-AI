import React from "react";
import { Box, Typography } from "@mui/material";

const main = () => {
    return (
        <Box textAlign="center" mb={4}>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textTransform: "none", userSelect: "none" }}>
                Save hours, learn smarter
            </Typography>
            <Typography color="text.secondary" sx={{ userSelect: "none"}}>
                From key takeaways to specific questions, we’ve got you covered.
            </Typography>
        </Box>
    )
}

export default main;