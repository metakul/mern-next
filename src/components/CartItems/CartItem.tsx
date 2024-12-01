import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton, ListItem, ListItemText, Typography } from "@mui/material";
import { fetchSingleDropShipItemApi, removeItemQuantityApi } from "@/lib/slices/DropShip/DropShipAPI"; // Update the import path
import { AppDispatch } from "@/lib/store";
import { isAuthenticated } from "@/lib/slices/authSlice";
import { Pages } from "@/Datatypes/enums";
import { useNavigate } from "react-router-dom";
import { useShowOutlet } from "@/context/showOutletContext";
import { CartItem, selectCartItems, selectTotalQuantityAndPrice } from "@/lib/slices/DropShip/AddToCartSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import Cart from "./SingleItemCart"
interface CartItemsProps {
  parsedNotes?: CartItem[];
}

const CartItems: React.FC<CartItemsProps> = ({ parsedNotes = [] }) => {

  const { setShowOutlet } = useShowOutlet();
  const dispatch = useDispatch<AppDispatch>();
  const [itemDetails, setItemDetails] = useState<Record<string, CartItem>>({});
  const [visibleCount, setVisibleCount] = useState(2); // Number of items to display initially
  const isUserAuthenticated = useSelector(isAuthenticated);
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const {  totalPrice } = useSelector(selectTotalQuantityAndPrice);

  const notesToDisplay = parsedNotes.length > 0 ? parsedNotes : cartItems;

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemQuantityApi({ itemId: id, isAuthenticated: isUserAuthenticated })); // Dispatch action to remove an item
  };

  useEffect(() => {
    notesToDisplay?.forEach((item) => {
      if (item.id && !itemDetails[item.id]) {
        dispatch(fetchSingleDropShipItemApi({ itemId: item.id }))
          .unwrap()
          .then((response: any) => {
            const fetchedItem = response?.data?.[0];
            if (fetchedItem) {
              setItemDetails((prevDetails) => ({
                ...prevDetails,
                [item.id]: {
                  ...item,
                  image: fetchedItem.image,
                },
              }));
            }
          })
          .catch((error) => {
            console.error(`Error fetching item ${item.id}:`, error);
          });
      }
    });
    const updatedDetails = notesToDisplay.reduce((details, item) => {
      const existingDetails = itemDetails[item.id] || {};
      details[item.id] = { ...existingDetails, ...item };
      return details;
    }, {} as Record<string, CartItem>);
    setItemDetails(updatedDetails);
  }, [notesToDisplay, dispatch, itemDetails]);

  const handleNavigate = (href: string) => {
    setShowOutlet(true);
    navigate(href);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2); // Increase the visible count by 2
  };

  return (
    <Box className="mt-4">
      {/* <Typography variant="h6" className="">
        Cart Items:
      </Typography> */}
      {/* {notesToDisplay?.slice(0, visibleCount).map((item, index) => {
        const details = itemDetails[item.id] || item; // Fallback to original item if details aren't loaded
        return (
          <Box key={index} className="rounded-md mt-2">
            <ListItem alignItems="flex-start">
              <img
                src={`data:image/png;base64,${details.image}`}
                alt="Item image"
                className="w-[12em] h-[10em] object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125 p-4"
                onClick={() => details && details.id && details.name && handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', details.name).replace(':id', details.id)}`)}
              />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
              }}>
                <ListItemText
                  primary={details.name}
                  secondary={`Price: ₹ ${details?.price?.toFixed(2)}`}
                />
                <ListItemText
                  secondary={`Size: ${details?.size}`}
                />
                <ListItemText
                  secondary={`Quantity: ${details.quantity}`}
                />
              </Box>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(details.id)}>
                  <DeleteIcon />
                </IconButton>
            </ListItem>
          </Box>
        );
      })} */}

      <Cart cartProducts={notesToDisplay} totalPrice={totalPrice}/>

      
      {visibleCount < notesToDisplay?.length && (
        <Button onClick={loadMore} variant="contained" className="mt-4">
          Load More
        </Button>
      )}
    </Box>
  );
};

export default CartItems;