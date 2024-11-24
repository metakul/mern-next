import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  // Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  CartItem,
  // clearCart,
  selectCartItems,
  selectTotalQuantityAndPrice,
} from '@/lib/slices/DropShip/AddToCartSlice';
import { fetchCartApi, removeItemQuantityApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
import { isAuthenticated } from '@/lib/slices/authSlice';
import Subscribe from '@/components/Inputs/Subscribe';
import { Pages } from '@/Datatypes/enums';
import { useNavigate } from 'react-router-dom';
import CartItems from '@/(routes)/profile/CartItem';


export interface CartPageProps {
  setShowOutlet: (showOutlet: boolean) => void;
}

const CartPage: React.FC<CartPageProps> = ({ setShowOutlet }) => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    setShowOutlet(true)
    navigate(href);
  };
  const dispatch = useDispatch<AppDispatch>();
  const { totalQuantity, totalPrice } = useSelector(selectTotalQuantityAndPrice);

  const isAuthenticatedUser = useSelector(isAuthenticated);

  useEffect(() => {
    // Dispatch the fetchCartApi thunk to load cart items when the component mounts
    dispatch(fetchCartApi({ isAuthenticated: isAuthenticatedUser }));
  }, [dispatch]);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemQuantityApi({ itemId: id, isAuthenticated: isAuthenticatedUser })); // Dispatch action to remove an item
  };

  // const handleClearCart = () => {
  //   dispatch(clearCart());
  // };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        <ShoppingCartIcon fontSize="large" sx={{ mr: 1 }} />
        Your Cart
      </Typography>
      {cartItems.length > 0 ? (
        <>
          <List>

                    {cartItems.length > 0 && (
                          <Box className="mt-4">
                            {cartItems.length > 0 && (
                              <Box className="mt-4">
                                <CartItems setShowOutlet={setShowOutlet} parsedNotes={cartItems as CartItem[]} />
                              </Box>
                              
                            )}
                          </Box>
                        )}
                <Divider />
          </List>
          <List>
            <ListItem>Total Items: {totalQuantity}</ListItem>
            <ListItem sx={{
              m: 0
            }}>Total Price: ₹ {totalPrice.toFixed(2)}</ListItem>
          </List>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
            {
              totalPrice &&
              <Subscribe cartItems={cartItems} price={totalPrice} setShowOutlet={setShowOutlet} />
            }
          </Stack>
        </>
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          Your cart is empty. Start adding items to your cart!
        </Typography>
      )}
    </Box>
  );
};

export default CartPage;
