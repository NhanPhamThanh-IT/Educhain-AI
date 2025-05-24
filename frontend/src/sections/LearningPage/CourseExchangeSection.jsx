import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaCoins, FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';

const currencies = [
  { id: 'ecoin', name: 'ECoin', icon: <FaCoins />, color: '#FFD700' },
  { id: 'usdt', name: 'USDT', icon: <SiTether />, color: '#26A17B' },
  { id: 'eth', name: 'ETH', icon: <FaEthereum />, color: '#627EEA' },
  { id: 'btc', name: 'BTC', icon: <FaBitcoin />, color: '#F7931A' },
];

const mockBalances = {
  ecoin: 1000,
  usdt: 500,
  eth: 2.5,
  btc: 0.1,
};

const mockTransactions = [
  { id: 1, from: 'ECoin', to: 'USDT', amount: 100, date: '2024-03-20' },
  { id: 2, from: 'ETH', to: 'ECoin', amount: 0.5, date: '2024-03-19' },
];

const CourseExchangeSection = () => {
  const theme = useTheme();
  const [fromCurrency, setFromCurrency] = useState('ecoin');
  const [toCurrency, setToCurrency] = useState('usdt');
  const [amount, setAmount] = useState('');

  const handleExchange = () => {
    // Implement exchange logic here
    console.log('Exchanging', amount, fromCurrency, 'to', toCurrency);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Exchange Form */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Exchange Tokens
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="From"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency.id} value={currency.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ color: currency.color }}>{currency.icon}</Box>
                          {currency.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="To"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency.id} value={currency.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ color: currency.color }}>{currency.icon}</Box>
                          {currency.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Estimated Value: {amount ? (parseFloat(amount) * 1.2).toFixed(2) : '0.00'} {currencies.find(c => c.id === toCurrency)?.name}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleExchange}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      },
                    }}
                  >
                    Exchange Now
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </motion.div>
        </Grid>

        {/* Balance and Transactions */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Balance Card */}
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Your Balance
              </Typography>
              <List>
                {currencies.map((currency) => (
                  <ListItem key={currency.id} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box sx={{ color: currency.color }}>{currency.icon}</Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={currency.name}
                      secondary={mockBalances[currency.id]}
                      secondaryTypographyProps={{
                        sx: { color: theme.palette.text.primary, fontWeight: 'bold' }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>

            {/* Recent Transactions Card */}
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent Transactions
              </Typography>
              {mockTransactions.length > 0 ? (
                <List>
                  {mockTransactions.map((tx) => (
                    <ListItem key={tx.id} sx={{ px: 0 }}>
                      <ListItemText
                        primary={`${tx.amount} ${tx.from} → ${tx.to}`}
                        secondary={tx.date}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" align="center">
                  No recent transactions
                </Typography>
              )}
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseExchangeSection; 