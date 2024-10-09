import React, { useState } from 'react';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  ListItemIcon,
  Card,
  CardContent
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu,
  Inventory,
  ShoppingCart,
  ShoppingBag,
  AttachMoney,
  Sell,
  People
} from '@mui/icons-material';
import ProductsTable from '../components/Products';
import Purchases from '../components/Purchases';
import PurchaseItems from '../components/PurchaseItems';
import Sales from '../components/Sales';
import SalesItem from '../components/SalesItem';
import Suppliers from '../components/Suppliers';

const drawerWidth = 150;

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // State for sidebar open/close
  const [selectedTable, setSelectedTable] = useState('Products');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#f4f6f8',
      },
    },
  });

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderTable = () => {
    switch (selectedTable) {
      case 'Products':
        return <ProductsTable />;
      case 'Purchases':
        return <Purchases />;
      case 'PurchaseItems':
        return <PurchaseItems />;
      case 'Sales':
        return <Sales />;
      case 'SalesItem':
        return <SalesItem />;
      case 'Suppliers':
        return <Suppliers />;
      default:
        return <ProductsTable />;
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mx: 'auto' }}>
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: 'Products', icon: <Inventory /> },
          { text: 'Purchases', icon: <ShoppingCart /> },
          { text: 'PurchaseItems', icon: <ShoppingBag /> },
          { text: 'Sales', icon: <AttachMoney /> },
          { text: 'SalesItem', icon: <Sell /> },
          { text: 'Suppliers', icon: <People /> }
        ].map((item) => (
          <ListItem button key={item.text} onClick={() => setSelectedTable(item.text)}>
            <ListItemIcon sx={{ minWidth: '3px' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ marginLeft: '1=px' }} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: sidebarOpen ? { sm: `calc(100% - ${drawerWidth}px)` } : '100%', // Adjust width when sidebar is closed
            ml: sidebarOpen ? { sm: `${drawerWidth}px` } : '0', // Remove margin when sidebar is closed
            backgroundColor: darkMode ? '#333' : '#1976d2',
          }}
        >
          <Toolbar>
            {/* Toggle Button for Sidebar */}
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              onClick={handleSidebarToggle}
              sx={{ mr: 2, display: { sm: 'block' } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Inventory Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: sidebarOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant={sidebarOpen ? 'permanent' : 'temporary'} // Change variant based on sidebar state
            sx={{
              display: { xs: 'none', sm: sidebarOpen ? 'block' : 'none' }, // Hide the sidebar when it's closed in full screen
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: darkMode ? '#333' : '#f4f6f8' },
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
            backgroundColor: darkMode ? '#181818' : '#f4f6f8',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, backgroundColor: darkMode ? '#333' : '#fff' }}>
                  <Typography variant="h5" component="div">
                    {selectedTable}
                  </Typography>
                  {renderTable()}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
