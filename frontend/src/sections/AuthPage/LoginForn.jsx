import { useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import CustomTextField from "../../components/BasicComponents/TextField";
import { useNavigate } from "react-router-dom";
const PRIMARY_COLOR = "#365ACA";
const HOVER_COLOR = "#2B4E96";
const TEXT_COLOR = "#555";

export default function LoginForm() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
        window.location.href = "/learning/course";
    };

    return (
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <CustomTextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Email}
                TEXT_COLOR={TEXT_COLOR}
                PRIMARY_COLOR={PRIMARY_COLOR}
            />
            <CustomTextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                TEXT_COLOR={TEXT_COLOR}
                PRIMARY_COLOR={PRIMARY_COLOR}
            />
            <Button fullWidth variant="contained" sx={{
                mt: 1, py: 1.1, fontSize: "1rem", fontWeight: "bold",
                bgcolor: PRIMARY_COLOR, color: "white",
                ":hover": { transform: "scale(1.05)", bgcolor: HOVER_COLOR }
            }}
                onClick={handleLogin} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
        </Box>
    );
}
