import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuppliers } from "../redux/supplierSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Container, Typography, List, ListItem, ListItemText, Button, Grid, Paper, CircularProgress, Snackbar, Alert } from "@mui/material";
import DeleteSupplier from "./DeleteSupplier";

const SupplierList = () => {
  const dispatch = useDispatch();
  const { suppliers, loading, error } = useSelector((state) => state.supplier);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleCloseSnackbar = () => {
    // Logic to close snackbar can be added if you're using local state for Snackbar
  };

  if (loading)
    return (
      <CircularProgress style={{ margin: "20px auto", display: "block" }} />
    );
  if (error)
    return (
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    );
  if (suppliers.length === 0)
    return (
      <Typography variant="h6" align="center">
        No suppliers found!
      </Typography>
    );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Supplier List
      </Typography>
      <Paper
        elevation={3}
        sx={{ padding: "16px", borderRadius: "8px", marginBottom: "20px" }}
      >
        <List>
          {suppliers.map((supplier) => (
            <ListItem
              key={supplier._id}
              sx={{ borderBottom: "1px solid #e0e0e0", padding: "8px" }}
            >
              <ListItemText
                primary={supplier.name}
                secondary={`Contact: ${supplier.contact}`}
                primaryTypographyProps={{
                  variant: "subtitle1",
                  fontWeight: "bold",
                }}
                secondaryTypographyProps={{ variant: "body2" }}
                sx={{ marginRight: "20px" }}
              />
              <Grid container spacing={1}>
                <Grid item>
                  {/* Wrap Button with Link */}
                  <Link to={`/update-supplier/${supplier._id}`} style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ "&:hover": { backgroundColor: "#1976d2" } }}
                    >
                      Edit
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  {/* Pass supplierId to DeleteSupplier */}
                  <DeleteSupplier supplierId={supplier._id} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default SupplierList;
