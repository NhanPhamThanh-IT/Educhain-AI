import React from 'react';
import { Typography, Stack, Button } from '@mui/material';

export function Hero() {
    return (
        <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h3" component="h3" sx={{ fontWeight: 550 }}>
                An AI tutor made for you
            </Typography>

            <Typography variant="h6" sx={{ color: 'rgb(109, 109, 109)'}}>
                Learn from an AI tutor that understands your pdfs, youtube videos, and recorded lectures
            </Typography>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mt: 4 }}
            >
                <Button
                    variant="outlined"
                    size="large"
                    sx={{ textTransform: 'none', borderRadius: 50, borderColor: 'rgb(231, 231, 231)', color: 'rgb(18, 18, 18)' }}
                >
                    See features
                </Button>
                <Button
                    variant="contained"
                    sx={{ textTransform: 'none', borderRadius: 50, bgcolor: 'black', '&:hover': { bgcolor: 'grey.800' } }}
                    size="large"
                >
                    Get Started
                </Button>
            </Stack>
        </Stack>
    );
}