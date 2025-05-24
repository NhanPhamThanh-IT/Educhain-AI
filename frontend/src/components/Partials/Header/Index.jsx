import { AppBar, Toolbar, Box, Typography, Container, Modal, Button, IconButton } from "@mui/material"; // Added IconButton
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import { useNavigate } from "react-router-dom";
import { useAppBarLogic } from "../../../hooks/useAppBarLogic"
import DesktopNavigation from "./DesktopNavigation";
import UserMenu from "./UserMenu";
import { useState } from "react";
import AuthForm from './AuthForm'; // Import the new AuthForm component

import { data } from "./constants";

// Placeholder for AuthModal component (we will create this file next)
const AuthModal = ({ open, handleClose, authType, onToggleAuthType }) => {
    // if (!open) return null; // No longer needed as Modal handles visibility

    const handleFormSubmit = (formData) => {
        console.log("Form data:", formData, "Auth type:", authType);
        // Here you would typically handle the API call for sign-in or sign-up
        handleClose(); // Close modal on submit for now
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="auth-modal-title"
            aria-describedby="auth-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{
                backgroundColor: 'background.paper', // Or 'white'
                padding: 4, // Equivalent to '20px' with MUI spacing unit
                borderRadius: '8px',
                minWidth: '300px',
                maxWidth: '400px', // Add a max-width for better form appearance
                textAlign: 'center',
                boxShadow: 24, // MUI's elevation
                outline: 'none' // Remove focus outline from the Box
            }}>
                <Typography variant="h5" component="h2" id="auth-modal-title" gutterBottom>
                    {authType === 'signin' ? 'Sign In' : 'Sign Up'}
                </Typography>
                <AuthForm authType={authType} onSubmit={handleFormSubmit} onToggleAuthType={onToggleAuthType} />
                {/* Replace Button with IconButton for the close action */}
                <IconButton
                    aria-label="close auth modal"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        // color: (theme) => theme.palette.grey[500], // Optional: for specific color
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </Modal>
    );
};

const AppBarComponent = () => {
    const { menuAnchor, toggleMenu, appBarStyle } = useAppBarLogic();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authType, setAuthType] = useState('signin'); // 'signin' or 'signup'

    const handleClick = () => {
        navigate(data.logo.link);
    };

    const handleAuthClick = (type) => {
        setAuthType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // setAuthType(''); // Reset auth type on close -  Let's keep the last auth type
    };

    const toggleAuthTypeInModal = () => {
        setAuthType(prevType => prevType === 'signin' ? 'signup' : 'signin');
    };

    return (
        <>
            <AppBar
                sx={{
                    py: 2,
                    backgroundColor: "#0A1929",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    position: "fixed",
                    backdropFilter: "blur(8px)",
                    px: 0,
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                    }
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            minHeight: "70px",
                            px: 0,
                        }}
                        disableGutters
                    >
                        <Box
                            role="button"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                background: "none",
                                border: "none",
                                padding: 0,
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)"
                                }
                            }}
                            onClick={handleClick}
                        >
                            <Box
                                component="img"
                                src={data.logo.src}
                                alt="Logo"
                                sx={{
                                    width: 45,
                                    height: "auto",
                                    filter: "brightness(1.2)"
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    ml: 1,
                                    display: { xs: "none", md: "block" },
                                    fontWeight: 700,
                                    background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                {data.logo.title}
                            </Typography>
                        </Box>

                        <DesktopNavigation />
                        <UserMenu menuAnchor={menuAnchor} toggleMenu={toggleMenu} onAuthClick={handleAuthClick} />
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Render the AuthModal */}
            <AuthModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                authType={authType}
                onToggleAuthType={toggleAuthTypeInModal} // Pass the toggle function
            />
        </>
    );
};

export default AppBarComponent;
