import { Box, Avatar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, AccountCircle, MonetizationOn, Logout } from "@mui/icons-material"; // Đã sửa lỗi import
import { useNavigate } from "react-router-dom";

const menuOptions = [
    { icon: <AccountCircle />, label: "Profile", link: "/profilesetup" },
    { icon: <MonetizationOn />, label: "Coin Exchange", link: "/learning/exchange" },
    { icon: <Logout />, label: "Logout", link: "/auth/logout" }, // Đảm bảo đường dẫn hợp lệ
];

const UserMenu = ({ elevated, menuAnchor, toggleMenu }) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width:960px)"); // Thay thế Hidden

    const handleMenuClick = (link) => {
        toggleMenu(); // Đóng menu trước khi điều hướng
        navigate(link);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isDesktop && (
                <Typography sx={{ display: "flex", alignItems: "center", color: elevated ? "#fff" : "#000" }}>
                    <img src="/Partials/Ecoin.png" alt="Coin" height="35" /> 12,312.44
                </Typography>
            )}
            <Avatar
                src="/user-avatar.png"
                alt="Gia Bao"
                onClick={() => navigate("/profilesetup")}
                sx={{
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.1) rotate(5deg)" },
                }}
            />
            {isDesktop && (
                <>
                    <IconButton sx={{ color: elevated ? "#fff" : "#000" }} onClick={toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={toggleMenu}
                        sx={{ "& .MuiPaper-root": { minWidth: 180, borderRadius: 2, boxShadow: 3 } }}
                    >
                        {menuOptions.map(({ icon, label, link }) => (
                            <MenuItem key={label} onClick={() => handleMenuClick(link)}
                                sx={{ px: 2, py: 1, "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" } }}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={label} />
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </Box>
    );
};

export default UserMenu;
