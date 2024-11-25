import * as React from 'react';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { CartItem } from '@/lib/slices/DropShip/AddToCartSlice';
import { Box } from '@mui/material';
import CartItems from '@/(routes)/profile/CartItem';
import { removeItemQuantityApi } from '@/lib/slices/DropShip/DropShipAPI';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { AppDispatch } from '@/lib/store';


interface InfoProps {
  totalPrice: string;
  cartItems: CartItem[];
}

export default function Info({ totalPrice, cartItems }: InfoProps) {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthenticatedUser = useSelector(isAuthenticated)

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemQuantityApi({ itemId: id, isAuthenticated: isAuthenticatedUser })); // Dispatch action to remove an item
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Amount
      </Typography>
      <Typography variant="h4" gutterBottom>
      ₹ {totalPrice}
      </Typography>
      <List disablePadding>
        {cartItems && cartItems.length > 0 && (
          <Box className="mt-4">
            {cartItems.length > 0 && (
              <Box className="mt-4">
                <CartItems parsedNotes={cartItems as CartItem[]} />
              </Box>
            )}
          </Box>
        )}
      </List>
    </React.Fragment>
  );
}
