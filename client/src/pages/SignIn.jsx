import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Create a navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('User signed in successfully!');
        setError('');
        // Redirect to dashboard
        navigate('/dashboard'); // Navigate to the dashboard route
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
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: 2, borderRadius: 4, boxShadow: 5, border: '2px solid green', width: '100%', maxWidth: 300 }}>
        <Typography component="h1" variant="h6" sx={{ marginBottom: 2, color: '#00796b' }}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '90%' }}>
          <TextField fullWidth margin="dense" size="small" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <TextField fullWidth margin="dense" size="small" label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2, mb: 1, backgroundColor: '#00796b', color: '#ffffff' }} size="small">
            Sign In
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%' }}>{success}</Alert>}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Don't have an account? 
            <Link href="/sign-up" sx={{ color: '#00796b', cursor: 'pointer' }}>Sign Up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
