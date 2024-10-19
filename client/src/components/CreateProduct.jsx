import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  MenuItem,
} from "@mui/material";
import {
  createProductStart,
  createProductSuccess,
  createProductFailure,
} from "../redux/productSlice";
import { fetchCategories } from "../redux/categorySlice";
import { fetchSuppliers } from "../redux/supplierSlice";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    cost_price: "",
    stock_quantity: "",
    category_id: "",
    supplier_id: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { suppliers } = useSelector((state) => state.supplier);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProductStart());
  
    try {
      const response = await fetch('http://localhost:9000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log('API Response:', data); // Check the API response
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create product');
      }
  
      dispatch(createProductSuccess(data)); 
      setSuccessMessage('Product created successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        cost_price: '',
        stock_quantity: '',
        category_id: '',
        supplier_id: '',
      });
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error creating product:', error); 
      dispatch(createProductFailure(error.message));
      setSnackbarOpen(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: "20px", borderRadius: "16px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            multiline 
            rows={2} 
            sx={{
              borderRadius: "8px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Cost Price"
            value={formData.cost_price}
            onChange={(e) =>
              setFormData({ ...formData, cost_price: e.target.value })
            }
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Stock Quantity"
            value={formData.stock_quantity}
            onChange={(e) =>
              setFormData({ ...formData, stock_quantity: e.target.value })
            }
            required
          />
          <TextField
            select
            variant="outlined"
            margin="normal"
            fullWidth
            label="Category"
            value={formData.category_id}
            onChange={(e) =>
              setFormData({ ...formData, category_id: e.target.value })
            }
            required
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            variant="outlined"
            margin="normal"
            fullWidth
            label="Supplier"
            value={formData.supplier_id}
            onChange={(e) =>
              setFormData({ ...formData, supplier_id: e.target.value })
            }
            required
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier._id} value={supplier._id}>
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: "16px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Create Product"}
          </Button>
        </form>
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
            {error ? error : successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default CreateProduct;
