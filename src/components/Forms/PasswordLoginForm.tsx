import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '@/lib/slices/authApiSlice';
import { AppDispatch } from '@/lib/store';
import { authLoading, selectTrxId } from '@/lib/slices/authSlice';

import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

interface LoginProps {
  onVerified?: (phoneNumber: string) => void;
}

const PasswordlessLoginForm: React.FC<LoginProps> = ({ onVerified }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthLoading = useSelector(authLoading);
  const trxId = useSelector(selectTrxId); // Retrieve trxId from Redux state

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent

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

  return (
    <div>
      <form noValidate>
        <Grid container spacing={1}>
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

          {otpSent && (
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

          <Grid item xs={12}>
            {!otpSent ? (
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
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PasswordlessLoginForm;
