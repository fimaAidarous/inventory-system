import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  updateSupplierStart,
  updateSupplierSuccess,
  updateSupplierFailure,
  fetchSuppliers, // Import the fetchSuppliers action
} from '../redux/supplierSlice';
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

const UpdateSupplier = () => {
  const { supplierId } = useParams(); // Get supplierId from route
  const [formData, setFormData] = useState({ name: '', contact: '' });
  const dispatch = useDispatch();
  const { loading, error, suppliers } = useSelector((state) => state.supplier);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (suppliers.length > 0) {
      const supplierToEdit = suppliers.find((supplier) => supplier._id === supplierId);
      if (supplierToEdit) {
        setFormData({ name: supplierToEdit.name, contact: supplierToEdit.contact });
      }
    }
  }, [supplierId, suppliers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateSupplierStart());
    try {
      const response = await fetch(`http://localhost:9000/api/supplier/${supplierId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update supplier');
      }

      dispatch(updateSupplierSuccess(data)); // Pass the updated supplier data to the success action
      setSuccessMessage("Supplier updated successfully!"); 
      setSnackbarOpen(true); 

      // Fetch the suppliers again to refresh the list
      dispatch(fetchSuppliers());
    } catch (error) {
      dispatch(updateSupplierFailure(error.message));
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
          Edit Supplier
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Supplier Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={{ borderRadius: '8px' }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Supplier Contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            required
            sx={{ borderRadius: '8px' }}
          />
          <Button
            type="submit"
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
            {loading ? <CircularProgress size={24} /> : 'Edit Supplier'}
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

export default UpdateSupplier;
