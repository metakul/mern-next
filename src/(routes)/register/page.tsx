

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserDispatcher } from '@/lib/slices/RegisterUsers/RegisterApiSlice';
import { AppDispatch } from '@/lib/store';
import { accountStatus, UserCategory } from '@/Datatypes/interfaces/interface';
import { Container, TextField, Button, Grid, Typography, MenuItem } from '@mui/material';
import CustomDialog from '@/components/Dailog/Dailog';
import LoginForm from '@/components/Forms/LoginForm';

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    accountStatus: accountStatus.Pending,
    category: UserCategory.User,
    subcategory: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    dispatch(registerUserDispatcher(formData));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register User
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <MenuItem value={UserCategory.User}>User</MenuItem>
              <MenuItem value={UserCategory.Holder}>Holder</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleRegister}>
              Register
            </Button>
            <CustomDialog
                className="ml-2"
                open={isDialogOpen}
                onClose={() => setDialogOpen(!isDialogOpen)}
                triggerButtonText={"Admin Login"}
                title={"Login Now"}
                description={"Only admin are availabale to login for now"}
                >
                <LoginForm
                  loginTitle="User Login"
                  userType="USER"
                  OnFormSuccess={() => setDialogOpen(!isDialogOpen)}
                  />
              </CustomDialog>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterPage;
