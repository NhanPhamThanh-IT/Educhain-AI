import React, { useState } from "react";
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Card, CardContent } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import faqs from "../../constants/HomePage/faqs";

const FAQSection = () => {
    const [expanded, setExpanded] = useState(null);

    const handleToggle = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 4, p: 4, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
            <Box sx={{ flex: 1, maxWidth: "30%" }}>
                <Typography variant="h4" fontWeight="bold">Frequently Asked Questions</Typography>
                <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
                    Still you have any questions? Contact our Team via support@skillbridge.com
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>See All FAQ's</Button>
            </Box>

            <Box sx={{ flex: 2 }}>
                {faqs.map((faq, index) => (
                    <Accordion key={index} expanded={expanded === index} onChange={() => handleToggle(index)} sx={{ mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight="bold">{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{faq.answer || "No answer!"}</Typography>
                            {faq.link && (
                                <Card sx={{ mt: 2, display: "flex", alignItems: "center", p: 1, cursor: "pointer" }}>
                                    <CardContent sx={{ flexGrow: 1 }}>{faq.link}</CardContent>
                                    <ArrowForwardIosIcon />
                                </Card>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
};

export default FAQSection;
