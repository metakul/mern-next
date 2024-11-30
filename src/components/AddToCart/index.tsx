import React, { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { addToCartApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';
import { getColors } from '@/layout/Theme/themes';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import SizePicker from './SizePicker';
import { useSelectedDropShipItem } from '@/lib/slices/DropShip/DropShipSlice';
import QuickAdd from '../QuickAdd';

interface AddToCartProps {
  _id: string;
  size?: string
}

const AddToCart: React.FC<AddToCartProps> = ({ _id, }) => {

  const selectedDropShipItem = useSelector(useSelectedDropShipItem(_id));

  let title: any, name: any, image: any, sizes: { sizeName: string; totalItems: number; }[] = [];
  if (selectedDropShipItem) {
    ({ name, image, sizes, title } = selectedDropShipItem);
    // You can now use name, image, and sizes here
    console.log(name, image, sizes);
  } else {
    // Handle the case where selectedDropShipItem is null or undefined
    console.log("No item selected");
  }
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticatedUser = useSelector(isAuthenticated);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const [openQuickAdd, setOpenQuickAdd] = useState<boolean>(false);
  const [quickAddMode, setQuickAddMode] = useState<'view' | 'add'>('add'); // State to toggle mode

  const handleQuickAddOpen = (mode: 'view' | 'add') => {
    setQuickAddMode(mode);
    setOpenQuickAdd(true);
  };

  const handleSelectSize = (size: string) => {
    if (size) {
      setSelectedSize(size);
      const item = { quantity: 1, id: _id, name: name || title, image: image, size: size };
      dispatch(addToCartApi({ item, isAuthenticated: isAuthenticatedUser }));
    }
    setOpenQuickAdd(false);
  };

  return (
    <Box className="list-product-btn" >
           <button
        data-bs-toggle="modal"
        className="box-icon quickview tf-btn-loading"
        style={{ background: getColors().grey[900] }}
        onClick={() => handleQuickAddOpen('add')}
      >
        <span className="icon icon-bag" style={{ color: getColors().grey[100] }} />
        <span className="tooltip">Quick Add</span>
      </button>
      <button
        data-bs-toggle="modal"
        className="box-icon quickview tf-btn-loading"
        style={{ background: getColors().grey[900] }}
        onClick={() => handleQuickAddOpen('view')}
      >
        <span className="icon icon-view" style={{ color: getColors().grey[100] }} />
        <span className="tooltip">Quick View</span>
      </button>
      <Dialog  open={openQuickAdd} onClose={() => setOpenQuickAdd(false)}>
        {/* <SizePicker sizes={sizes} onSelectSize={handleSelectSize} onClose={() => setOpenQuickAdd(false)} /> */}
        {_id && (
          <QuickAdd
            _id={_id}
            sizes={sizes || []}
            selectedSize={selectedSize}
            onSelectSize={handleSelectSize}
            mode={quickAddMode}
          />
        )}
      </Dialog>
    </Box>
  );
};

export default AddToCart;