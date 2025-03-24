// Importing React and necessary MUI components
import React from 'react';
import { Container, Box } from '@mui/material';

// Importing built-in components
import Page from '../../components/Page';
import TeamIntroduction from '../../sections/AboutUs/TeamIntroduction';

// Main content of the About Us page
const MainContent = () => (
    <Container maxWidth="xl" sx={{ py: 8 }}>

        {/* Team introduction */}
        <TeamIntroduction />

    </Container>
);

// About Us page
export default function AboutUs() {
    return (
        <Page title="About Us">
            <Box sx={{ background: 'transparent', minHeight: '100vh', py: 8 }}>
                <MainContent />
            </Box>
        </Page>
    );
}
