import React from 'react';
import { Box, Grid } from '@mui/material';
import FAQLeftColumn from '../../components/HomePage/Faqs/FAQLeftColumn';
import FAQRightColumn from '../../components/HomePage/Faqs/FAQRightColumn';

const FAQSection = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                p: 4,
                background: 'white',
            }}
        >
            <Grid container xs={12}>
                <Grid item xs={12} md={4}>
                    <FAQLeftColumn />
                </Grid>
                <Grid item xs={12} md={8}>
                    <FAQRightColumn />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FAQSection;
