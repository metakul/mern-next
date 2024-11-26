import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  // Button,
  Typography,
} from '@mui/material';
import {
  // CartItem,
  // clearCart,
  selectCartItems,
  // selectTotalQuantityAndPrice,
} from '@/lib/slices/DropShip/AddToCartSlice';
import { fetchCartApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
import { isAuthenticated } from '@/lib/slices/authSlice';
// import { useNavigate } from 'react-router-dom';
import Checkout from '@/components/CheckOut/CheckOut';

export interface CartPageProps {
  setShowOutlet: (showOutlet: boolean) => void;
}

const CartPage: React.FC<CartPageProps> = () => {
  const cartItems = useSelector(selectCartItems);
  // const navigate = useNavigate();

  // const handleNavigate = (href: string) => {
  //   setShowOutlet(true)
  //   navigate(href);
  // };
  const dispatch = useDispatch<AppDispatch>();
  // const { totalQuantity, totalPrice } = useSelector(selectTotalQuantityAndPrice);

  const isAuthenticatedUser = useSelector(isAuthenticated);

  useEffect(() => {
    // Dispatch the fetchCartApi thunk to load cart items when the component mounts
    dispatch(fetchCartApi({ isAuthenticated: isAuthenticatedUser }));
  }, [dispatch]);

  // const handleRemoveItem = (id: string) => {
  //   dispatch(removeItemQuantityApi({ itemId: id, isAuthenticated: isAuthenticatedUser })); // Dispatch action to remove an item
  // };

  // const handleClearCart = () => {
  //   dispatch(clearCart());
  // };

  return (
    <Box sx={{}} className=" mt-14 md:m-14 md:mt-24">

     
          {/* <Subscribe cartItems={cartItems} price={totalPrice} setShowOutlet={setShowOutlet} /> */}
      {cartItems.length > 0 ? (
        
        <Checkout />
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          Your cart is empty. Start adding items to your cart!
        </Typography>

      )}
    </Box>
  );
};

export default CartPage;
