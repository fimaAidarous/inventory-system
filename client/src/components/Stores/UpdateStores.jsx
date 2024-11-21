import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  updateStoreStart,
  updateStoreSuccess,
  updateStoreFailure,
  fetchStores,
} from '../../redux/storesSlice';
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

const UpdateStore = () => {
  const { storeId } = useParams(); // Get storeId from URL params
  const [formData, setFormData] = useState({ productId: '', quantity: '' });
  const dispatch = useDispatch();
  const { loading, error, stores } = useSelector((state) => state.store);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For navigation after update

  // Fetch store details when storeId changes
  useEffect(() => {
    if (stores.length > 0) {
      const storeToEdit = stores.find((store) => store._id === storeId);
      if (storeToEdit) {
        setFormData({
          productId: storeToEdit.productId,
          quantity: storeToEdit.quantity,
        });
      }
    }
  }, [storeId, stores]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being submitted:', formData); // Debugging

    dispatch(updateStoreStart()); // Start loading state

    try {
      const response = await fetch(`http://localhost:9000/api/stores/${storeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update store');
      }

      // Dispatch success action and update message
      dispatch(updateStoreSuccess(data));
      setSuccessMessage('Store updated successfully!');
      setSnackbarOpen(true);

      // Fetch updated stores list and redirect to the store list page
      dispatch(fetchStores());
      navigate('/stores');
    } catch (error) {
      dispatch(updateStoreFailure(error.message));
      setSnackbarOpen(true); // Show snackbar on error
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '20px', borderRadius: '16px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Store
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Product ID"
            value={formData.productId}
            onChange={(e) =>
              setFormData({ ...formData, productId: e.target.value })
            }
            required
            sx={{ borderRadius: '8px' }}
          />
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
            type="number"
            sx={{ borderRadius: '8px' }}
          />
          <Button
            type="submit" // Ensure this is set to submit
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
            {loading ? <CircularProgress size={24} /> : 'Edit Store'}
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

export default UpdateStore;
