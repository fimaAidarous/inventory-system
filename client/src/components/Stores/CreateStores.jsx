import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  MenuItem,
} from "@mui/material";
import { createStoreStart, createStoreSuccess, createStoreFailure } from "../../redux/storesSlice";
import { fetchProducts } from "../../redux/productSlice";

const CreateStore = () => {
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.stores);
  const { products } = useSelector((state) => state.product);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createStoreStart());

    try {
      const response = await fetch('http://localhost:9000/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create store entry');
      }

      dispatch(createStoreSuccess(data));
      setSuccessMessage('Store entry created successfully!');
      setFormData({
        productId: '',
        quantity: '',
      });
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error creating store entry:', error);
      dispatch(createStoreFailure(error.message)); // Use the correct action name here
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: "8px", borderRadius: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Store Entry
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            variant="outlined"
            margin="dense"
            fullWidth
            label="Product"
            value={formData.productId}
            onChange={(e) =>
              setFormData({ ...formData, productId: e.target.value })
            }
            required
          >
            {products.map((product) => (
              <MenuItem key={product._id} value={product._id}>
                {product.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
            inputProps={{ min: 0 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: "8px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Create Store Entry"}
          </Button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {error ? error : successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default CreateStore;
