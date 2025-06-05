import { Box, Typography } from "@mui/material";
import { memo } from 'react';

const TitleSection = memo(({ title, description }) => {
    return (
        <Box textAlign="center" mb={4}>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textTransform: "none", userSelect: "none" }}>
                {title}
            </Typography>
            <Typography color="text.secondary" sx={{ userSelect: "none" }}>
                {description}
            </Typography>
        </Box>
    );
});

export default TitleSection;