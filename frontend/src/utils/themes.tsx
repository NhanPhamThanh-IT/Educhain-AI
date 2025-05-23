// Code: Config theme for the application.

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: "'Quicksand', sans-serif",
        h1: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 700,
        },
        h2: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 700,
        },
        h3: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 600,
        },
        h4: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 600,
        },
        h5: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 500,
        },
        h6: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 500,
        },
        body1: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 400,
        },
        body2: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 400,
        },
        button: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 500,
            textTransform: 'none',
        },
        subtitle1: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 500,
        },
        subtitle2: {
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 500,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "@global": {
                    body: {
                        marginLeft: '0px !important',
                        marginRight: '0px !important',
                        fontFamily: "'Quicksand', sans-serif",
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
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 500,
                    textTransform: 'none',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 500,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 500,
                },
            },
        },
    },
});

export default theme;
