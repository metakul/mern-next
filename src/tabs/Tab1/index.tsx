import { Box, Typography } from '@mui/material';
import MarqueeCryptoNew from '@/components/MarqueCrypto';
import InstallPWA from '@/PWA/InstallPwa';
import { getColors } from '@/layout/Theme/themes';
import DropShipItems from './DropShipItems';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { fetchCartApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
const Tab1 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticatedUser = useSelector(isAuthenticated);

  useEffect(() => {
    // Dispatch the fetchCartApi thunk to load cart items when the component mounts
    dispatch(fetchCartApi({ isAuthenticated: isAuthenticatedUser }));
  }, [dispatch]);

  return (
    <>
      <h1 className="mb-4 pt-2 pb-2 underline underline-offset-4 text-center  font-display text-xl open-sans flex justify-center items-center" style={{ color: getColors().blueAccent[100], cursor: "pointer" }}>
        whatiwear   <LocalShippingIcon sx={{
          ml: 1
        }} />
      </h1>
      <MarqueeCryptoNew />
      <Box sx={{
      }}>
        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Winter Sales
        </Typography>
        <DropShipItems categoryType="winterwear" />
        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Most Liked Shirt
        </Typography>
        <DropShipItems categoryType="shirt" />
        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Hot Deals
        </Typography>
        <DropShipItems categoryType="hotdeals" />
        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Featured Items
        </Typography>
        <DropShipItems />
      </Box>
      <InstallPWA />
    </>
  );
};

export default Tab1;
