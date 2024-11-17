import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { addToCartApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';

interface AddToCartProps {
  price?: number;
  _id: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ price, _id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticatedUser = useSelector(isAuthenticated);

  const handleAddToCart = () => {
    const item = {quantity:1, id:_id };
      dispatch(addToCartApi({item,isAuthenticated:isAuthenticatedUser}));
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Price: ${price}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default AddToCart;