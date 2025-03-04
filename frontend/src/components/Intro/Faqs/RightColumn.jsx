import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion, AnimatePresence } from 'framer-motion';
import faqs from '../../../constants/Intro/faqs';

const NotFound = () => {
    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", backgroundColor: "#ffffff" }}>
            <motion.h1 animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }} style={{ fontSize: "6rem", margin: 0, color: "#333", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)" }}>
                404
            </motion.h1>
            <motion.h4 animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }} style={{ fontSize: "1.5rem", color: "#555", marginTop: "1rem", textAlign: "center" }}>
                Sorry, we couldn't find what you need. <br /> Try exploring a different direction!
            </motion.h4>
        </motion.div>
    );
};

const FAQRightColumn = () => {
    const [expanded, setExpanded] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const handleToggle = (index) => setExpanded(expanded === index ? null : index);
    const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <motion.div variants={{ hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { when: 'beforeChildren', staggerChildren: 0.15 } } }} initial="hidden" animate="visible">
            <TextField fullWidth placeholder="Looking for something? Type your keywords here…" variant="outlined" size="small" sx={{ mb: 3, backgroundColor: '#fff', borderRadius: 1, boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#365ACA' }, '&:hover fieldset': { borderColor: '#365ACA' }, '&.Mui-focused fieldset': { borderColor: '#365ACA' } } }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), endAdornment: searchTerm && (<InputAdornment position="end"><IconButton onClick={() => setSearchTerm('')} aria-label="clear search"><CancelIcon style={{ fontSize: 24, color: 'gray', cursor: 'pointer' }} /></IconButton></InputAdornment>) }} />
            <Box sx={{ flex: 2, p: 2, background: "white", border: 'solid #365ACA 1px', borderRadius: 3, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 2 }}>
                <AnimatePresence>
                    {filteredFaqs.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <NotFound />
                        </motion.div>
                    ) : (
                        filteredFaqs.map((faq, index) => (
                            <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }, exit: { opacity: 0, y: -20, transition: { duration: 0.3 } } }} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5, delay: index * 0.1 }}>
                                <Accordion expanded={expanded === index} onChange={() => handleToggle(index)} sx={{ borderRadius: 2, backgroundColor: "white", transition: "background-color 0.3s, box-shadow 0.3s", boxShadow: expanded === index ? "0px 4px 12px rgba(0,0,0,0.15)" : "none", overflow: "hidden" }}>
                                    <AccordionSummary expandIcon={(<motion.div animate={expanded === index ? "expanded" : "collapsed"} variants={{ collapsed: { rotate: 0 }, expanded: { rotate: 180 } }} transition={{ duration: 0.3 }}><ExpandMoreIcon sx={{ color: "#365ACA" }} /></motion.div>)} sx={{ "& .MuiAccordionSummary-content": { transition: "all 0.3s" }, "&:hover": { backgroundColor: "#f0f8ff" }, minHeight: 56, alignItems: "center" }}>
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
                        ))
                    )}
                </AnimatePresence>
            </Box>
        </motion.div>
    );
};

export default FAQRightColumn;
