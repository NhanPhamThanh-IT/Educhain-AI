import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Stack,
    Typography,
    Button,
    Card,
    Avatar,
    TextField,
    InputAdornment,
    Grid,
    CircularProgress,
} from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import Page from "../components/Page"; // Assuming this is your layout wrapper
import { TOKEN_ICO_Context } from "../context/index";

// ExchangeCoin component for ETH to EduToken
export default function ExchangeCoin() {
    const {
        TOKEN_ICO,
        BUY_TOKEN,
        account,
        loader,
        CONNECT_WALLET,
        currency,
    } = useContext(TOKEN_ICO_Context);

    const [ethAmount, setEthAmount] = useState("");
    const [tokenAmount, setTokenAmount] = useState("");
    const [tokenDetails, setTokenDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch token details on mount
    useEffect(() => {
        const fetchTokenData = async () => {
            const data = await TOKEN_ICO();
            if (data) {
                setTokenDetails(data);
                setLoading(false);
            }
        };
        fetchTokenData();
    }, [TOKEN_ICO]);

    // Calculate token amount based on ETH input
    const handleEthChange = (e) => {
        const eth = e.target.value;
        setEthAmount(eth);
        if (tokenDetails && eth) {
            const pricePerToken = Number(tokenDetails.tokenPrice);
            const tokens = eth / pricePerToken;
            setTokenAmount(tokens.toFixed(6));
        } else {
            setTokenAmount("");
        }
    };

    // Handle exchange (buy tokens)
    const handleExchange = async () => {
        if (!account) {
            await CONNECT_WALLET();
            return;
        }
        if (tokenAmount && Number(tokenAmount) > 0) {
            await BUY_TOKEN(Number(tokenAmount)); // Pass token amount to BUY_TOKEN
        }
    };

    return (
        <Page title="Exchange Coin" sx={{ mt: 7 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    background: "linear-gradient(to bottom, #e0c3fc, #8ec5fc)",
                    padding: 4,
                }}
            >
                {/* Exchange Box */}
                <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={3}>
                    <Typography variant="h4" fontWeight={700}>
                        Exchange ETH for EduToken
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                        {/* ETH Card */}
                        <Card
                            sx={{
                                p: 2,
                                minWidth: 250,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Avatar
                                    src="/ethereum.png" // Ensure you have an ETH icon in your public folder
                                    alt="Ethereum"
                                    sx={{ width: 32, height: 32 }}
                                />
                                <Typography fontWeight={600}>Ethereum</Typography>
                            </Box>
                            <Typography variant="caption" color="gray">
                                ETH
                            </Typography>
                            <TextField
                                label="ETH Amount"
                                value={ethAmount}
                                onChange={handleEthChange}
                                sx={{ m: 1, width: "25ch" }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">ETH</InputAdornment>
                                    ),
                                }}
                                type="number"
                                disabled={loader || loading}
                            />
                        </Card>

                        <SwapHoriz fontSize="large" color="primary" />

                        {/* EduToken Card */}
                        <Card
                            sx={{
                                p: 2,
                                minWidth: 250,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Avatar
                                    src="/ecoin.png" // Ensure you have an EduToken icon
                                    alt="EduToken"
                                    sx={{ width: 32, height: 32 }}
                                />
                                <Typography fontWeight={600}>EduToken</Typography>
                            </Box>
                            <Typography variant="caption" color="gray">
                                EDT
                            </Typography>
                            <TextField
                                label="EduToken Amount"
                                value={tokenAmount}
                                sx={{ m: 1, width: "25ch" }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">EDT</InputAdornment>
                                    ),
                                }}
                                disabled
                            />
                        </Card>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleExchange}
                        disabled={loader || loading || !ethAmount}
                    >
                        {loader ? "Processing..." : account ? "Exchange" : "Connect Wallet"}
                    </Button>
                </Box>

                {/* Exchange Rate Box */}
                <Box
                    p={4}
                    sx={{
                        background: "linear-gradient(to bottom, #fff, #b0c4de)",
                        borderRadius: 3,
                        width: "80%",
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h4" fontWeight={700}>
                                Exchange Rate
                            </Typography>
                            <Typography variant="body1" color="textSecondary" mt={1}>
                                Get the latest rate for EduToken. Convert your ETH to EDT with
                                transparency and ease on the Holesky testnet.
                            </Typography>
                            <Button variant="outlined" sx={{ mt: 2 }} disabled>
                                Testnet Mode
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            {loading ? (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height={200}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : tokenDetails ? (
                                <Box>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        py={1}
                                        borderBottom={1}
                                        borderColor="divider"
                                    >
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar
                                                src="/ecoin.png"
                                                alt="EduToken"
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            <Box>
                                                <Typography fontWeight={600} color="black">
                                                    EduToken
                                                </Typography>
                                                <Typography variant="caption" color="gray">
                                                    EDT
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box textAlign="right">
                                            <Typography fontWeight={600} color="black">
                                                1 EDT = {tokenDetails.tokenPrice} ETH
                                            </Typography>
                                            <Typography color="green">
                                                Available: {tokenDetails.tokenBal} EDT
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ) : (
                                <Typography>Error loading token details.</Typography>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Page>
    );
}