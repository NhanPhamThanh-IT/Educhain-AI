import { useState, memo, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as MissionsIcon,
  Leaderboard as LeaderboardIcon,
  LocalGroceryStore as MarketIcon,
  CurrencyExchange as ExchangeIcon,
  Logout as LogoutIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

// Sidebar width values
const expandedWidth = 240;
const collapsedWidth = 65;

// Pre-defined styles to prevent regeneration on each render
const listStyles = { pt: 2 };
const dividerStyles = { bgcolor: 'rgba(255,255,255,0.1)' };
const bottomBoxStyles = { position: 'absolute', bottom: 0, width: '100%' };
const listItemStyles = { width: '100%' };
const menuIconButtonStyles = (expanded) => ({
  color: 'white',
  bgcolor: 'rgba(255,255,255,0.1)',
  '&:hover': {
    bgcolor: 'rgba(255,255,255,0.2)'
  },
  ...(expanded ? { ml: 1 } : { mx: 'auto' }),
});

// Navigation items defined as constant to prevent recreation
const MENU_ITEMS = [
  { text: 'Courses', path: '/my-courses', icon: SchoolIcon },
  { text: 'Market', path: '/market', icon: MarketIcon },
  { text: 'Missions', path: '/missions', icon: MissionsIcon },
  { text: 'Leaderboard', path: '/leaderboard', icon: LeaderboardIcon },
  { text: 'Exchange', path: '/exchange', icon: ExchangeIcon },
];

const SideBar = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true); // For sidebar expansion state

  // Toggle sidebar expansion with a stable reference
  const toggleSidebar = useCallback(() => {
    // Use function form to ensure we always get latest state
    setExpanded(prev => !prev);
  }, []);

  // Stable reference to menu items
  const menuItems = useMemo(() => MENU_ITEMS, []);// Memoize drawer styles based on expanded state
  const drawerStyles = useMemo(() => ({
    width: expanded ? expandedWidth : collapsedWidth,
    flexShrink: 0,
    display: { xs: 'none', md: 'block' },
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'width',
    '& .MuiDrawer-paper': {
      width: expanded ? expandedWidth : collapsedWidth,
      boxSizing: 'border-box',
      backgroundColor: '#1a2236',
      color: '#ffffff',
      overflowX: 'hidden',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'width',
    },
  }), [expanded]);

  // Memoize header box styles
  const headerBoxStyles = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: expanded ? 'space-between' : 'center',
    py: 2,
    px: expanded ? 2 : 0,
  }), [expanded]);

  return (
    <Drawer
      variant="permanent"
      sx={drawerStyles}
    >      {/* Logo/Brand Area */}
      <Box sx={headerBoxStyles}>
        {expanded && (
          <Typography variant="h5" sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>
            Educhain
          </Typography>
        )}
        <IconButton
          onClick={toggleSidebar}
          sx={menuIconButtonStyles(expanded)}
        >
          {expanded ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider sx={dividerStyles} />      {/* Main Menu Items */}
      <List sx={listStyles}>
        {useMemo(() => {
          // Common styles for all menu items, created only once per expanded state change
          const commonIconStyles = {
            color: '#ffffff',
            minWidth: expanded ? 40 : 0,
            mr: expanded ? 2 : 'auto'
          };

          const commonListItemStyles = { width: '100%' };

          return menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            // Create button style based on active state
            const buttonStyles = {
              py: 1,
              height: 48,
              width: '100%',
              justifyContent: expanded ? 'initial' : 'center',
              bgcolor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)',
              }
            };

            return (
              <ListItem key={item.text} disablePadding sx={commonListItemStyles}>
                <Tooltip title={expanded ? "" : item.text} placement="right" arrow>
                  <ListItemButton
                    sx={buttonStyles}
                    onClick={() => navigate(item.path)}
                  >
                    <ListItemIcon sx={commonIconStyles}>
                      <Icon />
                    </ListItemIcon>
                    {expanded && <ListItemText primary={item.text} />}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          });
        }, [expanded, location.pathname, navigate])}
      </List>{/* Bottom Section with Logout */}
      <Box sx={bottomBoxStyles}>
        <Divider sx={dividerStyles} />
        {useMemo(() => {
          // Memoize logout button styles
          const logoutButtonStyles = {
            py: 1,
            height: 48,
            width: '100%',
            justifyContent: expanded ? 'initial' : 'center',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.15)',
            }
          };

          // Memoize logout icon styles
          const logoutIconStyles = {
            color: '#ffffff',
            minWidth: expanded ? 40 : 0,
            mr: expanded ? 2 : 'auto'
          };

          return (
            <Tooltip title={expanded ? "" : "Logout"} placement="right" arrow>
              <ListItem disablePadding sx={listItemStyles}>
                <ListItemButton sx={logoutButtonStyles}>
                  <ListItemIcon sx={logoutIconStyles}>
                    <LogoutIcon />
                  </ListItemIcon>
                  {expanded && <ListItemText primary="Logout" />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        }, [expanded])}
      </Box>
    </Drawer>
  );
});

export default SideBar;