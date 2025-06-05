import React, { useState, memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { MAIN_ROUTES } from '@constants/routesPath';

// Constants for styling
const MENU_PAPER_STYLES = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
    mt: 1.5,
    width: 200,
    '& .MuiMenuItem-root': {
      px: 2,
      py: 1,
    },
  },
};

const MENU_ITEM_STYLES = {
  borderRadius: '4px',
  my: 0.5,
  '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.08)' }
};

// MenuItem configuration for better maintainability
const MENU_ITEMS = [
  {
    id: 'profile',
    label: 'Profile',
    icon: <PersonIcon fontSize="small" color="primary" />,
    route: MAIN_ROUTES.profile,
    divider: false
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon fontSize="small" color="primary" />,
    route: MAIN_ROUTES.settings,
    divider: true
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <LogoutIcon fontSize="small" color="error" />,
    route: null, // Special case for logout
    divider: false
  }
];

// Extracted AccountMenu component for better modularity
const AccountMenu = memo(({ anchorEl, open, onClose, onNavigate, onLogout }) => {
  // Handle menu item click - either navigate or logout
  const handleItemClick = useCallback((item) => {
    if (item.id === 'logout') {
      onLogout();
    } else if (item.route) {
      onNavigate(item.route);
    }
  }, [onLogout, onNavigate]);

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      PaperProps={MENU_PAPER_STYLES}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >      {MENU_ITEMS.map((item, index) => (
      <React.Fragment key={item.id}>
        <MenuItem
          onClick={() => handleItemClick(item)}
          sx={MENU_ITEM_STYLES}
        >
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          {item.label}
        </MenuItem>
        {item.divider && <Divider sx={{ my: 0.5 }} />}
      </React.Fragment>
    ))}
    </Menu>
  );
});

// Reusable IconButtonWithTooltip component with proper prop types checking
const IconButtonWithTooltip = memo(({ title, onClick, sx = {}, children }) => (
  <Tooltip title={title}>
    <IconButton
      color="inherit"
      onClick={onClick}
      sx={sx}
      disableRipple={false}
    >
      {children}
    </IconButton>
  </Tooltip>
));

// Prop types validation would be good here if using PropTypes library
// IconButtonWithTooltip.propTypes = { ... }

// Constants for styling - moved outside component to prevent recreation
const APP_BAR_STYLES = {
  backgroundColor: '#ffffff',
  color: '#333333',
  boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
};

const MENU_BUTTON_STYLES = { mr: 2, display: { xs: 'flex', md: 'none' } };
const TITLE_STYLES = { flexGrow: 1, fontWeight: 'bold' };
const ACTION_CONTAINER_STYLES = { display: 'flex', alignItems: 'center' };
const ICON_MARGIN_STYLES = { mr: 1 };
const AVATAR_STYLES = { width: 32, height: 32, bgcolor: '#1976d2' };

// Authentication service functions - better to extract these to a separate auth service
const clearAuthData = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

const TopBar = memo(({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Event handlers with useCallback for performance
  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleNavigate = useCallback((route) => {
    navigate(route);
    setAnchorEl(null);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    // TODO: Implement actual logout logic here
    console.log('User logged out');

    // Clear authentication tokens or state
    clearAuthData();

    // Redirect to home page
    navigate(MAIN_ROUTES.home);
    setAnchorEl(null);
  }, [navigate]);  // Memoize toolbar actions to prevent unnecessary rerenders
  const toolbarActions = useMemo(() => (
    <Box sx={ACTION_CONTAINER_STYLES}>
      <IconButtonWithTooltip title="Search" sx={ICON_MARGIN_STYLES}>
        <SearchIcon />
      </IconButtonWithTooltip>

      <IconButtonWithTooltip title="Notifications" sx={ICON_MARGIN_STYLES}>
        <Badge badgeContent={4} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButtonWithTooltip>

      <IconButtonWithTooltip
        title="Account"
        onClick={handleClick}
        sx={{ ml: 1 }}
      >
        <Avatar sx={AVATAR_STYLES}>
          <AccountCircleIcon />
        </Avatar>
      </IconButtonWithTooltip>
    </Box>
  ), [handleClick]);

  return (
    <AppBar position="static" sx={APP_BAR_STYLES}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="toggle sidebar"
          onClick={toggleSidebar}
          sx={MENU_BUTTON_STYLES}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={TITLE_STYLES}
        >
          Educhain AI
        </Typography>

        {toolbarActions}        {/* Conditionally render the menu only when needed */}
        {open && (
          <AccountMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}</Toolbar>
    </AppBar>
  );
});

// Using React.memo for optimal performance
export default TopBar;