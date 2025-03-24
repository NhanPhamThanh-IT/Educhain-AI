import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, Button } from '@mui/material';

export const Hero = ({ featuresRef }) => {
    const navigate = useNavigate();

    const handleNavigateSeeFeatures = () => {
        if (featuresRef?.current) {
            featuresRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavigateStartLearning = () => {
        navigate('/learning/course');
    };

    return (
        <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h3" sx={{ fontWeight: 550 }}>
                An AI tutor made for you
            </Typography>

            <Typography variant="h6" sx={{ color: 'rgb(109, 109, 109)' }}>
                Learn from an AI tutor that understands your pdfs, youtube videos, and recorded lectures
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="outlined"
                    size="large"
                    sx={{ textTransform: 'none', borderRadius: 50, borderColor: 'rgb(231, 231, 231)', color: 'rgb(18, 18, 18)' }}
                    onClick={handleNavigateSeeFeatures}
                >
                    See Features
                </Button>

                <Button
                    variant="contained"
                    sx={{ textTransform: 'none', borderRadius: 50, bgcolor: 'black', '&:hover': { bgcolor: 'grey.800' } }}
                    size="large"
                    onClick={handleNavigateStartLearning}
                >
                    Start Learning
                </Button>
            </Box>
        </Stack>
    );
};
