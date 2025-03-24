import { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import PricingTable from './table-components/index';
import { deposits, earns } from './constants';
import { TbCoinFilled } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

const tabVariants = {
    hidden: { opacity: 0, y: 20 },  // Bắt đầu ẩn, lệch xuống
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Hiện dần lên
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } } // Mờ dần và lệch lên khi ẩn
};

const Main = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 15 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center' }}>
                    <TbCoinFilled size={48} />
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary'
                        }}
                    >
                        Pricing & Fees
                    </Typography>
                </Box>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: 'text.secondary',
                        maxWidth: '600px',
                        mx: 'auto',
                        mb: 4
                    }}
                >
                    Transparent pricing structure for all transactions and services on our platform
                </Typography>

                <Box sx={{ mb: 4, p: 1 }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        centered
                        indicatorColor="transparent"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            "& .MuiTab-root": {
                                fontSize: "1.1rem",
                                fontWeight: 500,
                                textTransform: "none",
                                minWidth: 120,
                                border: "2px solid #666",
                                borderRadius: 50,
                                transition: "background-color 0.3s",
                                color: "#666",
                                marginRight: 2,
                                "&:last-child": {
                                    marginRight: 0,
                                },
                            },
                            "& .MuiTabs-indicator": {
                                display: "none",
                            },
                            "& .Mui-selected": {
                                bgcolor: "#222",
                                color: "white",
                                borderColor: "#222",
                            },
                        }}
                    >
                        <Tab label="Deposits" />
                        <Tab label="Earnings" />
                    </Tabs>
                </Box>
            </Box>

            {/* Thêm hiệu ứng animation khi chuyển tab */}
            <Box sx={{ mb: 10 }}>
                <AnimatePresence mode="wait">
                    {currentTab === 0 && (
                        <motion.div key="tab-0" initial="hidden" animate="visible" exit="exit" variants={tabVariants}>
                            <PricingTable {...deposits} />
                        </motion.div>
                    )}
                    {currentTab === 1 && (
                        <motion.div key="tab-1" initial="hidden" animate="visible" exit="exit" variants={tabVariants}>
                            <PricingTable {...earns} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </Container>
    );
};

export default Main;
