import { Box, Grid, Typography } from '@mui/material';
// import MarqueeCryptoNew from '@/components/MarqueCrypto';
// import InstallPWA from '@/PWA/InstallPwa';
// import { getColors } from '@/layout/Theme/themes';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { fetchCartApi, fetchDropShipItemsApi, fetchDropShipItemsByCategoryApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
import { DropShipStatusInfo } from '@/Datatypes/enums';
import { selectDropShipItemsByCategory, selectedDropShipItems } from '@/lib/slices/DropShip/DropShipSlice';
import ProductCard1 from '@/components/Cards/ProductCard1';
import DropShipItems from '@/components/Cards/DropShipItems';
// import ProductCard2 from '@/components/Cards/ProductCard2';
import HomeCard from '@/components/Cards/HomeCard';
import Products from '@/components/Products';
import Categories from '@/components/Categories';
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
          page: 1,
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
    handleLoadCategories();
  }, []);

  const  categoryItemsHotDeals  = useSelector(selectDropShipItemsByCategory("hotdeals"));
  const  categoryItemsWinter  = useSelector(selectDropShipItemsByCategory("winterwear"));

  const handleLoadCategories = async () => {
    try {
      (dispatch as AppDispatch)(
        fetchDropShipItemsByCategoryApi({
          pageSize: 10,
          page: 1,
          category: "hotdeals"
        })
      );
      (dispatch as AppDispatch)(
        fetchDropShipItemsByCategoryApi({
          pageSize: 10,
          page: 1,
          category: "winterwear"
        })
      );
    } catch (error) {
      console.error("Failed to fetch DropShip items:", error);
    }
  };

  return (
    <>
      {/* <MarqueeCryptoNew /> */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-2">
          Top Products
        </Typography>
        <DropShipItems dropShipItems={categoryItemsWinter} categoryType="winter" />
        <Categories />
        {dropShipItems.length > 0 && <HomeCard dropShipItems={dropShipItems} />}

        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Hot Deals
        </Typography>
        <DropShipItems dropShipItems={categoryItemsHotDeals} categoryType="hotdeals" />
        
        <Scroll parsedNotes={dropShipItems} loading/>

        {/* <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Most Liked Shirt
        </Typography> */}
        {/* <DropShipItems categoryType="shirt" dropShipItems={dropShipItems} loading={loading}/> */}
        <Typography variant="h3" sx={{ mt: 14 }} className="text-center mt-8 mb-4">
          Featured Items
        </Typography>
        <ProductCard1 cartItems={dropShipItems} />
        {/* <ProductCard2/> */}
      </Box>
    </>
  );
};

export default Tab1;
