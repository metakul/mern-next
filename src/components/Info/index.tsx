import * as React from 'react';

import Typography from '@mui/material/Typography';
// import { CartItem } from '@/lib/slices/DropShip/AddToCartSlice';
import { Box } from '@mui/material';
import CartItems from '../CartItems/CartItem';

interface InfoProps {
  totalPrice: string;
}

export default function Info({ totalPrice }: InfoProps) {

 
  return (
    <React.Fragment>
      {/* <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Amount
      </Typography>
      <Typography variant="h4" gutterBottom>
      ₹ {totalPrice}
      </Typography> */}
        {/* {cartItems && cartItems.length > 0 && ( */}
          <Box className="mt-2">
            {/* {cartItems.length > 0 && ( */}
                <CartItems/>
            {/* )} */}
          </Box>
        {/* )} */}
    </React.Fragment>
  );
}
