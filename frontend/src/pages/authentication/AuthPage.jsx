import { useState } from "react";
import { Card, CardContent, Tabs, Tab, Box, Typography, Divider, IconButton } from "@mui/material";
import { Login, PersonAdd, Google, Facebook, GitHub } from "@mui/icons-material";
import LoginForm from "../../sections/AuthPage/LoginForn";
import SignUpForm from "../../sections/AuthPage/SignUpForm";

const PRIMARY_COLOR = "#365ACA";
const TEXT_COLOR = "#555";

export default function AuthPage() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                "::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: 'url("/AuthPage/AuthPageImage.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(3px)",
                    zIndex: -1,
                },
            }}
        >
            <Card
                sx={{
                    textAlign: "center",
                    borderRadius: 5,
                    px: 3,
                    minWidth: 400,
                    minHeight: 400,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    bgcolor: "rgba(255, 255, 255)",
                }}
            >
                <CardContent sx={{ py: 0 }}>
                    <Tabs
                        value={tabIndex}
                        onChange={(e, newIndex) => setTabIndex(newIndex)}
                        centered
                        sx={{
                            pb: 2,
                            ".MuiTabs-indicator": { backgroundColor: PRIMARY_COLOR },
                            ".MuiTab-root": {
                                textTransform: "none",
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                color: TEXT_COLOR,
                                "&.Mui-selected": { color: PRIMARY_COLOR },
                            },
                        }}
                    >
                        <Tab label="Login" icon={<Login />} iconPosition="start" />
                        <Tab label="Sign Up" icon={<PersonAdd />} iconPosition="start" />
                    </Tabs>

                    <Typography variant="h4" fontWeight={700} color={PRIMARY_COLOR} gutterBottom sx={{ mb: 3, textTransform: "capitalize" }}>
                        {tabIndex === 0 ? "Login to learning" : "Sign up to get started"}
                    </Typography>

                    {tabIndex === 0 ? <LoginForm /> : <SignUpForm />}

                    <Divider sx={{ my: 1 }}>OR</Divider>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                        {[{ icon: Google, bg: "#DB4437" }, { icon: Facebook, bg: "#1877F2" }, { icon: GitHub, bg: "#000" }].map(({ icon: Icon, bg }, index) => (
                            <IconButton key={index} sx={{ bgcolor: bg, color: "white", ":hover": { transform: "scale(1.1)", bgcolor: `${bg}CC` } }}>
                                <Icon fontSize="medium" />
                            </IconButton>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Box >
    );
}
