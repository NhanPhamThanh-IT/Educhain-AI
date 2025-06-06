import { Box, Button, Grid, Typography, Link } from "@mui/material";
import { CurrencyExchange } from "@mui/icons-material";
import { ArrowUpDown, Wallet } from "lucide-react";
import exchangeCard from "/Exchange/exchange_card.png";

const headerStyles = {
    container: {
        background: "linear-gradient(135deg, #E3EAFD, #F8F9FF)",
        p: 4,
    },
    title: {
        background: "linear-gradient(to right, #365ACA, #567EDC)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: { xs: "2rem", md: "3rem" },
        display: "flex",
        alignItems: "center",
        gap: 1,
    },
    description: {
        color: "#333",
        fontSize: "1.2rem",
        lineHeight: "1.6",
        maxWidth: "90%",
        textAlign: "justify",
    },
    button: {
        color: "#365ACA",
        borderColor: "#365ACA",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "1rem",
        boxShadow: "0px 4px 8px rgba(54, 90, 202, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": { backgroundColor: "#365ACA", color: "#fff" },
    },
};

const ExchangeHeader = () => {
    return (
        <Box sx={headerStyles.container}>
            <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom sx={headerStyles.title}>
                        <CurrencyExchange sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, color: "#FFC107" }} />
                        Exchange Your<br />EDT Tokens
                    </Typography>
                    <Typography variant="body1" sx={headerStyles.description}>
                        Convert your Educhain Tokens to other cryptocurrencies or fiat currencies. Fast, secure, and easy exchange process with competitive rates!
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowUpDown size={20} />}
                            sx={headerStyles.button}
                            component={Link}
                            href="/exchange"
                        >
                            <Typography textTransform="capitalize">Start Exchange</Typography>
                        </Button>
                        <Typography variant="body2" sx={{ color: "#333", fontSize: "1rem", lineHeight: "1.6" }}>or</Typography>
                        <Button
                            variant="outlined"
                            startIcon={<Wallet size={20} />}
                            sx={headerStyles.button}
                            component={Link}
                            href="/wallet"
                        >
                            <Typography textTransform="capitalize">View Wallet</Typography>
                        </Button>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box component="img" src={exchangeCard} alt="Exchange Card" sx={{ width: "100%" }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ExchangeHeader;
