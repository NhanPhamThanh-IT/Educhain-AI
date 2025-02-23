import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box component="footer" sx={{
            backgroundColor: "#1e1e1e",
            color: "#fff",
            py: 4,
            mt: 4
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Logo & Description */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>MyCompany</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Cung cấp giải pháp công nghệ tiên tiến giúp doanh nghiệp phát triển bền vững.
                        </Typography>
                    </Grid>

                    {/* Links */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Liên kết</Typography>
                        <Box sx={{ mt: 1 }}>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>Về chúng tôi</Link>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>Dịch vụ</Link>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>Hỗ trợ</Link>
                            <Link href="#" color="inherit" display="block">Liên hệ</Link>
                        </Box>
                    </Grid>

                    {/* Social Media */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Kết nối với chúng tôi</Typography>
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