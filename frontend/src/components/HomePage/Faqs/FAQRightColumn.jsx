import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion, AnimatePresence } from 'framer-motion';
import faqs from '../../../constants/HomePage/faqs';

const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { when: 'beforeChildren', staggerChildren: 0.1 }
    }
};

const faqItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 50, damping: 20 }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const arrowVariants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 }
};

const FAQRightColumn = () => {
    const [expanded, setExpanded] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggle = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Box
                sx={{
                    flex: 2,
                    p: 3,
                    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
                    borderRadius: 2
                }}
            >
                {/* Ô tìm kiếm với hiệu ứng bóng đổ */}
                <TextField
                    fullWidth
                    placeholder="Search FAQs..."
                    variant="outlined"
                    size="small"
                    sx={{
                        mb: 3,
                        backgroundColor: '#fff',
                        borderRadius: 1,
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AnimatePresence>
                    {filteredFaqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={faqItemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Accordion
                                expanded={expanded === index}
                                onChange={() => handleToggle(index)}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    backgroundColor: expanded === index ? '#ffffff' : '#f8f9fa',
                                    transition: 'background-color 0.3s, box-shadow 0.3s',
                                    boxShadow: expanded === index ? '0px 4px 12px rgba(0,0,0,0.15)' : 'none',
                                    overflow: 'hidden'
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={
                                        <motion.div
                                            animate={expanded === index ? 'expanded' : 'collapsed'}
                                            variants={arrowVariants}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ExpandMoreIcon />
                                        </motion.div>
                                    }
                                    sx={{
                                        '& .MuiAccordionSummary-content': { transition: 'all 0.3s' },
                                        '&:hover': { backgroundColor: '#e0e0e0' },
                                        minHeight: 56,
                                    }}
                                >
                                    <Typography fontWeight="bold">{faq.question}</Typography>
                                </AccordionSummary>
                                <AnimatePresence initial={false}>
                                    {expanded === index && (
                                        <AccordionDetails
                                            component={motion.div}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                                        >
                                            <Typography>{faq.answer || 'No answer!'}</Typography>
                                            {faq.link && (
                                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                    <Card
                                                        sx={{
                                                            mt: 2,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            p: 1,
                                                            cursor: 'pointer',
                                                            backgroundColor: '#e3f2fd',
                                                            borderRadius: 2,
                                                        }}
                                                    >
                                                        <CardContent sx={{ flexGrow: 1, fontWeight: 'bold', color: '#1565c0' }}>
                                                            {faq.link}
                                                        </CardContent>
                                                        <ArrowForwardIosIcon sx={{ color: '#1565c0' }} />
                                                    </Card>
                                                </motion.div>
                                            )}
                                        </AccordionDetails>
                                    )}
                                </AnimatePresence>
                            </Accordion>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </Box>
        </motion.div>
    );
};

export default FAQRightColumn;
