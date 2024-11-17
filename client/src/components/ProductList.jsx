import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { Link } from "react-router-dom"; 
import { Container, Typography, List, ListItem, ListItemText, Button, Grid, Paper, CircularProgress, Snackbar, Alert } from "@mui/material";
import DeleteProduct from "./DeleteProduct";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress style={{ margin: "20px auto", display: "block" }} />;
  if (error) return <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseSnackbar}><Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>{error}</Alert></Snackbar>;
  if (products.length === 0) return <Typography variant="h6" align="center">No products found!</Typography>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">Product List</Typography>
      <Paper elevation={3} sx={{ padding: "16px", borderRadius: "8px" }}>
        <List>
          {products.map((product) => (
            <ListItem key={product._id} sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText primary={product.name} secondary={`Price: ${product.price} | Stock: ${product.stock_quantity}`} />
              <Grid container spacing={1}>
                <Grid item>
                  <Button component={Link} to={`/update-product/${product._id}`} variant="contained" color="primary">
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <DeleteProduct productId={product._id} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ProductList;
