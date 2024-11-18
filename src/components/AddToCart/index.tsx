import React from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { addToCartApi } from '@/lib/slices/DropShip/DropShipAPI';
import { AppDispatch } from '@/lib/store';

interface AddToCartProps {
  price?: number;
  _id: string;
  name:string,
  image:string
}

const AddToCart: React.FC<AddToCartProps> = ({ price, _id, name,image }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticatedUser = useSelector(isAuthenticated);

  const handleAddToCart = () => {
    const item = {quantity:1, id:_id,name:name,image:image };
      dispatch(addToCartApi({item,isAuthenticated:isAuthenticatedUser}));
  };

  return (
   
      <Button variant="contained" color="primary" className='w-full sm:w-auto  ring-1 focus:outline-none focus:ring-gray-300  rounded-lg inline-flex items-center justify-center   ' onClick={handleAddToCart}>
       <div className=" font-sans text-xs  p-1.5"> Add to Cart
       </div>
      </Button>
  );
};

export default AddToCart;