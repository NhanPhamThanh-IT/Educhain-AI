import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';

const drawerWidth = 220;

const Header = () => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Educhain-AI
      </Typography>
    </Toolbar>
  </AppBar>
);

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { text: 'Profile', path: '/profile' },
            { text: 'Settings', path: '/settings' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

const UserLayoutB = () => (
  <Box sx={{ display: 'flex' }}>
    <Header />
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px`, mt: 8 }}>
      <Outlet />
    </Box>
  </Box>
);

export default UserLayoutB; 