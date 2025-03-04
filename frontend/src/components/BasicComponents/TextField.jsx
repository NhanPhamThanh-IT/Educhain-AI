import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const CustomTextField = ({
    label,
    type = "text",
    value,
    onChange,
    icon: Icon,
    TEXT_COLOR = "gray",
    PRIMARY_COLOR = "blue",
    fullWidth = true,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <TextField
            fullWidth={fullWidth}
            label={label}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            variant="outlined"
            value={value}
            onChange={onChange}
            InputProps={{
                startAdornment: Icon ? (
                    <InputAdornment position="start">
                        <Icon sx={{
                            color: TEXT_COLOR,
                            transition: "color 0.3s",
                        }} />
                    </InputAdornment>
                ) : null,
                endAdornment: type === "password" ? (
                    <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <EyeOff size={20} color={TEXT_COLOR} /> : <Eye size={20} color={TEXT_COLOR} />}
                        </IconButton>
                    </InputAdornment>
                ) : null,
            }}
            sx={{
                "& label": { color: TEXT_COLOR },
                "& label.Mui-focused": { color: PRIMARY_COLOR },
                "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gray" },
                    "&:hover fieldset": { borderColor: TEXT_COLOR },
                    "&.Mui-focused fieldset": { borderColor: PRIMARY_COLOR, borderWidth: 2 },
                },
                "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: TEXT_COLOR,
                    transition: "color 0.3s",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: PRIMARY_COLOR,
                }
            }}
            {...props}
        />
    );
};

export default CustomTextField;
