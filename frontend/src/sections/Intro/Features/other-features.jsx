import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Upload, TestTube2, Library } from "lucide-react";

const main = () => {
    return (
        <Grid container spacing={3}>
            {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Card
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: "rgb(246, 246, 246)",
                            boxShadow: 2,
                            borderColor: "rgb(231, 231, 231)",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%"  // Đảm bảo chiều cao thẻ bằng nhau
                        }}
                    >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Box mb={2}>{feature.icon}</Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" color="rgb(109, 109, 109)">
                                {feature.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

const features = [
    {
        icon: <Upload size={24} />,
        title: "Upload any content",
        description: "From PDFs and YouTube videos to slides and even recorded lectures, learn everything your way."
    },
    {
        icon: <TestTube2 size={24} />,
        title: "Test your knowledge",
        description: "Create and customize flashcards: edit, delete, star, view sources, and more."
    },
    {
        icon: <Library size={24} />,
        title: "Sources Included",
        description: "Retrieve accurate and contextual information from your content."
    }
];

export default main;
