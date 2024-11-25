import { Box, Grid, Typography } from '@mui/material';
// import MarqueeCryptoNew from '@/components/MarqueCrypto';
// import InstallPWA from '@/PWA/InstallPwa';
// import { getColors } from '@/layout/Theme/themes';
import DropShipItems from './DropShipItems';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { fetchCartApi, fetchDropShipItemsApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
import { DropShipStatusInfo } from '@/Datatypes/enums';
import { selectedDropShipItems } from '@/lib/slices/DropShip/DropShipSlice';
import Scroll from '@/components/Motion/scroll';

const Tab1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dropShipItems, loading } = useSelector(selectedDropShipItems);

  const isAuthenticatedUser = useSelector(isAuthenticated);

  useEffect(() => {
    // Dispatch the fetchCartApi thunk to load cart items when the component mounts
    dispatch(fetchCartApi({ isAuthenticated: isAuthenticatedUser }));
  }, [dispatch]);
  const handleLoadItems = async () => {
  
    try {
      (dispatch as AppDispatch)(
        fetchDropShipItemsApi({
          pageSize: 10,
          page:1,
          status: DropShipStatusInfo.APPROVED,
        })
      );
    } catch (error) {
      console.error("Failed to fetch DropShip items:", error);
    }
  };
  useEffect(() => {
    // Load items when the component mounts
    handleLoadItems();
  }, []);

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

        <Grid container>
      <Grid sm={6} sx={{
        display: 'flex',
        justifyContent: 'center',
        }}>
        <DropShipItems showScroll={true} categoryType="winterwear" dropShipItems={dropShipItems} loading={loading}/>

      </Grid>
      <Grid 
  sm={6} 
  sx={{ display: { xs: 'none', sm: 'block' } }}
>
  <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
    Hot Deals
  </Typography>
  <DropShipItems grid={2} categoryType="hotdeals" dropShipItems={dropShipItems} loading={loading}/>
</Grid>

        </Grid>

        {/* <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Most Liked Shirt
        </Typography> */}
        {/* <DropShipItems categoryType="shirt" dropShipItems={dropShipItems} loading={loading}/> */}
        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Featured Items
        </Typography>
        <DropShipItems dropShipItems={dropShipItems} loading={loading}/>
      </Box>
    </>
  );
};

export default Tab1;
