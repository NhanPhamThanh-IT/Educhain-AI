import { Box, Typography } from "@mui/material";

const LearningOutcomesSection = () => (
    <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
            WHAT YOU'LL LEARN
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </Typography>
        <img src="https://source.unsplash.com/800x400/?students,learning" alt="students" style={{ width: "100%", marginTop: 16 }} />);
    </Box>
);

export default LearningOutcomesSection;