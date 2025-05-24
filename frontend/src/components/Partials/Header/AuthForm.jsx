import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const AuthForm = ({ authType, onSubmit, onToggleAuthType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (authType === 'signup' && password !== confirmPassword) {
            console.error("Passwords don't match");
            return;
        }
        onSubmit({ email, password });
    };

    const handleGoogleSignIn = () => {
        console.log("Attempting Google Sign-In");
    };

    const isSignUp = authType === 'signup';

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    background: 'linear-gradient(90deg, #2196F3, #00BCD4)',
                    color: 'white',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #1976D2, #0097A7)', // Darker shade for hover
                    }
                }}
            >
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{
                    mb: 2,
                    color: '#2196F3', // Accent color
                    borderColor: '#2196F3', // Accent color for border
                    '&:hover': {
                        borderColor: '#1976D2', // Darker accent for hover
                        backgroundColor: 'rgba(33, 150, 243, 0.04)' // Light blueish background on hover
                    }
                }}
            >
                Sign In with Google
            </Button>

            <Typography variant="body2" align="center">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <Link 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onToggleAuthType(); }} 
                    sx={{ 
                        cursor: 'pointer', 
                        color: '#00BCD4', // Accent color
                        textDecoration: 'underline',
                        '&:hover': {
                            color: '#0097A7' // Darker accent for hover
                        }
                    }}
                >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </Link>
            </Typography>
        </Box>
    );
};

export default AuthForm;
