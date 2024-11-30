import React, { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { addToCartApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
import { getColors } from '@/layout/Theme/themes';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SizePicker from './SizePicker';
import { useSelectedDropShipItem } from '@/lib/slices/DropShip/DropShipSlice';

interface AddToCartProps {
  _id: string;
  size?:string
}

const AddToCart: React.FC<AddToCartProps> = ({ _id, }) => {

  const selectedDropShipItem = useSelector(useSelectedDropShipItem(_id));

  let title:any, name: any, image: any, sizes: { sizeName: string; totalItems: number; }[] = [];
  if (selectedDropShipItem) {
      ({ name, image, sizes,title } = selectedDropShipItem);
      // You can now use name, image, and sizes here
      console.log(name, image, sizes);
  } else {
      // Handle the case where selectedDropShipItem is null or undefined
      console.log("No item selected");
  }
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
      const item = { quantity: 1, id: _id, name: name || title, image: image, size: size };
      dispatch(addToCartApi({ item, isAuthenticated: isAuthenticatedUser }));
    }
    setOpenSizePicker(false);
  };

  return (
    <Box >
      <Button onClick={handleAddToCart}>
        <AddShoppingCartIcon  sx={{ color: getColors().grey[100] }}/>
      </Button>
      <Dialog open={openSizePicker} onClose={() => setOpenSizePicker(false)}>
        <SizePicker sizes={sizes} onSelectSize={handleSelectSize} onClose={() => setOpenSizePicker(false)} />
      </Dialog>
    </Box>
  );
};

export default AddToCart;