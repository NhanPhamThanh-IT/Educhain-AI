import React from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';

import Page from '../components/Page';
import BubbleBackground from '../components/animate/BubbleBackground';
import SectionTitle from '../components/AboutUs/SectionTitle';
import TeamIntroduction from '../sections/AboutUs/TeamIntroduction';

import { fadeIn } from '../utils/motionVariants';

const MainContent = () => (
    <Container maxWidth="xl" sx={{ pt: 8 }}>
        <Stack alignItems="center" textAlign="center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <SectionTitle title="About SoftAI" />
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: 900, textAlign: 'justify' }}>
                    We are a team of third-year and fourth-year students from the University of Science, Vietnam National University, Ho Chi Minh City, majoring in Software Engineering and Artificial Intelligence. Driven by a passion for technology and digital transformation, especially in AI and Web3 development, we aspire to harness our knowledge and energy to pursue this shared ambition with boundless enthusiasm and dedication.
                </Typography>
            </motion.div>
        </Stack>

        {/* Team introduction */}
        <TeamIntroduction />
    </Container>
);

export default function AboutUs() {
    return (
        <Page title="About Us">
            <BubbleBackground />
            <Box sx={{ background: 'transparent', minHeight: '100vh', py: 8 }}>
                <MainContent />
            </Box>
        </Page>
    );
}
