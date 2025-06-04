import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Drawer } from "@mui/material";
import { useState } from 'react';

import SideBar from "./SideBar";
import TopBar from "./TopBar";

// Sidebar width
const drawerWidth = 240;

const LoginLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f4f4f4",
        overflow: "hidden",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <CssBaseline />

      {/* Desktop sidebar */}
      <SideBar />

      {/* Mobile sidebar */}
      <Box component="nav" sx={{ display: { md: 'none' } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1a2236',
              color: '#ffffff',
            },
          }}
        >
          <SideBar />
        </Drawer>
      </Box>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#fff",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top Bar */}
        <TopBar toggleSidebar={handleDrawerToggle} />

        {/* Content Area */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box >
  );
}

export default LoginLayout;