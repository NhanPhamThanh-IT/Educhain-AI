import { useState } from "react";
import { Button, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import CustomTextField from "../../components/BasicComponents/TextField";
import { registerApi } from "../../utils/api";

const PRIMARY_COLOR = "#365ACA";
const HOVER_COLOR = "#2B4E96";
const TEXT_COLOR = "#555";

export default function SignUpForm() {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleCloseSnackbar = () => {
        setErrorMsg("");
        setSuccessMsg("");
    };

    const handleSignUp = async () => {
        if (!fullname || !email || !password) {
            setErrorMsg("Please fill in all fields.");
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setErrorMsg("Invalid email format.");
            return;
        }
        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            const response = await registerApi({ fullname, email, password });
            console.log('Login successful:', response);

            setSuccessMsg("Sign up successful!");
        } catch (error) {
            console.error(error);
            setErrorMsg(error?.response?.data?.message || error.message || "Sign up failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <CustomTextField
                label="Full Name"
                type="text"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                icon={Person}
                autoComplete="name"
                TEXT_COLOR={TEXT_COLOR}
                PRIMARY_COLOR={PRIMARY_COLOR}
            />
            <CustomTextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Email}
                autoComplete="email"
                TEXT_COLOR={TEXT_COLOR}
                PRIMARY_COLOR={PRIMARY_COLOR}
            />
            <CustomTextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                autoComplete="new-password"
                TEXT_COLOR={TEXT_COLOR}
                PRIMARY_COLOR={PRIMARY_COLOR}
            />
            <Button
                fullWidth
                variant="contained"
                sx={{
                    mt: 1, py: 1, fontSize: "1rem", fontWeight: "bold",
                    bgcolor: PRIMARY_COLOR, color: "white",
                    ":hover": { transform: "scale(1.05)", bgcolor: HOVER_COLOR }
                }}
                onClick={handleSignUp}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
            </Button>

            {/* Snackbar thông báo lỗi */}
            <Snackbar open={!!errorMsg} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert severity="error" onClose={handleCloseSnackbar}>
                    {errorMsg}
                </Alert>
            </Snackbar>

            {/* Snackbar thông báo thành công */}
            <Snackbar open={!!successMsg} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert severity="success" onClose={handleCloseSnackbar}>
                    {successMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
}
