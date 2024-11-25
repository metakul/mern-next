import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserDispatcher } from '@/lib/slices/authApiSlice';
import { AppDispatch } from '@/lib/store';
import { authLoading, isAuthenticated, selectToken } from '@/lib/slices/authSlice';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import ChooseLocation from '../../Location/ChooseLocation';
import { accountStatus, UserCategory } from '@/Datatypes/enums';
import { jwtDecode } from 'jwt-decode';

interface FormData {
  address: string | { latitude: number; longitude: number };
  email: string;
  name: string;
}

interface CustomJwtPayload {
  phoneNumber: string;
  email: string;
  name: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthLoading = useSelector(authLoading);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const myToken = useSelector(selectToken);
  const [formData, setFormData] = useState<FormData>({ address: '', email: '', name: '' });
  const [openMap, setOpenMap] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isUserAuthenticated) {
      const decodedToken = jwtDecode<CustomJwtPayload>(myToken);
      setFormData((prevData) => ({
        ...prevData,
        email: decodedToken?.email,
        name: decodedToken?.name,
      }));
    }
  }, [isUserAuthenticated]);

  const handleAddressChange = (address: string | { latitude: number; longitude: number } | null) => {
    if (address) {
      setFormData((prevData) => ({
        ...prevData,
        address,
      }));
      setError(null);
    }
  };

  const toggleMapInfo = () => {
    setOpenMap(!openMap);
  };

  const handleRegister = async () => {
    try {
      const { email, name, address } = formData;
      if (!email || !name || !address) {
        setError('All fields are required');
        return;
      }
      setError('');
      dispatch(registerUserDispatcher({ email, name, phoneNumber: '', address, accountStatus: accountStatus.Pending, category: UserCategory.Verifier }));
    } catch (error) {
      setError('Failed to register');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          error={!!error && !formData.name}
          helperText={!!error && !formData.name ? 'Name is required.' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          error={!!error && !formData.email}
          helperText={!!error && !formData.email ? 'Email is required.' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        {openMap && <ChooseLocation setAddress={handleAddressChange} open={openMap} handleClose={toggleMapInfo} />}
        <Box
          className="relative flex items-center w-full h-12 rounded-lg border border-black focus-within:shadow-lg overflow-hidden"
          onClick={toggleMapInfo}
        >
          {formData.address && typeof formData.address === 'string' ? (
            <Typography variant="body2" className="flex overflow-hidden">
              {formData.address}
            </Typography>
          ) : (
            <Box className="grid place-items-center h-full w-16">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
              </svg>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button
          disableElevation
          fullWidth
          size="large"
          onClick={handleRegister}
          variant="contained"
          color="primary"
          disabled={isAuthLoading}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;