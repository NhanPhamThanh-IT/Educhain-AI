import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "@global": {
                    body: {
                        marginLeft: '0px !important',
                        marginRight: '0px !important',
                    },
                },
                '::-webkit-scrollbar': {
                    width: '8px',
                },
                '::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '10px',
                },
                '::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '10px',
                },
                '::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                },
            },
        },
    },
});

export default theme;
