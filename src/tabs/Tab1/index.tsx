import { Box, Typography } from '@mui/material';
// import MarqueeCryptoNew from '@/components/MarqueCrypto';
import InstallPWA from '@/PWA/InstallPwa';
// import { getColors } from '@/layout/Theme/themes';
import DropShipItems from './DropShipItems';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
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

      {/* <MarqueeCryptoNew /> */}

      <Box sx={{
      }}>
        <div className="relative bottom-16 w-screen  overflow-hidden">
          {/* Video Background */}
          <video
            className=" w-[100vw] h-[95vh] object-cover pointer-events-none"
            src="https://video-previews.elements.envatousercontent.com/h264-video-previews/34b4f82d-339a-4c07-ba47-e8a87ded3de1/2733283.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
  
          {/* Hover Effect */}
          <div className="absolute inset-0 z-20 hover:cursor-pointer"></div>
        </div>
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
