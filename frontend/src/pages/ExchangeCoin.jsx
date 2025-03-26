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
import axios from "axios";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

// ----------------------------------------------------------------------

const COINS = [
  { id: "bitcoin", code: "BTC", icon: "/bitcoin.png" },
  { id: "bitcoin-cash", code: "BCH", icon: "/bch.png" },
  { id: "ethereum", code: "ETH", icon: "/ethereum.png" },
  { id: "litecoin", code: "LTC", icon: "/litecoin.png" },
  { id: "0x", code: "ZRX", icon: "/0x.png" },
  { id: "basic-attention-token", code: "BAT", icon: "/bat.png" },
  { id: "decentraland", code: "MANA", icon: "/decentraland.png" },
  { id: "kyber-network", code: "KNC", icon: "/kyber-network.png" },
  { id: "chainlink", code: "LINK", icon: "/chainlink.png" },
];

const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          ids: COINS.map((coin) => coin.id).join(","),
          order: "market_cap_desc",
          per_page: COINS.length,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      }
    );

    return response.data.map((coin) => {
      const matchedCoin = COINS.find((c) => c.id === coin.id);
      return {
        name: coin.name,
        code: matchedCoin?.code || "",
        value: coin.current_price.toLocaleString(),
        change: `${coin.price_change_percentage_24h > 0 ? "+" : ""
          }${coin.price_change_percentage_24h.toFixed(2)}%`,
        icon: matchedCoin?.icon || "",
      };
    });
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return [];
  }
};
export default function ExchangeCoin() {
  const {
    TOKEN_ICO,
    BUY_TOKEN,
    account,
    loader,
    ERC20,
    TOKEN_ADDRESS,
    notifyError,
    notifySuccess,
    detail,
    setLoader
  } = useContext(RouterContext);

  const [tokenDetails, setTokenDetails] = useState(null);
  const [transferToken, setTransferToken] = useState(null);
  const [edtAmount, setEdtAmount] = useState("");
  const [maticAmount, setMaticAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch token details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [icoData, tokenData] = await Promise.all([
          TOKEN_ICO(),
          ERC20(TOKEN_ADDRESS)
        ]);
        setTokenDetails(icoData);
        setTransferToken(tokenData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch token data:", error);
        notifyError("Failed to load token details");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        gap={2}
        p={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Exchange
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          {/* MATIC Card */}
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
                src="/etherium.png"
                alt="Ethereum"
                sx={{ width: 32, height: 32 }}
              />
              <Typography fontWeight={600}>ETH</Typography>
            </Box>
            <Typography variant="caption" color="gray">
              ETH
            </Typography>
            <TextField
              label="ETH Amount"
              value={maticAmount}
              disabled
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">ETH</InputAdornment>
                ),
              }}
            />
          </Card>

          <SwapHoriz fontSize="large" color="primary" />

          {/* Educhain Token Card */}
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
                src="/ecoin.png"
                alt="Educhain Token"
                sx={{ width: 32, height: 32 }}
              />
              <Typography fontWeight={600}>Educhain Token</Typography>
            </Box>
            <Typography variant="caption" color="gray">
              EDT
            </Typography>
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

        {/* Current Balance Display */}
        {tokenDetails && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">
              Your ETH Balance: {Number(tokenDetails.maticBal).toFixed(4)} ETH
            </Typography>
            {transferToken && (
              <Typography color="text.secondary">
                Your EDT Balance: {Number(transferToken.balance).toFixed(4)} EDT
              </Typography>
            )}
          </Box>
        )}
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
              Stay updated with the latest exchange rates for Educhain Token.
              Our platform ensures transparency and accuracy, helping you make
              informed decisions when converting cryptocurrency.
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Get your Educhain Token!
            </Button>
          </Grid>

          {/* Hiển thị dữ liệu */}
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
            ) : (
              <Box>
                {exchangeRates.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    py={1}
                    borderBottom={1}
                    borderColor="divider"
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={item.icon}
                        alt={item.name}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box>
                        <Typography fontWeight={600} color="black">{item.name}</Typography>
                        <Typography variant="caption" color="gray">
                          {item.code}
                        </Typography>
                      </Box>
                    </Box>
                    <Box textAlign="right">
                      <Typography fontWeight={600} color="black">${item.value}</Typography>
                      <Typography
                        color={item.change.startsWith("+") ? "green" : "red"}
                        display="flex"
                        alignItems="center"
                      >
                        {item.change}{" "}
                        {item.change.startsWith("+") ? (
                          <ArrowDropUp />
                        ) : (
                          <ArrowDropDown />
                        )}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Button variant="contained" sx={{ mt: 2 }}>
              More
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Page>);
}
