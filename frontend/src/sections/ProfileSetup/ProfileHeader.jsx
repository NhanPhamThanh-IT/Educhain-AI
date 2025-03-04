import React from "react";
import { Box, Typography, Avatar, Paper, Grid, Divider } from "@mui/material";
import { Mail, User } from "lucide-react";

const ProfileHeader = ({ userData }) => (
    <Paper
        elevation={8}
        sx={{
            p: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, #1D2671, #C33764)",
            color: "white",
            mx: "auto",
            textAlign: "center",
        }}
    >
        <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={5} display="flex" flexDirection="column" alignItems="center">
                <Avatar
                    src={userData.avatar}
                    sx={{
                        width: 140,
                        height: 140,
                        border: "5px solid white",
                        boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.2)",
                        transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                        "&:hover": {
                            transform: "scale(1.1)",
                            boxShadow: "0px 12px 24px rgba(255, 255, 255, 0.4)",
                        },
                    }}
                />
                <Box mt={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <User size={20} />
                        <Typography textAlign="center" variant="h5" fontWeight={700} sx={{ letterSpacing: 1 }}>
                            {userData.fullname}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Mail size={18} />
                        <Typography textALign="center" variant="body2" fontWeight={400} sx={{ opacity: 0.8 }}>
                            {userData.email[0].address}
                        </Typography>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} sm={7}>
                <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: 1 }}>
                    {userData.title || "Welcome to your dashboard"}
                </Typography>
                <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.2)" }} />
                <Typography variant="body1" fontWeight={400} sx={{ opacity: 0.85, lineHeight: 1.6 }}>
                    {userData.description || "Manage your profile, track your activities, and explore new features."}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
);

export default ProfileHeader;
