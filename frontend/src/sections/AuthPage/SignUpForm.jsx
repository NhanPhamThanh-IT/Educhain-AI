import { useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import CustomTextField from "../../components/BasicComponents/TextField";

const PRIMARY_COLOR = "#365ACA";
const HOVER_COLOR = "#2B4E96";
const TEXT_COLOR = "#555";

export default function SignUpForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <CustomTextField
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={Person}
                TEXT_COLOR={TEXT_COLOR}
                PRIMARY_COLOR={PRIMARY_COLOR}
            />
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
                mt: 1, py: 1, fontSize: "1rem", fontWeight: "bold",
                bgcolor: PRIMARY_COLOR, color: "white",
                ":hover": { transform: "scale(1.05)", bgcolor: HOVER_COLOR }
            }}
                onClick={handleSignUp} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
            </Button>
        </Box>
    );
}
