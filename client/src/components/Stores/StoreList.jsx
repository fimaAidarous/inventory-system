import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores } from "../../redux/storesSlice";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Paper,
} from "@mui/material";
import DeleteStores from "../Stores/DeleteStores";

const StoreList = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  if (loading)
    return (
      <CircularProgress style={{ margin: "20px auto", display: "block" }} />
    );
  if (error)
    return (
      <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    );
  if (stores.length === 0)
    return (
      <Typography variant="h6" align="center">
        No stores found!
      </Typography>
    );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Store List
      </Typography>
      <Paper elevation={3} sx={{ padding: "16px", borderRadius: "8px" }}>
        <List>
          {stores.map((store) => (
            <ListItem
              key={store._id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                primary={store.name}
                secondary={`Contact: ${store.contact}`}
              />
              <Grid container spacing={1}>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <DeleteStores storeId={store._id} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default StoreList;
