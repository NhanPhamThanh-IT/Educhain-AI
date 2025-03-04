import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const ProfileHeader = ({ userData }) => (
    <Box>
        <Typography variant="h5" gutterBottom fontWeight={700} color="black">
            Welcome, <span style={{ color: "rgba(54, 90, 202, 1)" }}>{userData.fullname}</span>
        </Typography>
        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
            <Avatar
                src={userData.avatar}
                sx={{ width: 90, height: 90, border: "3px solid rgba(54, 90, 202, 1)" }}
            />
            <Typography variant="h6" fontWeight={600}>
                {userData.fullname}
            </Typography>
        </Box>
    </Box>
);

export default ProfileHeader;
