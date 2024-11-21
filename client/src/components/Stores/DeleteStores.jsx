import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStoreStart,
  deleteStoreSuccess,
  deleteStoreFailure,
} from "../../redux/storesSlice";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";

const DeleteStore = ({ storeId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.stores);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async () => {
    if (!storeId) {
      alert("No store ID provided. Please try again.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this store entry?"
    );
    if (confirmed) {
      dispatch(deleteStoreStart());
      try {
        const response = await fetch(
          `http://localhost:9000/api/stores/${storeId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to delete store: ${errorMessage}`);
        }

        dispatch(deleteStoreSuccess(storeId));
        setSuccessMessage("Store entry deleted successfully!");
      } catch (err) {
        console.error("Delete Error:", err);
        dispatch(deleteStoreFailure(err.message));
        setSuccessMessage("Failed to delete store entry.");
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
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {loading ? <CircularProgress size={24} /> : "Delete"}
      </Button>

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
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteStore;
