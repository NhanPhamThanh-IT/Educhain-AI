import { useState } from "react";
import PropTypes from 'prop-types';
import { 
  Box, 
  IconButton, 
  Tooltip, 
  Button, 
  Typography,
  useTheme,
  alpha,
  Avatar,
  Menu,
  MenuItem,
  Dialog, // Added Dialog
  DialogActions, // Added DialogActions
  DialogContent, // Added DialogContent
  DialogContentText, // Added DialogContentText
  DialogTitle // Added DialogTitle
} from "@mui/material";
import { 
  Refresh as RefreshIcon, 
  MoreVert as MoreVertIcon, 
  Widgets as WidgetsIcon,
  AccountCircle as AccountCircleIcon, // Added AccountCircleIcon
  Logout as LogoutIcon // Added LogoutIcon
} from "@mui/icons-material";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useWallet } from "@suiet/wallet-kit"; // Added useWallet import

const WidgetContent = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const wallet = useWallet(); // Get wallet object

    const NAV_ITEMS = [
        { label: "Your Courses", path: "/mylearning" },
        { label: "Market", path: "/market" },
        { label: "Missions", path: "/learning/mission" },
        { label: "Leaderboard", path: "/learning/leaderboard" },
        { label: "Exchange", path: "/learning/exchange" },
    ];
    

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }}  
            transition={{ duration: 0.5, ease: "easeOut" }} 
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                whiteSpace: "nowrap",
                gap: 1,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: "blur(8px)",
                borderRadius: 2,
                p: 1,
                boxShadow: theme.shadows[2],
            }}
        >
            {NAV_ITEMS.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                    <Button
                        color="inherit"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: 16,
                            transition: "all 0.2s ease",
                            borderRadius: 2,
                            px: 2,
                            "&:hover": {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                transform: "translateY(-2px)",
                            },
                        }}
                        onClick={() => navigate(item.path)}
                    >
                        {item.label}
                    </Button>
                </motion.div>
            ))}
        </Box>
    );
};
    
const TopBar = ({ isSidebarOpen, sections, selectedSection, selectedHistory }) => {
    const theme = useTheme();
    const [isWidgetOpen, setWidgetOpen] = useState(true);
    const navigate = useNavigate();
    const wallet = useWallet(); // Get wallet object
const [anchorEl, setAnchorEl] = useState(null); // State for Menu anchor
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State for logout dialog

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMyAccountClick = () => {
        navigate("/profile");
        handleMenuClose();
    };

    const handleLogoutClick = () => {
        setOpenLogoutDialog(true);
        handleMenuClose();
    };

    const handleCloseLogoutDialog = () => {
        setOpenLogoutDialog(false);
    };

    const handleConfirmLogout = async () => { // Made async
        if (wallet.connected) {
            try {
                await wallet.disconnect();
            } catch (e) {
                console.error("Failed to disconnect wallet", e);
                // Optionally, inform the user that wallet disconnection failed
            }
        }
        localStorage.removeItem('address');
        navigate("/homepage");
        handleCloseLogoutDialog();
    };
    return (
        <Box
            component={motion.div}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.divider}`,
                px: { xs: 2, sm: 3 },
                py: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: "blur(8px)",
                position: "fixed",
                zIndex: 1100,
                width: isSidebarOpen ? "calc(100% - 300px)" : "calc(100% - 60px)",
                top: 0,
                transition: "all 0.3s ease",
                boxShadow: theme.shadows[1],
            }}
        >
            <Box 
                sx={{ 
                    display: "flex", 
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        transform: "translateX(4px)",
                    }
                }}
            >
                {sections.find(
                    (s) => s.key === selectedSection && s.history?.includes(selectedHistory)
                )?.icon}
                <Typography 
                    variant="h6" 
                    sx={{ 
                        ml: 1, 
                        fontWeight: 600,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {selectedHistory || selectedSection || "Dashboard"}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
                <AnimatePresence>
                    {isWidgetOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: "110%",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    px: 2,
                                    minWidth: 200,
                                }}
                            >
                                <WidgetContent />
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Tooltip title="Widget">
                    <IconButton 
                        size="small" 
                        onClick={() => setWidgetOpen(!isWidgetOpen)}
                        sx={{
                            transition: "all 0.2s ease",
                            "&:hover": {
                                transform: "rotate(90deg)",
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            }
                        }}
                    >
                        <WidgetsIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Refresh">
                    <IconButton 
                        size="small" 
                        onClick={() => window.location.reload()}
                        sx={{
                            transition: "all 0.2s ease",
                            "&:hover": {
                                transform: "rotate(180deg)",
                                backgroundColor: alpha(theme.palette.info.main, 0.1),
                            }
                        }}
                    >
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Box onMouseLeave={handleMenuClose} sx={{ position: 'relative' }}>
                    <Tooltip title="User options">
                        <IconButton
                            onClick={handleMenuOpen} // Or onMouseEnter if preferred for hover
                            onMouseEnter={handleMenuOpen} // Open on hover
                            size="small"
                            sx={{ p: 0 }}
                        >
                            <Avatar alt="User Avatar" src="https://avatar.iran.liara.run/public/6" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        MenuListProps={{ onMouseLeave: handleMenuClose }} // Close when mouse leaves menu items
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }} 
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        getContentAnchorEl={null} // Ensure anchorOrigin is respected
                    ><MenuItem onClick={handleMyAccountClick}>
                    <AccountCircleIcon sx={{ mr: 1, color: theme.palette.primary.main }} /> My Account
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    <LogoutIcon sx={{ mr: 1, color: theme.palette.error.main }} /> Logout
                </MenuItem>
            </Menu>
        </Box>
            </Box>
            <Dialog
                open={openLogoutDialog}
                onClose={handleCloseLogoutDialog}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText id="logout-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLogoutDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirmLogout} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

TopBar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            history: PropTypes.arrayOf(PropTypes.string),
            icon: PropTypes.node,
        })
    ).isRequired,
    selectedSection: PropTypes.string.isRequired,
    selectedHistory: PropTypes.string.isRequired,
};

export default TopBar;
