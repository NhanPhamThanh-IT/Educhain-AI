import { memo, useMemo } from "react";
import { Box, Typography, Avatar, Paper, Grid, Divider } from "@mui/material";
import { Mail, User } from "lucide-react";

// Optimize rendering of the avatar with memoization
const UserAvatar = memo(({ src, sx }) => (
    <Avatar
        src={src}
        sx={sx}
    />
));

// Optimize user info display with memoization
const UserInfo = memo(({ fullname, email }) => (
    <Box mt={2}>
        <Box display="flex" alignItems="center" gap={1}>
            <User size={20} />
            <Typography textAlign="center" variant="h5" fontWeight={700} sx={{ letterSpacing: 1 }}>
                {fullname}
            </Typography>
        </Box>
        {email && (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Mail size={18} />
                <Typography textAlign="center" variant="body2" fontWeight={400} sx={{ opacity: 0.8 }}>
                    {email}
                </Typography>
            </Box>
        )}
    </Box>
));

// Optimize welcome text section with memoization
const WelcomeText = memo(({ title, description }) => (
    <>
        <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: 1 }}>
            {title || "Welcome to your dashboard"}
        </Typography>
        <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.2)" }} />
        <Typography variant="body1" fontWeight={400} sx={{ opacity: 0.85, lineHeight: 1.6 }}>
            {description || "Manage your profile, track your activities, and explore new features."}
        </Typography>
    </>
));

const ProfileHeader = memo(({ userData }) => {
    // Pre-calculate styles for better performance
    const paperStyles = useMemo(() => ({
        p: 4,
        borderRadius: 4,
        background: "linear-gradient(135deg, #1D2671, #C33764)",
        color: "white",
        mx: "auto",
        textAlign: "center",
    }), []);

    const avatarStyles = useMemo(() => ({
        width: 140,
        height: 140,
        border: "5px solid white",
        boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.2)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
        "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0px 12px 24px rgba(255, 255, 255, 0.4)",
        },
    }), []);

    // Get the email address safely
    const emailAddress = useMemo(() => 
        userData.email && 
        Array.isArray(userData.email) && 
        userData.email.length > 0 ? 
            userData.email[0].address : 
            null
    , [userData.email]);

    return (
        <Paper elevation={8} sx={paperStyles}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={5} display="flex" flexDirection="column" alignItems="center">
                    <UserAvatar src={userData.avatar} sx={avatarStyles} />
                    <UserInfo fullname={userData.fullname} email={emailAddress} />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <WelcomeText title={userData.title} description={userData.description} />
                </Grid>
            </Grid>
        </Paper>
    );
});

// Add display names for debugging
ProfileHeader.displayName = "ProfileHeader";
UserAvatar.displayName = "UserAvatar";
UserInfo.displayName = "UserInfo";
WelcomeText.displayName = "WelcomeText";

export default ProfileHeader;
