import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '@/lib/slices/authApiSlice';
import { AppDispatch } from '@/lib/store';
import { authLoading } from '@/lib/slices/authSlice';
import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

interface SendOtpProps {
  onOtpSent: (phoneNumber: string) => void;
}

const SendOtpForm: React.FC<SendOtpProps> = ({ onOtpSent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthLoading = useSelector(authLoading);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    try {
      if (!phoneNumber) {
        setError('Phone number is required');
        return;
      }
      setError('');
      await dispatch(sendOtp({ phoneNumber })).unwrap();
      onOtpSent(phoneNumber);
    } catch (error) {
      setError('Failed to send OTP');
    }
  };

  return (
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
            error={!!error}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </Stack>
      </Grid>
   
    </Grid>
  );
};

export default SendOtpForm;