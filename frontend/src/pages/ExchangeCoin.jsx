// components
import Page from "../components/Page";
import React, { useState, useEffect } from "react";
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
        change: `${
          coin.price_change_percentage_24h > 0 ? "+" : ""
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
    const [exchangeRates, setExchangeRates] = useState([]); // Lưu trữ dữ liệu API
  const [loading, setLoading] = useState(true); // Trạng thái loading

  // Gọi API khi component mount
  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoPrices();
      setExchangeRates(data);
      setLoading(false);
    };
    getData();
  }, []);
  return (<Page title="Exchange coin">
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
          {/* Bitcoin Card */}
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
                src="/bitcoin.png"
                alt="Bitcoin"
                sx={{ width: 32, height: 32 }}
              />
              <Typography fontWeight={600}>Bitcoin</Typography>
            </Box>
            <Typography variant="caption" color="gray">
              BTC
            </Typography>
            <TextField
              label="Bitcoin"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">BTC</InputAdornment>
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
                src="/educhain.png"
                alt="Educhain Token"
                sx={{ width: 32, height: 32 }}
              />
              <Typography fontWeight={600}>Educhain Token</Typography>
            </Box>
            <Typography variant="caption" color="gray">
              Value
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue="123 Educhain Token"
              sx={{ mt: 1 }}
            />
          </Card>
        </Box>

        <Button variant="contained" color="primary" size="large">
          Exchange
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
