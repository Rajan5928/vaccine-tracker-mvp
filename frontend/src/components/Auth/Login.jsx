import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/api';

const Login = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    consent: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.consent) {
      alert('You must consent to data usage to register.');
      return;
    }

    try {
      await axios.post('/auth/register', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            onChange={handleChange}
            value={form.email}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            onChange={handleChange}
            value={form.password}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={form.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="provider">Provider</MenuItem>
            </Select>
          </FormControl>

          <p style={{textAlign: 'center'}} >New User? Register here</p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
