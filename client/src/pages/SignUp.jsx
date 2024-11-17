import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, MenuItem, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'employee',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSignInMode, setIsSignInMode] = useState(false);
  const navigate = useNavigate();  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignInMode ? 'http://localhost:9000/api/auth/signin' : 'http://localhost:9000/api/auth/signup';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(isSignInMode ? 'Signin successful!' : 'User created successfully!');
        setError('');
        setFormData({ username: '', email: '', password: '', role: 'employee' }); // Reset form

        if (!isSignInMode) {
          navigate('/sign-in');
        }
      } else {
        const errMessage = await response.text();
        setError(errMessage || 'Something went wrong');
        setSuccess('');
      }
    } catch (error) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // this one is for the dhererka
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 1,
          borderRadius: 4,
          boxShadow: 5,
          border: '2px solid green',
          width: '90%', // this one is for balaca 
          maxWidth: 300, 
        }}
      >
        <Typography component="h1" variant="h6" sx={{ marginBottom: 2, color: '#00796b' }}>
          {isSignInMode ? 'Sign In' : 'Sign Up'}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {!isSignInMode && (
            <TextField
              fullWidth
              margin="dense"
              size="small"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required={!isSignInMode}
            />
          )}
          <TextField
            fullWidth
            margin="dense"
            size="small"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            size="small"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isSignInMode && (
            <TextField
              fullWidth
              margin="dense"
              size="small"
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="cashier">Cashier</MenuItem>
            </TextField>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 1, mb: 1, backgroundColor: '#00796b', color: '#ffffff' }}
            size="small"
          >
            {isSignInMode ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%' }}>{success}</Alert>}
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {isSignInMode ? "Don't have an account?" : 'Already have an account? '}
            <Link
              href="#"
              sx={{ color: '#00796b', cursor: 'pointer' }}
              onClick={() => setIsSignInMode(!isSignInMode)}
            >
              {isSignInMode ? 'Sign Up' : 'Sign In'}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
