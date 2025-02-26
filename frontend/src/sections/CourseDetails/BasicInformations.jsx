import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Edit, EditCalendar, Star, MilitaryTech, Group, AccessTime, Info } from "@mui/icons-material";

const courseInfo = [
    { icon: Edit, value: "VBI", bg: "rgba(234, 246, 255, 1)", color: 'rgba(27, 117, 232, 1)' },
    { icon: EditCalendar, value: "2021-09-01", bg: 'rgba(235, 244, 255, 1)', color: 'rgba(27, 117, 232, 1)' },
    { icon: Star, value: 4, bg: 'rgba(238, 251, 245, 1)', color: 'rgba(0, 188, 101, 1)' },
    { icon: MilitaryTech, value: "Beginner", bg: 'rgba(255, 250, 239, 1)', color: 'rgba(242, 167, 0, 1)' },
    { icon: Group, value: 1000, bg: 'rgba(255, 247, 239, 1)', color: 'rgba(209, 105, 0, 1)' },
    { icon: AccessTime, value: "2 hours", bg: 'rgba(255, 240, 248, 1)', color: 'rgba(187, 0, 100, 1)' }
];

const BasicInformationsSection = () => (
    <Grid container spacing={4} sx={{ my: 4 }}>
        <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img src="CourseDetails/courseimage.png" alt="Course" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant="h4" fontSize={25} fontWeight="bold" sx={{ color: "rgba(54, 90, 202, 1)" }}>VBI WEB DESIGN TUTORIAL</Typography>
                        <Typography variant="body1" sx={{ mt: 2, textAlign: "justify", color: "text.secondary" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget velit ac nulla venenatis suscipit.</Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" sx={{ bgcolor: "rgba(54, 90, 202, 1)", fontWeight: "bold", borderRadius: 3, py: 1.5, px: 3, mt: 3, "&:hover": { bgcolor: "primary.dark" } }} aria-label="Enroll in VBI Web Design Tutorial">Enroll Now</Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
            <Box sx={{ borderRadius: 3, bgcolor: "background.default" }}>
                <Typography alignContent="center" variant="h4" fontSize={25} fontWeight="bold" sx={{ mb: 2, color: "rgba(54, 90, 202, 1)", borderBottom: "solid rgba(54, 90, 202, 1) 2px" }}><Info /> COURSE INFORMATION</Typography>
                <Grid container spacing={2}>
                    {courseInfo.map((item, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, bgcolor: item.bg }}>
                                <item.icon sx={{ fontSize: 30, color: item.color }} />
                                <Typography variant="body1" sx={{ color: item.color, fontWeight: 600, fontSize: 16, textAlign: 'center' }}>{item.value}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Grid>
    </Grid>
);

export default BasicInformationsSection;
