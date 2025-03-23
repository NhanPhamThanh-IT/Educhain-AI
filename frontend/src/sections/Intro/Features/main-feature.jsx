import { Box, Card, Typography } from '@mui/material';
import { MessageSquare } from 'lucide-react';

const Main = () => {
    return (
        <Card sx={{ p: 4, borderRadius: 4, borderColor: "rgb(231, 231, 231)", bgcolor: "rgb(246, 246, 246)", mb: 4, boxShadow: 2,  }}>
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={4}>
                {/* Cột nội dung */}
                <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <MessageSquare size={24} />
                        <Typography variant="subtitle1" fontWeight="bold">
                            Summary, chat, voice mode, and more.
                        </Typography>
                    </Box>
                    <Typography color="rgb(109, 109, 109)" mb={3} variant='body2'>
                        Understand the key points, ask questions with content references, and talk with an AI tutor.
                    </Typography>
                </Box>
                {/* Cột hình ảnh */}
                <Box>
                    <Box
                        component="img"
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                        alt="Students collaborating"
                        sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
                    />
                </Box>
            </Box>
        </Card>
    );
};

export default Main;