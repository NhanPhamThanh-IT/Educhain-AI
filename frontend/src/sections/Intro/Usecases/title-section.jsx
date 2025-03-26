import React from "react";
import { Box, Typography } from "@mui/material";

const main = () => {
    return (
        <Box textAlign="center" mb={4}>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textTransform: "none", userSelect: "none" }}>
                Built for any use case
            </Typography>
            <Typography color="text.secondary" sx={{ userSelect: "none" }}>
                Click on a learning content below, and start your learning journey ⤵
            </Typography>
        </Box>
    )
}

export default main;