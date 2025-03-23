import React from 'react';
import {
    Container,
    Box,
    Stack,
} from '@mui/material';
import { Hero } from './HeroSection';
import { SocialProof } from './SocialProof';

const Introduction = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'background.default',
            }}
        >
            <Container>
                <Stack spacing={4} alignItems="center">
                    <Hero />
                    <SocialProof />
                </Stack>
            </Container>
        </Box>
    );
}

export default Introduction;