import React from 'react';
import {
    Container,
    Box,
} from '@mui/material';
import { Hero } from './components/index';

const Introduction = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'inherit',
            }}
        >
            <Container maxWidth="xl">
                <Hero />
            </Container>
        </Box>
    );
}

export default Introduction;