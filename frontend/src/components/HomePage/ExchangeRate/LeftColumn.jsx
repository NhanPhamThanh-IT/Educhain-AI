import { Box, Button, Typography } from "@mui/material";

const LeftColumn = () => {
    return (
        <Box sx={{ flex: 1, textAlign: 'left' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Exchange Rate
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', mb: 2, textAlign: 'justify' }}>
                Stay updated with the latest exchange rates for Educhain Token. Our platform ensures transparency and accuracy, helping you make informed decisions when converting cryptocurrency.
            </Typography>
            <Button variant="contained" sx={{ mt: 2, textTransform: 'none', fontSize: '1rem', borderRadius: 2, bgcolor: 'white', fontWeight: 'bold', border: 'solid #365ACA 1px', color: '#365ACA' }}>
                Get your Educhain Token!
            </Button>
        </Box>
    );
};

export default LeftColumn;