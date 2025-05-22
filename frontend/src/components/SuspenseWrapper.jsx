import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const SuspenseWrapper = ({ children }) => {
    return (
        <Suspense
            fallback={
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '400px'
                    }}
                >
                    <CircularProgress />
                </Box>
            }
        >
            {children}
        </Suspense>
    );
};

export default SuspenseWrapper; 