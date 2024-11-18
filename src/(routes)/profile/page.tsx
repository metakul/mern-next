import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import SocialProfiles from '@/components/SocialProfile';
import ContractInfo from '@/components/ContractInfo/ContractInfo';
import { AppDispatch } from '@/lib/store';
import { selectPaymentInfo } from '@/lib/slices/DropShip/Payment/paymentSlice';
import { fetchPaymentInfo } from '@/lib/slices/DropShip/Payment/paymentSliceApi';

const tokenContractAddress = import.meta.env.VITE_PUBLIC_TOKEN_CONTRACT_ADDRESS as string;
const thirdwebDashboard = import.meta.env.VITE_THIRDWEB_DASHBOARD as string;

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { paymentInfo, loading, error } = useSelector(selectPaymentInfo);

  useEffect(() => {
    const paymentId = "123";
    dispatch(fetchPaymentInfo(paymentId));
  }, [dispatch]);

  return (
    <Container sx={{ mt: 16 }}>
      <>
        <BreadCrumbs currentPath={"/profile"} />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            padding: '0 1rem',
            margin: '0 auto',
            mt: 4,
            mb: 8,
          }}
        >
          <Typography variant="h5" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
            Know More and Earn:
          </Typography>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {paymentInfo && (
            <Box>
              <Typography variant="body1">Payment ID: {paymentInfo.id}</Typography>
              <Typography variant="body1">Amount: {paymentInfo.amount}</Typography>
            </Box>
          )}
          <SocialProfiles />
          <ContractInfo
            urlBase={`${thirdwebDashboard}/${tokenContractAddress}`}
            buttonText="ERC20 Contract"
          />
        </Box>
      </>
    </Container>
  );
}
