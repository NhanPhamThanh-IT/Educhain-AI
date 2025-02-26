import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const FAQLeftColumn = () => {
    return (
        <Box sx={{ flex: 1, textAlign: 'left' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Frequently Asked Questions
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', mb: 2 }}>
                Still have questions? Contact our team at{' '}
                <Typography component="span" color="primary" fontWeight="bold">
                    support@skillbridge.com
                </Typography>
            </Typography>
            <Button variant="contained" sx={{ mt: 2, textTransform: 'none', fontSize: '1rem', borderRadius: 2, bgcolor: 'white', fontWeight: 'bold', border: 'solid #365ACA 1px', color: '#365ACA' }}>
                See All FAQ's
            </Button>
        </Box>
    );
};

export default FAQLeftColumn;
