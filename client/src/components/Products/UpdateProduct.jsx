import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  fetchProducts, 
} from '../../redux/productSlice';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';

const UpdateProduct = () => {
  const { productId } = useParams(); 
  const [formData, setFormData] = useState({ name: '', description: '', price: '', stock_quantity: '' });
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.product);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (products.length > 0) {
      const productToEdit = products.find((product) => product._id === productId);
      if (productToEdit) {
        setFormData({ name: productToEdit.name, description: productToEdit.description, price: productToEdit.price, stock_quantity: productToEdit.stock_quantity });
      }
    }
  }, [productId, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProductStart());
    try {
      const response = await fetch(`http://localhost:9000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update product');
      }

      dispatch(updateProductSuccess(data)); 
      setSuccessMessage("Product updated successfully!"); 
      setSnackbarOpen(true); 
      dispatch(fetchProducts());
    } catch (error) {
      dispatch(updateProductFailure(error.message));
      setSnackbarOpen(true); 
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '20px', borderRadius: '16px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={{ borderRadius: '8px' }}
          />
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            sx={{ borderRadius: '8px' }}
          />
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            type="number"
            sx={{ borderRadius: '8px' }}
          />
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Stock Quantity"
            value={formData.stock_quantity}
            onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
            required
            type="number"
            sx={{ borderRadius: '8px' }}
          />
          <Button
            type="dense"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              marginTop: '16px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Edit Product'}
          </Button>
        </form>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {error ? error : successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default UpdateProduct;
