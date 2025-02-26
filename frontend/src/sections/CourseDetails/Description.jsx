import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const DescriptionSection = () => (
    <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
            COURSE DESCRIPTION
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat aute irure dolor in reprehenderit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat aute irure dolor in reprehenderit.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
            {["Requirements", "Description"].map((title) => (
                <Grid item xs={12} md={6} key={title}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{title}</Typography>
                            <Typography variant="body2">
                                Dui id ornare arcu odio ut sem nulla pharetra diam eget aliquet...
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default DescriptionSection;