import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box component="footer" sx={{
            backgroundColor: "#1e1e1e",
            color: "#fff",
            py: 4,
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Logo & Description */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>EduchanAI</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Providing advanced technology solutions to help businesses grow sustainably.
                        </Typography>
                    </Grid>

                    {/* Links */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Links</Typography>
                        <Box sx={{ mt: 1 }}>
                            <Link href="/about-us" color="inherit" display="block" sx={{ mb: 1 }}>About Us</Link>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>Services</Link>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>Support</Link>
                            <Link href="#" color="inherit" display="block">Contact</Link>
                        </Box>
                    </Grid>

                    {/* Social Media */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Connect with Us</Typography>
                        <Box sx={{ mt: 1 }}>
                            <IconButton color="inherit" href="#" sx={{ mx: 0.5 }}>
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit" href="#" sx={{ mx: 0.5 }}>
                                <Twitter />
                            </IconButton>
                            <IconButton color="inherit" href="#" sx={{ mx: 0.5 }}>
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit" href="#" sx={{ mx: 0.5 }}>
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box sx={{ textAlign: "center", mt: 3, borderTop: "1px solid #444", pt: 2 }}>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
