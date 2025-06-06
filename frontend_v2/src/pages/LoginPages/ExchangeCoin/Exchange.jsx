import { useState, memo } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    CircularProgress,
    Alert,
    IconButton,
    InputAdornment,
    useTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Tooltip,
} from '@mui/material';
import {
    SwapHoriz,
    AccountBalanceWallet,
    TrendingUp,
    CurrencyExchange,
    ArrowForward,
    Info,
    History,
    CheckCircle,
    Warning,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Styles
const styles = {
    container: {
        py: 4,
        minHeight: '100vh',
        background: '#fff',
    },
    paper: {
        p: 4,
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
        },
    },
    title: {
        fontWeight: 800,
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        color: 'text.secondary',
        mb: 4,
        fontSize: '1.1rem',
    },
    balanceCard: {
        p: 3,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
        color: 'white',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 28px rgba(25, 118, 210, 0.2)',
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        },
    },
    swapButton: {
        my: 3,
        width: '100%',
        height: 56,
        borderRadius: 3,
        textTransform: 'none',
        fontSize: '1.1rem',
        fontWeight: 600,
        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
        },
    },
    input: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            },
            '&.Mui-focused': {
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.1)',
            },
        },
    },
    swapIcon: {
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.2)',
        },
    },
    balanceValue: {
        fontSize: '2rem',
        fontWeight: 700,
        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    balanceLabel: {
        opacity: 0.9,
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    infoCard: {
        p: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(25, 118, 210, 0.05)',
        border: '1px solid rgba(25, 118, 210, 0.1)',
    },
    tableContainer: {
        mt: 3,
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    tableHeader: {
        backgroundColor: 'rgba(25, 118, 210, 0.05)',
        '& th': {
            fontWeight: 600,
            color: 'text.primary',
        },
    },
    statusChip: {
        borderRadius: '12px',
        fontWeight: 600,
    },
};

// Mock data for transaction history
const mockTransactions = [
    { id: 1, date: '2024-03-15', from: '100 EDC', to: '50 USDT', status: 'completed' },
    { id: 2, date: '2024-03-14', from: '200 EDC', to: '100 USDT', status: 'completed' },
    { id: 3, date: '2024-03-13', from: '150 EDC', to: '75 USDT', status: 'pending' },
];

const ExchangeCoin = () => {
    const theme = useTheme();
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Mock balance data - replace with actual data from your backend
    const balances = {
        educhain: 1000,
        usdt: 500,
    };

    // Mock exchange rate
    const exchangeRate = {
        edcToUsdt: 0.5, // 1 EDC = 0.5 USDT
        lastUpdated: '2024-03-15 14:30:00',
    };

    const handleSwap = async () => {
        if (!fromAmount || !toAmount) {
            setError('Please enter valid amounts');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Add your exchange logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
            setFromAmount('');
            setToAmount('');
        } catch (err) {
            setError('Failed to process exchange. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'success';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle fontSize="small" />;
            case 'pending':
                return <Warning fontSize="small" />;
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" sx={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h3" sx={styles.title}>
                    <CurrencyExchange sx={{ fontSize: 40 }} />
                    Exchange Coins
                </Typography>
                <Typography variant="body1" sx={styles.subtitle}>
                    Exchange your Educhain tokens for other cryptocurrencies with the best rates
                </Typography>

                <Grid container spacing={3}>
                    {/* Balance Cards */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Paper sx={styles.balanceCard}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle2" sx={styles.balanceLabel}>
                                            Educhain Balance
                                        </Typography>
                                        <Typography sx={styles.balanceValue}>
                                            {balances.educhain} EDC
                                        </Typography>
                                    </Box>
                                    <AccountBalanceWallet sx={{ fontSize: 48, opacity: 0.9 }} />
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Paper sx={styles.balanceCard}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle2" sx={styles.balanceLabel}>
                                            USDT Balance
                                        </Typography>
                                        <Typography sx={styles.balanceValue}>
                                            {balances.usdt} USDT
                                        </Typography>
                                    </Box>
                                    <TrendingUp sx={{ fontSize: 48, opacity: 0.9 }} />
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* Exchange Rate Info */}
                    <Grid size={{ xs: 12 }}>
                        <Paper sx={styles.infoCard}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Info color="primary" />
                                <Typography variant="body2" color="text.secondary">
                                    Current Exchange Rate: 1 EDC = {exchangeRate.edcToUsdt} USDT
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                    Last updated: {exchangeRate.lastUpdated}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Exchange Form */}
                    <Grid size={{ xs: 12 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Paper sx={styles.paper}>
                                {error && (
                                    <Alert
                                        severity="error"
                                        sx={{
                                            mb: 2,
                                            borderRadius: 2,
                                            '& .MuiAlert-icon': {
                                                color: 'error.main'
                                            }
                                        }}
                                    >
                                        {error}
                                    </Alert>
                                )}

                                <Grid container spacing={3} alignItems="center">
                                    <Grid size={{ xs: 12, md: 5 }}>
                                        <TextField
                                            fullWidth
                                            label="From"
                                            value={fromAmount}
                                            onChange={(e) => setFromAmount(e.target.value)}
                                            type="number"
                                            sx={styles.input}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Typography fontWeight="600">EDC</Typography>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 2 }} display="flex" alignItems="center" justifyContent="center">
                                        <IconButton
                                            color="primary"
                                            sx={styles.swapIcon}
                                            size="large"
                                        >
                                            <SwapHoriz sx={{ transform: 'rotate(90deg)' }} />
                                        </IconButton>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 5 }}>
                                        <TextField
                                            fullWidth
                                            label="To"
                                            value={toAmount}
                                            onChange={(e) => setToAmount(e.target.value)}
                                            type="number"
                                            sx={styles.input}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Typography fontWeight="600">USDT</Typography>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSwap}
                                    disabled={isLoading}
                                    sx={styles.swapButton}
                                    endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <ArrowForward />}
                                >
                                    {isLoading ? 'Processing...' : 'Exchange Now'}
                                </Button>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* Transaction History */}
                    <Grid size={{ xs: 12 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Paper sx={styles.paper}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <History color="primary" />
                                    <Typography variant="h6" fontWeight={600}>
                                        Recent Transactions
                                    </Typography>
                                </Box>

                                <TableContainer sx={styles.tableContainer}>
                                    <Table>
                                        <TableHead sx={styles.tableHeader}>
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>From</TableCell>
                                                <TableCell>To</TableCell>
                                                <TableCell align="right">Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {mockTransactions.map((transaction) => (
                                                <TableRow key={transaction.id}>
                                                    <TableCell>{transaction.date}</TableCell>
                                                    <TableCell>{transaction.from}</TableCell>
                                                    <TableCell>{transaction.to}</TableCell>
                                                    <TableCell align="right">
                                                        <Chip
                                                            icon={getStatusIcon(transaction.status)}
                                                            label={transaction.status}
                                                            color={getStatusColor(transaction.status)}
                                                            size="small"
                                                            sx={styles.statusChip}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
};

export default memo(ExchangeCoin);