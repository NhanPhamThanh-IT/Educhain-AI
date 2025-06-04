import { useState } from 'react';
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
  Collapse
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Quiz as QuizIcon,
  Person as PersonIcon,
  Assignment as MissionsIcon,
  Leaderboard as LeaderboardIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  StarBorder,
  Logout as LogoutIcon
} from '@mui/icons-material';

// Sidebar width
const drawerWidth = 240;

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Handle collapsible menu
  const handleClick = () => {
    setOpen(!open);
  };

  // Navigation items
  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'My Courses', path: '/my-courses', icon: <SchoolIcon /> },
    { text: 'Study Materials', path: '/materials', icon: <BookIcon /> },
    { text: 'Quizzes & Tests', path: '/quizzes', icon: <QuizIcon /> },
    { text: 'Missions', path: '/missions', icon: <MissionsIcon /> },
    { text: 'Leaderboard', path: '/leaderboard', icon: <LeaderboardIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1a2236',
          color: '#ffffff',
        },
      }}
    >
      {/* Logo/Brand Area */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 2
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Educhain
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

      {/* Main Menu Items */}
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                py: 1,
                bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.08)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)'
                }
              }}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon sx={{ color: '#ffffff', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Collapsible Sub-menu Example */}
        {/* <ListItem disablePadding>
          <ListItemButton onClick={handleClick} sx={{ py: 1 }}>
            <ListItemIcon sx={{ color: '#ffffff', minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{ color: '#ffffff', minWidth: 40 }}>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Preferences" />
            </ListItemButton>
          </List>
        </Collapse> */}
      </List>

      {/* Bottom Section with Logout */}
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        <ListItem disablePadding>
          <ListItemButton sx={{ py: 1 }}>
            <ListItemIcon sx={{ color: '#ffffff', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default SideBar;