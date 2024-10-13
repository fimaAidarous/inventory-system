import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu,
  Inventory,
  ShoppingCart,
  People,
} from "@mui/icons-material";
import { Link, Routes, Route } from "react-router-dom"; // Correct imports from react-router-dom
import ProductsTable from "../components/Products";
import Purchases from "../components/Purchases";
import CreateSupplier from "../components/CreateSupplier";
import UpdateSupplier from "../components/UpdateSupplier";
import DeleteSupplier from "../components/DeleteSupplier";
import SupplierList from "../components/SupplierList";

const drawerWidth = 150;

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#f4f6f8",
      },
    },
  });

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mx: "auto" }}>
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button component={Link} to="/products">
          <ListItemIcon sx={{ minWidth: "3px" }}>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="Products" sx={{ marginLeft: "1=px" }} />
        </ListItem>
        <ListItem button component={Link} to="/purchases">
          <ListItemIcon sx={{ minWidth: "3px" }}>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Purchases" />
        </ListItem>
        <ListItem button component={Link} to="/create-supplier">
          <ListItemIcon sx={{ minWidth: "3px" }}>
            <People />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: sidebarOpen
              ? { sm: `calc(100% - ${drawerWidth}px)` }
              : "100%",
            ml: sidebarOpen ? { sm: `${drawerWidth}px` } : "0",
            backgroundColor: darkMode ? "#333" : "#1976d2",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              onClick={handleSidebarToggle}
              sx={{ mr: 2, display: { sm: "block" } }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Inventory Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            width: { sm: sidebarOpen ? drawerWidth : 0 },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleSidebarToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant={sidebarOpen ? "permanent" : "temporary"}
            sx={{
              display: { xs: "none", sm: sidebarOpen ? "block" : "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: darkMode ? "#333" : "#f4f6f8",
              },
            }}
            open={sidebarOpen}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: darkMode ? "#181818" : "#f4f6f8",
          }}
        >
          <Toolbar />

          <Routes>
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/create-supplier" element={<CreateSupplier />} />
            <Route path="/update-supplier/:id" element={<UpdateSupplier />} />
            <Route path="/delete-supplier/:id" element={<DeleteSupplier />} />
            <Route path="/suppliers" element={<SupplierList />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
