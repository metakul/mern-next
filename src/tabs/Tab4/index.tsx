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
  // clearCart,
  selectCartItems,
  selectTotalQuantityAndPrice,
} from '@/lib/slices/DropShip/AddToCartSlice';
import { fetchCartApi, removeItemQuantityApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
import { isAuthenticated } from '@/lib/slices/authSlice';
import Subscribe from '@/components/Inputs/Subscribe';

const CartPage = () => {
  const cartItems = useSelector(selectCartItems); 
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
            {cartItems.map((item) => (
              
              <React.Fragment key={item.id}>
                <ListItem alignItems="flex-start">
                 <img
                      src={`data:image/png;base64,${item.image}`}
                      alt="Item image"
                      className="w-[10em] h-[10em] object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125 p-2"
                      // onClick={() => handleOpenItem(item.id || '')}
                    />
                  <ListItemText
                    primary={item.name}
                    secondary={`Id: ${item.id} | Price: ₹ ${item?.price?.toFixed(2)} | Quantity: ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="remove"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <List>
      <ListItem>Total Items: {totalQuantity}</ListItem>
      <ListItem sx={{
        m:0
      }}>Total Price: ₹ {totalPrice.toFixed(2)}</ListItem>
    </List>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          
              <Subscribe />
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
