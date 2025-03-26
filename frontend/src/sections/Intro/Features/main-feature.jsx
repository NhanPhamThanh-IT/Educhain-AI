import { Box, Card, Typography } from '@mui/material';
import { MessageSquare } from 'lucide-react';

const Main = () => {
    return (
        <Card sx={{ p: 4, borderRadius: 4, borderColor: "rgb(231, 231, 231)", boxShadow: 2, }}>
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={4}>
                {/* Cột nội dung */}
                <Box>
                    <Box mb={2}><MessageSquare size={24} /></Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ userSelect: "none"}}>
                        Earn and Learn with Educhain Token
                    </Typography>
                    <Typography variant="body2" color="rgb(109, 109, 109)" sx={{ userSelect: "none" }}>
                        Exchange cryptocurrency for Educhain Token to access and sell courses, creating a rewarding ecosystem.
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