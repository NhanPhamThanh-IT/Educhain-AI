import React from 'react';
import { Box, Typography, Avatar, AvatarGroup } from '@mui/material';
import { Brain, Youtube, FileText, CircleUserRound } from 'lucide-react';

export function SocialProof() {
    return (
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AvatarGroup
                sx={{
                    '& .MuiAvatar-root': { width: 30, height: 30, fontSize: '1rem' },
                }}
            >
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <CircleUserRound size={30} />
                </Avatar>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <FileText size={30} />
                </Avatar>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                    <Youtube size={30} />
                </Avatar>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                    <Brain size={30} />
                </Avatar>
            </AvatarGroup>
            <Typography
                sx={{ ml: 1 }}
                variant="body1"
                color="text.secondary"
            >
                Loved by over 1 million learners
            </Typography>
        </Box>
    );
}