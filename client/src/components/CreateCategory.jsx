import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
} from '../redux/categorySlice';

const CreateCategory = () => {
  const [formData, setFormData] = useState({ name: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.category);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createCategoryStart());
    try {
      const response = await fetch("http://localhost:9000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create category");
      }
      dispatch(createCategorySuccess(data));
      setSuccessMessage("Category created successfully!");
      setFormData({ name: '' });
      setSnackbarOpen(true);
    } catch (error) {
      dispatch(createCategoryFailure(error.message));
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '20px', borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Category
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={{ borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
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
            {loading ? <CircularProgress size={24} /> : 'Create Category'}
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

export default CreateCategory;
