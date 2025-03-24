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
export default function Test() {
    const {
        TOKEN_ICO,
        BUY_TOKEN,
        account,
        loader,
        CONNECT_WALLET,
        currency,
        notifyError,
        notifySuccess,
    } = useContext(TOKEN_ICO_Context);

    const [ethAmount, setEthAmount] = useState("");
    const [tokenAmount, setTokenAmount] = useState("");
    const [tokenDetails, setTokenDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [testLoading, setTestLoading] = useState(false);

    // Fetch token details on mount
    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                setLoading(true);
                const data = await TOKEN_ICO();
                if (data) {
                    setTokenDetails(data);
                } else {
                    notifyError("Failed to load token details. Please make sure you're connected to the correct network.");
                }
            } catch (error) {
                console.error("Failed to fetch token data:", error);
                notifyError("Error loading token details. Please check your wallet connection.");
            } finally {
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

    // Add test purchase function
    const handleTestPurchase = async () => {
        try {
            setTestLoading(true);
            if (!account) {
                await CONNECT_WALLET();
                return;
            }

            // Test with 0.1 MATIC
            const testMaticAmount = 0.1;
            if (tokenDetails) {
                const pricePerToken = Number(tokenDetails.tokenPrice);
                const edtAmount = (testMaticAmount / pricePerToken).toFixed(6);

                const success = await BUY_TOKEN(Number(edtAmount));

                if (success) {
                    notifySuccess(`Successfully purchased ${edtAmount} EDT with ${testMaticAmount} MATIC!`);
                    // Refresh token details
                    const updatedData = await TOKEN_ICO();
                    if (updatedData) {
                        setTokenDetails(updatedData);
                    }
                }
            }
        } catch (error) {
            console.error("Test purchase failed:", error);
            notifyError("Test purchase failed. Please try again.");
        } finally {
            setTestLoading(false);
        }
    };

    return (
        <Page title="Test Exchange" sx={{ mt: 7 }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : !tokenDetails ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="error">
                        Failed to load token details. Please:
                    </Typography>
                    <Typography component="ul" sx={{ mt: 2, textAlign: 'left' }}>
                        <li>Make sure MetaMask is installed and connected</li>
                        <li>Switch to Polygon Amoy testnet</li>
                        <li>Have some MATIC in your wallet for gas</li>
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()}
                        sx={{ mt: 2 }}
                    >
                        Retry
                    </Button>
                </Box>
            ) : (
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
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Test Purchase Section */}
                    <Box
                        sx={{
                            mt: 4,
                            mx: 4,
                            p: 3,
                            bgcolor: '#f5f5f5',
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            🧪 Quick Test Purchase
                        </Typography>

                        <Card sx={{ p: 3, width: '100%', maxWidth: 500 }}>
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography>
                                        Test Amount: 0.1 MATIC
                                    </Typography>
                                    {tokenDetails && (
                                        <Typography>
                                            ≈ {(0.1 / Number(tokenDetails.tokenPrice)).toFixed(6)} EDT
                                        </Typography>
                                    )}
                                </Box>

                                {tokenDetails && (
                                    <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                                        <Typography variant="body2">
                                            Your MATIC Balance: {Number(tokenDetails.maticBal).toFixed(4)} MATIC
                                        </Typography>
                                        <Typography variant="body2">
                                            Your EDT Balance: {Number(tokenDetails.tokenBal).toFixed(4)} EDT
                                        </Typography>
                                        <Typography variant="body2">
                                            Price: 1 EDT = {Number(tokenDetails.tokenPrice).toFixed(4)} MATIC
                                        </Typography>
                                    </Box>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleTestPurchase}
                                    disabled={testLoading || loader}
                                    sx={{
                                        height: 48,
                                        bgcolor: '#6b46c1',
                                        '&:hover': { bgcolor: '#553c9a' },
                                    }}
                                >
                                    {testLoading || loader ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : account ? (
                                        "Test Buy with 0.1 MATIC"
                                    ) : (
                                        "Connect Wallet"
                                    )}
                                </Button>
                            </Stack>
                        </Card>
                    </Box>
                </Box>
            )}
        </Page>
    );
}