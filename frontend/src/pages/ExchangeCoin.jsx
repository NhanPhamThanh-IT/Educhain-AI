// components
import Page from "../components/Page";
import React, { useState, useEffect, useContext } from "react";
import { RouterContext } from '../routes/index.jsx'

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

// ----------------------------------------------------------------------

export default function ExchangeCoin() {
  const {
    TOKEN_ICO,
    BUY_TOKEN,
    account,
    loader, // Assuming this loader is for the BUY_TOKEN operation
    ERC20,
    TOKEN_ADDRESS,
    notifyError,
    notifySuccess,
    detail,
    setLoader // Assuming this setLoader is for the BUY_TOKEN operation
  } = useContext(RouterContext);

  const [tokenDetails, setTokenDetails] = useState(null);
  const [transferToken, setTransferToken] = useState(null);
  const [edtAmount, setEdtAmount] = useState("");
  const [maticAmount, setMaticAmount] = useState("");
  const [pageLoading, setPageLoading] = useState(true); // Renamed for clarity, for initial data load

  // Fetch token details
  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true); // Start loading for page data
      try {
        const [icoData, tokenData] = await Promise.all([
          TOKEN_ICO(),
          ERC20(TOKEN_ADDRESS)
        ]);
        setTokenDetails(icoData);
        setTransferToken(tokenData);
      } catch (error) {
        console.error("Failed to fetch token data:", error);
        notifyError("Failed to load token details");
      } finally {
        setPageLoading(false); // Stop loading for page data
      }
    };
    fetchData();
  }, [TOKEN_ICO, ERC20, TOKEN_ADDRESS, notifyError]); // Added dependencies

  // Handle EDT amount change and calculate MATIC needed
  const handleEdtChange = (e) => {
    const edt = e.target.value;
    setEdtAmount(edt);
    if (edt && tokenDetails) {
      const pricePerToken = 0.00001;
      const matic = Number(edt) * pricePerToken;
      setMaticAmount(matic.toFixed(6));
    } else {
      setMaticAmount("");
    }
  };

  // Handle token purchase
  const handleExchange = async () => {
    try {
      if (!edtAmount || Number(edtAmount) <= 0) {
        notifyError("Please enter a valid amount");
        return;
      }

      await BUY_TOKEN(Number(edtAmount));
      notifySuccess(`Successfully purchased ${edtAmount} EDT!`);

      // Refresh data after purchase
      const [newIcoData, newTokenData] = await Promise.all([
        TOKEN_ICO(),
        ERC20(TOKEN_ADDRESS)
      ]);
      setTokenDetails(newIcoData);
      setTransferToken(newTokenData);

      // Clear inputs
      setEdtAmount("");
      setMaticAmount("");

    } catch (error) {
      console.error("Purchase failed:", error);
      notifyError("Failed to purchase tokens");
    }
  };

  if (pageLoading) {
    return (
      <Page title="Exchange coin" sx={{ mt: 7, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Page>
    );
  }

  return (<Page title="Exchange coin" sx={{ mt: 7 }}>
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3} // Increased gap for better spacing
        p={4} // Increased padding
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Brighter, more distinct background
          borderRadius: '16px', // Softer corners
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // More pronounced shadow
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          width: 'auto',
          maxWidth: '700px', // Max width for better layout on wider screens
        }}
      >
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Exchange Tokens
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          {/* MATIC Card */}
          <Card
            sx={{
              p: 2.5, // Adjusted padding
              minWidth: 260, // Adjusted minWidth
              display: "flex",
              flexDirection: "column",
              borderRadius: '12px', // Softer corners for cards
              boxShadow: 'none', // Remove individual card shadow, parent has it
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                src="/sui-coin.png"
                alt="SUI"
                sx={{ width: 32, height: 32 }}
              />
              <Typography fontWeight={600}>SUI</Typography>
            </Box>
            <TextField
              label="SUI Amount"
              value={maticAmount}
              disabled
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">SUI</InputAdornment>
                ),
              }}
            />
          </Card>

          <SwapHoriz fontSize="large" color="primary" />

          {/* Educhain Token Card */}
          <Card
            sx={{
              p: 2.5, // Adjusted padding
              minWidth: 260, // Adjusted minWidth
              display: "flex",
              flexDirection: "column",
              borderRadius: '12px', // Softer corners for cards
              boxShadow: 'none', // Remove individual card shadow, parent has it
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                src="/Partials/Ecoin.png"
                alt="Educhain Token"
                sx={{ width: 32, height: 32 }}
              />
              <Typography fontWeight={600}>Educhain Token</Typography>
            </Box>
            <TextField
              label="EDT Amount"
              type="number"
              value={edtAmount}
              onChange={handleEdtChange}
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">EDT</InputAdornment>
                ),
              }}
            />
          </Card>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleExchange}
          disabled={loader || !edtAmount || Number(edtAmount) <= 0}
        >
          {loader ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Exchange"
          )}
        </Button>

        {/* Token Descriptions */}
        <Box sx={{
          mt: 4,
          p: 2.5,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '12px',
          textAlign: 'left',
          width: '100%',
          // maxWidth: 500 
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            About SUI
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sui is a layer 1 blockchain designed to make digital asset ownership fast, private, secure, and accessible to everyone.
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            About Educhain Token (EDT)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Educhain Token (EDT) is the native utility token of the Educhain platform, enabling access to exclusive educational content and platform governance.
          </Typography>
        </Box>

        {/* Current Balance Display */}
        {tokenDetails && (
          <Box sx={{
            mt: 3,
            p: 2.5,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            textAlign: 'center',
            width: '100%',
            // maxWidth: 500, 
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Your Balances
            </Typography>
            <Typography color="text.secondary" variant="body1">
              ETH: {tokenDetails.maticBal ? Number(tokenDetails.maticBal).toFixed(4) : 'N/A'}
            </Typography>
            {transferToken && (
              <Typography color="text.secondary" variant="body1">
                EDT: {transferToken.balance ? Number(transferToken.balance).toFixed(4) : 'N/A'}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  </Page>);
}
