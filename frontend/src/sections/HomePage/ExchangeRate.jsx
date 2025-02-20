import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import RightColumn from "../../components/HomePage/ExchangeRate/RightColumn";
import LeftColumn from "../../components/HomePage/ExchangeRate/LeftColumn";

const ExchangeRate = () => {
    const [page, setPage] = useState(1);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                p: 4,
                background: 'white',
            }}
        >
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <LeftColumn />
                </Grid>
                <Grid item xs={12} md={8}>
                    <RightColumn page={page} setPage={setPage} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExchangeRate;
