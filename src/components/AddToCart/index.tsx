import React from 'react';
import { Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { addToCartApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
import { getColors } from '@/layout/Theme/themes';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
interface AddToCartProps {
  _id: string;
  name: string,
  image: string
}

const AddToCart: React.FC<AddToCartProps> = ({ _id, name, image }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticatedUser = useSelector(isAuthenticated);

  const handleAddToCart = () => {
    const item = { quantity: 1, id: _id, name: name, image: image };
    dispatch(addToCartApi({ item, isAuthenticated: isAuthenticatedUser }));
  };

  return (

    <Box sx={{
      color: getColors().blueAccent[100],
    }} onClick={handleAddToCart}>
      <AddShoppingCartIcon/>
    </Box>
  );
};

export default AddToCart;