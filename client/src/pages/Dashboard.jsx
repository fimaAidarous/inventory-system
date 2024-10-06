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
  Tooltip,
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

const drawerWidth = 150; // Sidebar width updated for text + icon layout

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
            <ListItemIcon sx={{ minWidth: '3px' }}> {/* Adjusted minWidth */}
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ marginLeft: '1=px' }} /> {/* Reduced margin */}
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
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: darkMode ? '#333' : '#1976d2',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 0, display: { sm: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Latest Sales & Products
            </Typography>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: darkMode ? '#333' : '#f4f6f8' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: darkMode ? '#181818' : '#f4f6f8',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Latest Sales</Typography>
                    <Typography variant="body1">
                      Display the latest sales information here...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Top Products</Typography>
                    <Typography variant="body1">
                      Display the top-performing products here...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
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
