import React from 'react';
import { Button, Typography, Box } from '@mui/material';

interface AddToCartProps {
  price?: number;
  _id: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ price, _id }) => {
  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log(`Item with ID: ${_id} added to cart`);
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