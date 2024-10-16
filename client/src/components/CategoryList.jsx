import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import { Link } from "react-router-dom";
import { Container, Typography, List, ListItem, ListItemText, Button, Grid, Paper, CircularProgress, Snackbar, Alert } from "@mui/material";
import DeleteCategory from "./DeleteCategory";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCloseSnackbar = () => {
    // Logic to close snackbar
  };

  if (loading) return <CircularProgress style={{ margin: "20px auto", display: "block" }} />;
  if (error)
    return (
      <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    );
  if (categories.length === 0)
    return (
      <Typography variant="h6" align="center">
        No categories found!
      </Typography>
    );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Category List
      </Typography>
      <Paper elevation={3} sx={{ padding: "16px", borderRadius: "8px", marginBottom: "20px" }}>
        <List>
          {categories.map((category) => (
            <ListItem key={category._id} sx={{ borderBottom: "1px solid #e0e0e0", padding: "8px" }}>
              <ListItemText
                primary={category.name}
                primaryTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                sx={{ marginRight: "20px" }}
              />
              <Grid container spacing={1}>
                <Grid item>
                  <Link to={`/update-category/${category._id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">Edit</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <DeleteCategory categoryId={category._id} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default CategoryList;
