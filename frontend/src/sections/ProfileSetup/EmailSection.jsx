import React from "react";
import { Box, Typography, Chip, Tooltip, Button } from "@mui/material";

const formatTimeObject = (t) => {
    if (!t) return "";
    const pad = (num) => num.toString().padStart(2, "0");
    return `${t.year}-${pad(t.month)}-${pad(t.day)} ${pad(t.hour)}:${pad(t.minute)}:${pad(t.second)}`;
};

const EmailSection = ({ emails = [], showAllEmails, toggleShowEmails, handleAddEmail }) => {
    const maxVisibleEmails = 3;
    const visibleEmails = showAllEmails ? emails : emails.slice(0, maxVisibleEmails);
    const remainingEmailsCount = emails.length - maxVisibleEmails;

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight={700} color="primary">
                My Email Addresses
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {visibleEmails.map((email, idx) => (
                    <Tooltip key={idx} title={`Updated at: ${formatTimeObject(email.updatedTime)}`} arrow>
                        <Chip label={email.address} color="primary" />
                    </Tooltip>
                ))}
                {!showAllEmails && remainingEmailsCount > 0 && (
                    <Chip label={`+${remainingEmailsCount} more`} onClick={toggleShowEmails} clickable color="secondary" />
                )}
                {showAllEmails && emails.length > maxVisibleEmails && (
                    <Chip label="Show Less" onClick={toggleShowEmails} clickable color="secondary" />
                )}
            </Box>
            <Box sx={{ mt: 2 }}>
                <Button variant="outlined" color="secondary" sx={{ fontWeight: 700 }} onClick={handleAddEmail}>
                    + Add Email Address
                </Button>
            </Box>
        </Box>
    );
};

export default EmailSection;
