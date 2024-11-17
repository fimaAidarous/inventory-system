import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCategoryStart, deleteCategorySuccess, deleteCategoryFailure, fetchCategories } from '../redux/categorySlice';
import { Button, Snackbar, Alert } from '@mui/material';

const DeleteCategory = ({ categoryId }) => {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (!isConfirmed) return;

    dispatch(deleteCategoryStart());
    try {
      const response = await fetch(`http://localhost:9000/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      dispatch(deleteCategorySuccess(categoryId));
      dispatch(fetchCategories());
      setSuccessMessage('Category deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      dispatch(deleteCategoryFailure(error.message));      
      setErrorMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={errorMessage ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {errorMessage ? errorMessage : successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteCategory;
