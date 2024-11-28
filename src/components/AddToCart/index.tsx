import React, { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { addToCartApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
import { getColors } from '@/layout/Theme/themes';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SizePicker from './SizePicker';

interface AddToCartProps {
  _id: string;
  name: string;
  image: string;
  sizes: { sizeName: string; totalItems: number }[];
}

const AddToCart: React.FC<AddToCartProps> = ({ _id, name, image, sizes }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticatedUser = useSelector(isAuthenticated);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [openSizePicker, setOpenSizePicker] = useState<boolean>(false);

  const handleAddToCart = () => {
    setOpenSizePicker(true);
  };

  const handleSelectSize = (size: string) => {
    if (size) {
      setSelectedSize(size);
      const item = { quantity: 1, id: _id, name: name, image: image, size: size };
      dispatch(addToCartApi({ item, isAuthenticated: isAuthenticatedUser }));
    }
    setOpenSizePicker(false);
  };

  return (
    <Box sx={{ color: getColors().blueAccent[100] }}>
      <Button onClick={handleAddToCart} startIcon={<AddShoppingCartIcon />}>
        Add to Cart
      </Button>
      <Dialog open={openSizePicker} onClose={() => setOpenSizePicker(false)}>
        <SizePicker sizes={sizes} onSelectSize={handleSelectSize} onClose={() => setOpenSizePicker(false)} />
      </Dialog>
    </Box>
  );
};

export default AddToCart;