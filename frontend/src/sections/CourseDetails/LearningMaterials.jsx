import React from 'react';
import { Box, Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LearningMaterialsSection = () => (
    <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
            LEARNING MATERIALS
        </Typography>
        {["Documents", "Lessons", "Quizzes", "Video"].map((category) => (
            <Accordion key={category} sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {["Slide1_Introduction to Web Design", "Slide2_Web design fundamental", "Slide3_Design model"].map((item) => (
                            <ListItem key={item}>{item}</ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        ))}
    </Box>
);

export default LearningMaterialsSection;