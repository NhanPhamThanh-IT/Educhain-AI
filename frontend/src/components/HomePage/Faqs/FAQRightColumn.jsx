import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion, AnimatePresence } from 'framer-motion';
import faqs from '../../../constants/HomePage/faqs';

const FAQRightColumn = () => {
    const [expanded, setExpanded] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const handleToggle = (index) => setExpanded(expanded === index ? null : index);
    const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <motion.div variants={{ hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { when: 'beforeChildren', staggerChildren: 0.15 } } }} initial="hidden" animate="visible">
            <TextField fullWidth placeholder="Search FAQs..." variant="outlined" size="small" sx={{ mb: 3, backgroundColor: '#fff', borderRadius: 1, boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#365ACA' }, '&:hover fieldset': { borderColor: '#365ACA' }, '&.Mui-focused fieldset': { borderColor: '#365ACA' } } }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Box sx={{ flex: 2, p: 4, background: "#365ACA", borderRadius: 3, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 2 }}>
                <AnimatePresence>
                    {filteredFaqs.map((faq, index) => (
                        <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }, exit: { opacity: 0, y: -20, transition: { duration: 0.3 } } }} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5, delay: index * 0.1 }}>
                            <Accordion expanded={expanded === index} onChange={() => handleToggle(index)} sx={{ borderRadius: 2, backgroundColor: "white", transition: "background-color 0.3s, box-shadow 0.3s", boxShadow: expanded === index ? "0px 4px 12px rgba(0,0,0,0.15)" : "none", overflow: "hidden" }}>
                                <AccordionSummary expandIcon={<motion.div animate={expanded === index ? "expanded" : "collapsed"} variants={{ collapsed: { rotate: 0 }, expanded: { rotate: 180 } }} transition={{ duration: 0.3 }}><ExpandMoreIcon sx={{ color: "#365ACA" }} /></motion.div>} sx={{ "& .MuiAccordionSummary-content": { transition: "all 0.3s" }, "&:hover": { backgroundColor: "#f0f8ff" }, minHeight: 56, alignItems: "center" }}>
                                    <Typography fontWeight="bold" sx={{ color: "#365ACA" }}>{faq.question}</Typography>
                                </AccordionSummary>
                                <AnimatePresence initial={false}>
                                    {expanded === index && (
                                        <AccordionDetails component={motion.div} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, type: "spring", stiffness: 100 }} sx={{ px: 3, py: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                                            <Typography sx={{ color: "#555" }}>{faq.answer || "No answer!"}</Typography>
                                            {faq.link && (
                                                <motion.div>
                                                    <Card sx={{ display: "flex", alignItems: "center", p: 2, cursor: "pointer", backgroundColor: "rgba(54,90,202,0.1)", borderRadius: 2, boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
                                                        <CardContent sx={{ flexGrow: 1, fontWeight: "bold", color: "#365ACA" }}>{faq.link}</CardContent>
                                                        <ArrowForwardIosIcon sx={{ color: "#365ACA" }} />
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
