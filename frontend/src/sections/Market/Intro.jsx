import React from "react";
import { Box, Typography, Button, TextField, InputAdornment, Avatar, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const AvatarGroup = () => (
    <Stack direction="row" spacing={-1}>
        {["/Coursepage/Intro1.png", "/CoursesDocs/Intro2.png"].map((src, index) => (
            <Avatar key={index} src={src} sx={{ width: 32, height: 32, border: "2px solid white" }} />
        ))}
    </Stack>
);

const IntroSection = () => (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(to right, #f8f9ff, #b0a8f8)", padding: "4rem 8rem", borderRadius: "12px", minHeight: "80vh" }}>
        <Box sx={{ maxWidth: "50%" }}>
            <Button variant="contained" sx={{ backgroundColor: "#d6caff", color: "#333", mb: 2 }}>
                Learn & Earn with Educhain Token!
            </Button>
            <Typography variant="h3" fontWeight={700} gutterBottom>
                Access Exclusive Courses From Top Creators
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                A marketplace for knowledge—connect, create, and grow.
            </Typography>
            <TextField
                placeholder="What do you want to learn today?"
                variant="outlined"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#fff", borderRadius: "8px" }}
                InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon color="primary" /></InputAdornment>) }}
            />
        </Box>
        <Box sx={{ position: "relative" }}>
            <Stack direction="row" spacing={2} sx={{ position: "absolute", top: "-20px", left: "-40px" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>2k+ Students</Typography>
                <AvatarGroup />
            </Stack>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {["/CoursesDocs/Intro1.png", "/CoursesDocs/Intro2.png"].map((src, index) => (
                    <Avatar key={index} src={src} sx={{ width: index === 0 ? 120 : 150, height: index === 0 ? 120 : 150, borderRadius: "16px" }} />
                ))}
            </Box>
            <Typography variant="h5" sx={{ mt: 2, color: "green", fontWeight: "bold" }}>5.8k Success Courses</Typography>
        </Box>
    </Box>
);

export default IntroSection;
