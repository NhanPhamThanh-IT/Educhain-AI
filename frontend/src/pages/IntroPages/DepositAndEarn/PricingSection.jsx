import React, { Suspense } from 'react';
import { Box, Container, Typography, Paper, useTheme, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { deposits, earns } from './constants.js';

const PricingSection = () => {
    const theme = useTheme();
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    const renderTable = (data, type) => (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                borderRadius: 3,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 3,
                    padding: '1px',
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none'
                },
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)'
                }
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                borderBottom: 'none',
                                py: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            {type === 'deposit' ? (
                                <ArrowDown size={20} color={theme.palette.primary.main} />
                            ) : (
                                <ArrowUp size={20} color={theme.palette.primary.main} />
                            )}
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: theme.palette.primary.main
                                }}
                            >
                                {type === 'deposit' ? 'Fees & Charges' : 'Earning Opportunities'}
                            </Typography>
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{
                                borderBottom: 'none',
                                py: 2,
                                fontWeight: 600,
                                color: theme.palette.primary.main
                            }}
                        >
                            Amount
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.values.map((item, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                }
                            }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                sx={{
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                                    py: 2
                                }}
                            >
                                {item.activity}
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                                    py: 2,
                                    fontWeight: 600
                                }}
                            >
                                {item.price}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        }>
            <Box ref={ref} sx={{
                py: { xs: 6, md: 8 },
                position: 'relative',
                overflow: 'hidden',
                background: 'transparent'
            }}>
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography
                            variant="h3"
                            component="h2"
                            align="center"
                            sx={{
                                fontWeight: 700,
                                background: `linear-gradient(45deg, #1976d2, #42a5f5)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            Platform Fees & Earnings
                        </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            sx={{
                                color: 'text.secondary',
                                mb: 6,
                                maxWidth: '800px',
                                mx: 'auto'
                            }}
                        >
                            Transparent overview of all fees and earning opportunities
                        </Typography>
                    </motion.div>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            style={{ flex: 1 }}
                        >
                            {renderTable(deposits, 'deposit')}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ flex: 1 }}
                        >
                            {renderTable(earns, 'earn')}
                        </motion.div>
                    </Box>
                </Container>
            </Box>
        </Suspense>
    );
};

export default PricingSection;