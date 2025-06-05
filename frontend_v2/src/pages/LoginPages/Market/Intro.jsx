import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const IntroSection = () => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4rem",
            minHeight: "80vh",
            backgroundImage: "url('/Market/Background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
        }}
    >
        <Box sx={{ maxWidth: "50%" }}>
            <Button
                variant="contained"
                sx={{
                    textTransform: "none",
                    backgroundColor: "#d6caff",
                    color: "#333",
                    mb: 2,
                    '&.Mui-disabled': {
                        backgroundColor: "#d6caff",
                        color: "#333",
                        fontWeight: 600,
                    }
                }}
                disabled
            >
                Learn & Earn with Educhain Token!
            </Button>
            <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: "#333" }}>
                Access Exclusive Courses From Top Creators
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                A marketplace for knowledge—connect, create, and grow.
            </Typography>
            <TextField
                placeholder="What do you want to learn today?"
                variant="outlined"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#fff", borderRadius: "8px" }}
                InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon color="primary" /></InputAdornment>) }}
            />
        </Box>
    </Box>
);

export default IntroSection;
