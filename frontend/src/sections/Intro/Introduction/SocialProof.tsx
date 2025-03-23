import React from 'react';
import { Box, Typography, Avatar, AvatarGroup } from '@mui/material';
import { Brain, Youtube, FileText, CircleUserRound } from 'lucide-react';

export function SocialProof() {
    return (
        <Box sx={{ mt: 8 }}>
            <AvatarGroup
                sx={{
                    '& .MuiAvatar-root': { width: 40, height: 40, fontSize: '1rem' },
                }}
            >
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <CircleUserRound size={20} />
                </Avatar>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <FileText size={20} />
                </Avatar>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                    <Youtube size={20} />
                </Avatar>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                    <Brain size={20} />
                </Avatar>
            </AvatarGroup>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 2 }}
            >
                Loved by over 1 million learners
            </Typography>
        </Box>
    );
}