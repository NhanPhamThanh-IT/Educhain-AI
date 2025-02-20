import React, { useEffect, useState } from 'react';
import { Box, Card, Avatar, Typography, Pagination, Grid, Grow } from "@mui/material";
import { green, red } from "@mui/material/colors";
import cryptocurrencies from "../../../constants/HomePage/cryptocurrencies";

const CryptoCard = ({ crypto, index, fadeIn }) => (
  <Grow in={fadeIn} timeout={300 + index * 100}>
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: "background.paper",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 4,
        },
        width: "100%", // Sử dụng chiều rộng 100% để card tự co giãn theo container
        minHeight: { xs: 140, sm: 150, md: 160 }, // Responsive minHeight theo breakpoints
      }}
    >
      <Avatar sx={{ bgcolor: "transparent", fontSize: { xs: 20, sm: 24 } }}>
        {crypto.icon}
      </Avatar>
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Typography fontWeight="bold" variant="h6">
          {crypto.name}
        </Typography>
        <Typography variant="body2" color="gray">
          {crypto.symbol}
        </Typography>
      </Box>
      <Box textAlign="right">
        <Typography fontWeight="bold" variant="subtitle1">
          {crypto.price}
        </Typography>
        <Typography sx={{ color: crypto.change.startsWith("+") ? green[500] : red[500] }}>
          {crypto.change}
        </Typography>
      </Box>
    </Card>
  </Grow>
);

const RightColumn = () => {
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(cryptocurrencies.length / itemsPerPage);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setPage(prevPage => (prevPage < totalPages ? prevPage + 1 : 1));
        setFadeIn(true);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const handleChange = (event, value) => {
    setFadeIn(false);
    setTimeout(() => {
      setPage(value);
      setFadeIn(true);
    }, 300);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = cryptocurrencies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Grid container spacing={2}>
        {currentItems.map((crypto, index) => (
          <Grid item xs={12} sm={12} md={6} key={index}>
            <CryptoCard crypto={crypto} index={index} fadeIn={fadeIn} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
    </Box>
  );
};

export default RightColumn;
