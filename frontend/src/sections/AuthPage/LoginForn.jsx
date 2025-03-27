import { useState } from "react";
import { Button, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import CustomTextField from "../../components/BasicComponents/TextField";
import { loginApi } from "../../utils/api";

const PRIMARY_COLOR = "#365ACA";
const HOVER_COLOR = "#2B4E96";
const TEXT_COLOR = "#555";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState("error");

    const handleLogin = async () => {
        setErrorMsg("");
        setSuccessMsg("");

        if (!email || !password) {
            showSnackbar("Please fill in all fields.", "error");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            showSnackbar("Invalid email format.", "error");
            return;
        }

        if (password.length < 6) {
            showSnackbar("Password must be at least 6 characters long.", "error");
            return;
        }

        setLoading(true);
        try {
            const response = await loginApi({ email, password });
            console.log("Login successful:", response);
            showSnackbar("Login successful!", "success");
        } catch (error) {
            console.error(error);
            showSnackbar(error?.response?.data?.message || "Login failed.", "error");
        } finally {
            setLoading(false);
        }
    };

    const showSnackbar = (message, type) => {
        if (type === "error") {
            setErrorMsg(message);
            setSuccessMsg("");
        } else {
            setSuccessMsg(message);
            setErrorMsg("");
        }
        setSnackbarType(type);
        setOpenSnackbar(true);
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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarType} sx={{ width: "100%" }}>
                    {snackbarType === "error" ? errorMsg : successMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
}
