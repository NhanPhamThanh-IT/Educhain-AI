import React from "react";
import { Box, Button, Typography, Grid, Card, Avatar } from "@mui/material";
import { green, red } from "@mui/material/colors";
import cryptocurrencies from "../../constants/HomePage/cryptocurrencies";

const ExchangeRate = () => {
    return (
        <Box sx={{ p: 4, display: "flex", gap: 4, alignItems: "flex-start" }}>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h3" fontWeight="bold">Exchange Rate</Typography>
                <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>
                    Stay updated with the latest exchange rates for Educhain Token. Our platform ensures transparency and accuracy, helping you make informed decisions when converting cryptocurrency.
                </Typography>
                <Button variant="outlined" sx={{ mt: 3 }}>Get your Educhain Token!</Button>
            </Box>

            <Box sx={{ flex: 1 }}>
                <Grid container spacing={2}>
                    {cryptocurrencies.map((crypto, index) => (
                        <Grid item xs={12} key={index}>
                            <Card variant="outlined" sx={{ display: "flex", alignItems: "center", p: 2 }}>
                                <Avatar sx={{ bgcolor: "transparent", fontSize: 24 }}>{crypto.icon}</Avatar>
                                <Box sx={{ flexGrow: 1, ml: 2 }}>
                                    <Typography fontWeight="bold">{crypto.name}</Typography>
                                    <Typography variant="body2" color="gray">{crypto.symbol}</Typography>
                                </Box>
                                <Box textAlign="right">
                                    <Typography fontWeight="bold">{crypto.price}</Typography>
                                    <Typography sx={{ color: crypto.change.startsWith("+") ? green[500] : red[500] }}>
                                        {crypto.change}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button variant="outlined" sx={{ mt: 2, display: "block", mx: "auto" }}>More</Button>
            </Box>
        </Box>
    );
};

export default ExchangeRate;
