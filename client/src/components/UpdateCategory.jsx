import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  fetchCategories,
} from '../redux/categorySlice';
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

const UpdateCategory = () => {
  const { categoryId } = useParams(); // Get categoryId from route
  const [formData, setFormData] = useState({ name: '' });
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.category);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (categories.length > 0) {
      const categoryToEdit = categories.find((category) => category._id === categoryId);
      if (categoryToEdit) {
        setFormData({ name: categoryToEdit.name });
      }
    }
  }, [categoryId, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateCategoryStart());
    try {
      const response = await fetch(`http://localhost:9000/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update category');
      }

      dispatch(updateCategorySuccess(data));
      setSuccessMessage("Category updated successfully!");
      setSnackbarOpen(true);
      dispatch(fetchCategories()); // Refresh category list
    } catch (error) {
      dispatch(updateCategoryFailure(error.message));
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
          Edit Category
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
            sx={{ borderRadius: '8px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: '16px' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Edit Category'}
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

export default UpdateCategory;
