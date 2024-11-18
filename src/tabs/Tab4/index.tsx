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
import { Pages } from '@/Datatypes/enums';
import { useNavigate } from 'react-router-dom';


export interface CartPageProps {
  setShowOutlet: (showOutlet: boolean) => void;
}

const CartPage: React.FC<CartPageProps> = ({ setShowOutlet }) => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    setShowOutlet(true)
    navigate(href);
  };
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
                <ListItem alignItems="flex-start"
                  onClick={() => item && item.id && item.name && handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', item.name).replace(':id', item.id)}`)}

                >
                  <img
                    src={`data:image/png;base64,${item.image}`}
                    alt="Item image"
                    className="w-[12em] h-[10em] object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125 p-2"
                  // onClick={() => handleOpenItem(item.id || '')}
                  />
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>

                    <ListItemText
                      primary={item.name}
                      secondary={` Price: ₹ ${item?.price?.toFixed(2)}`}
                    />
                    <ListItemText
                      secondary={` Quantity: ${item.quantity}`}
                    />
                  </Box>
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
              m: 0
            }}>Total Price: ₹ {totalPrice.toFixed(2)}</ListItem>
          </List>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
            {
              totalPrice &&
              <Subscribe cartItems={cartItems} price={totalPrice} setShowOutlet={setShowOutlet} />
            }
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
