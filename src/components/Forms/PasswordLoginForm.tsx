import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserDispatcher, sendOtp, verifyOtp } from '@/lib/slices/authApiSlice';
import { AppDispatch } from '@/lib/store';
import { authLoading, isAuthenticated, SelectConactVerified, SelectContact, selectToken, selectTrxId } from '@/lib/slices/authSlice';

import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ChooseLocation from '../Location/ChooseLocation';
import { jwtDecode } from 'jwt-decode';
import { accountStatus, UserCategory } from '@/Datatypes/enums';

interface LoginProps {
  onVerified?: (phoneNumber: string) => void;
}

interface FormData {
  address: string | { latitude: number; longitude: number };
  email: string;
  name: string;
}

interface CustomJwtPayload {
  phoneNumber: string;
  email: string;
  name: string
}

const PasswordlessLoginForm: React.FC<LoginProps> = ({ onVerified }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthLoading = useSelector(authLoading);
  const trxId = useSelector(selectTrxId); // Retrieve trxId from Redux state
  const isUserAuthenticated = useSelector(isAuthenticated);
  const isContactVerified = useSelector(SelectConactVerified);
  const [formData, setFormData] = useState<FormData>({ address: '', email: '', name: '' });
  const [openMap, setOpenMap] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [contactVerified, setContactVerified] = useState(isContactVerified);

  const verifiedContactState = useSelector(SelectContact);
  const [verifiedContact, setVerifiedContact] = useState<string>(verifiedContactState); // Store verified contact



  const myToken = useSelector(selectToken)


  React.useEffect(() => {

    if (isUserAuthenticated) {
      const decodedToken = jwtDecode<CustomJwtPayload>(myToken);
      console.log("Decoded Token:", decodedToken)
      setVerifiedContact(decodedToken?.phoneNumber)
      setFormData((prevData) => ({
        ...prevData,
        email: decodedToken?.email,
        name: decodedToken?.name,
      }));
      setContactVerified(true)

    }
  }, [isUserAuthenticated,verifiedContactState]);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent

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

  const handleSendOtp = async () => {
    try {
      if (!phoneNumber) {
        setError('Phone number is required');
        return;
      }
      setError('');
      await dispatch(
        sendOtp({ phoneNumber })
      ).unwrap(); // Trigger the OTP API
      setVerifiedContact(phoneNumber)
      setOtpSent(true); // Mark OTP as sent
    } catch (error) {
      setError('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!otp) {
        setError('OTP is required');
        return;
      }
      setError('');
      await dispatch(
        verifyOtp({
          otp,
          trxId: trxId || '',
          deviceId: '550e8400-e29b-41d4-a716-446655440000',
          phoneNumber,
        })
      ).unwrap(); // Trigger the Verify OTP API

      onVerified && onVerified(phoneNumber); // Trigger success callback
    } catch (error) {
      setError('Failed to verify OTP');
    }
  };
  const handleRegister = async () => {
    try {
      if (!otp) {
        setError('OTP is required');
        return;
      }
      setError('');

      const { email, name, address } = formData

      

      if (!isUserAuthenticated) {
        dispatch(registerUserDispatcher({ email, name, phoneNumber: verifiedContact, address, accountStatus: accountStatus.Pending, category: UserCategory.Verifier }))
      }

      onVerified && onVerified(phoneNumber); // Trigger success callback
    } catch (error) {
      setError('Failed to verify OTP');
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
    <div>
      <form noValidate>
        <Grid container spacing={1}>
          {!isContactVerified &&
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                <OutlinedInput
                  id="phone-number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  fullWidth
                  error={!!error && !otpSent}
                />
                {error && !otpSent && (
                  <FormHelperText error>{error}</FormHelperText>
                )}
              </Stack>
            </Grid>
          }

          {otpSent && !isContactVerified && (
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="otp">OTP</InputLabel>
                <OutlinedInput
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  fullWidth
                  error={!!error && otpSent}
                />
                {error && otpSent && (
                  <FormHelperText error>{error}</FormHelperText>
                )}
              </Stack>

            </Grid>
          )}
          {!isUserAuthenticated && isContactVerified &&
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
          }

          <Grid item xs={12}>
            {
              !isContactVerified ? (
                !otpSent ? (
                  <Button
                  disableElevation
                  fullWidth
                  size="large"
                  onClick={handleSendOtp}
                  variant="contained"
                  color="primary"
                  disabled={isAuthLoading}
                >
                  Send OTP
                </Button>
                ) : (
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    onClick={handleVerifyOtp}
                    variant="contained"
                    color="primary"
                    disabled={isAuthLoading}
                  >
                    Verify OTP
                  </Button>
                )
              ) : (
               
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
              )
            }


          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PasswordlessLoginForm;
