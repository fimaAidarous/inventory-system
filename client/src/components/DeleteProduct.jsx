import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} from '../redux/productSlice';
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

const DeleteProduct = ({ productId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    if (!productId) {
      alert('No product ID provided. Please try again.');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      dispatch(deleteProductStart());
      try {
        const response = await fetch(`http://localhost:9000/api/products/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to delete product: ${errorMessage}`);
        }

        dispatch(deleteProductSuccess(productId));
        setSuccessMessage('Product deleted successfully!');
      } catch (err) {
        console.error('Delete Error:', err);
        dispatch(deleteProductFailure(err.message));
        setSuccessMessage('Failed to delete product.');
      }
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleDelete}
        variant="contained"
        color="secondary"
        disabled={loading}
        sx={{
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        {loading ? <CircularProgress size={24} /> : 'Delete'}
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteProduct;
