import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box component="footer" sx={{
            backgroundColor: "#0A1929",
            color: "#fff",
            py: 6,
            position: "relative",
            "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #2196F3, #00BCD4)",
            }
        }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* Company Info */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                mb: 2
                            }}
                        >
                            EduchanAI
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#B2BAC2", mb: 2, lineHeight: 1.7 }}>
                            Empowering education through artificial intelligence. We provide cutting-edge solutions to transform learning experiences and drive educational innovation.
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                            <IconButton
                                color="primary"
                                href="#"
                                sx={{
                                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                                    "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.2)" }
                                }}
                            >
                                <Facebook />
                            </IconButton>
                            <IconButton
                                color="primary"
                                href="#"
                                sx={{
                                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                                    "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.2)" }
                                }}
                            >
                                <Twitter />
                            </IconButton>
                            <IconButton
                                color="primary"
                                href="#"
                                sx={{
                                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                                    "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.2)" }
                                }}
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                color="primary"
                                href="#"
                                sx={{
                                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                                    "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.2)" }
                                }}
                            >
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#fff" }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            <Link
                                href="/about-us"
                                sx={{
                                    color: "#B2BAC2",
                                    textDecoration: "none",
                                    "&:hover": { color: "#2196F3" },
                                    transition: "color 0.3s ease"
                                }}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/services"
                                sx={{
                                    color: "#B2BAC2",
                                    textDecoration: "none",
                                    "&:hover": { color: "#2196F3" },
                                    transition: "color 0.3s ease"
                                }}
                            >
                                Services
                            </Link>
                            <Link
                                href="/support"
                                sx={{
                                    color: "#B2BAC2",
                                    textDecoration: "none",
                                    "&:hover": { color: "#2196F3" },
                                    transition: "color 0.3s ease"
                                }}
                            >
                                Support
                            </Link>
                            <Link
                                href="/contact"
                                sx={{
                                    color: "#B2BAC2",
                                    textDecoration: "none",
                                    "&:hover": { color: "#2196F3" },
                                    transition: "color 0.3s ease"
                                }}
                            >
                                Contact
                            </Link>
                        </Box>
                    </Grid>

                    {/* Contact Info */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#fff" }}>
                            Contact Us
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <LocationOn sx={{ color: "#2196F3" }} />
                                <Typography variant="body2" sx={{ color: "#B2BAC2" }}>
                                    123 Education Street, Tech City, 12345
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Phone sx={{ color: "#2196F3" }} />
                                <Typography variant="body2" sx={{ color: "#B2BAC2" }}>
                                    +1 (555) 123-4567
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Email sx={{ color: "#2196F3" }} />
                                <Typography variant="body2" sx={{ color: "#B2BAC2" }}>
                                    contact@educhanai.com
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                {/* Copyright */}
                <Box sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2
                }}>
                    <Typography variant="body2" sx={{ color: "#B2BAC2" }}>
                        &copy; {new Date().getFullYear()} EduchanAI. All rights reserved.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Link
                            href="/privacy"
                            sx={{
                                color: "#B2BAC2",
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                "&:hover": { color: "#2196F3" }
                            }}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            sx={{
                                color: "#B2BAC2",
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                "&:hover": { color: "#2196F3" }
                            }}
                        >
                            Terms of Service
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;