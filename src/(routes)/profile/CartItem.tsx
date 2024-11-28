import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton, ListItem, ListItemText, Typography } from "@mui/material";
import { fetchSingleDropShipItemApi, removeItemQuantityApi } from "@/lib/slices/DropShip/DropShipAPI"; // Update the import path
import { AppDispatch } from "@/lib/store";
import { isAuthenticated } from "@/lib/slices/authSlice";
import { Pages } from "@/Datatypes/enums";
import { useNavigate } from "react-router-dom";
import { useShowOutlet } from "@/context/showOutletContext";
import { CartItem, selectCartItems } from "@/lib/slices/DropShip/AddToCartSlice";
import DeleteIcon from '@mui/icons-material/Delete';


const CartItems= ({ }) => {


  const { setShowOutlet } = useShowOutlet();
  const dispatch = useDispatch<AppDispatch>();
  const [itemDetails, setItemDetails] = useState<Record<string, CartItem>>({});
  const [visibleCount, setVisibleCount] = useState(2); // Number of items to display initially
  const isUserAuthenticated = useSelector(isAuthenticated);
  const navigate = useNavigate();
  const parsedNotes = useSelector(selectCartItems);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemQuantityApi({ itemId: id, isAuthenticated: isUserAuthenticated })); // Dispatch action to remove an item
  };

  useEffect(() => {
    const updatedDetails = parsedNotes.reduce((acc, item) => {
      acc[item.id] = itemDetails[item.id] || item;
      return acc;
    }, {} as Record<string, CartItem>);
    setItemDetails(updatedDetails);
  }, [parsedNotes, itemDetails]);

  
  useEffect(() => {
    parsedNotes?.forEach((item) => {
      if (item.id && !itemDetails[item.id]) {
        // Fetch details for each item if not already fetched
        dispatch(fetchSingleDropShipItemApi({ itemId: item.id }))
          .unwrap()
          .then((response: any) => {
            const fetchedItem = response?.data?.[0]; // Adjust this based on your API response structure
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
  }, [parsedNotes, dispatch, itemDetails, isUserAuthenticated]);

  const handleNavigate = (href: string) => {
    setShowOutlet(true);
    navigate(href);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2); // Increase the visible count by 2
  };

  return (
    <Box className="mt-4">
      <Typography variant="h6" className="">
        Cart Items:
      </Typography>
      {parsedNotes?.slice(0, visibleCount).map((item, index) => {
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
      })}
      {visibleCount < parsedNotes?.length && (
        <Button onClick={loadMore} variant="contained" className="mt-4">
          Load More
        </Button>
      )}
    </Box>
  );
};

export default CartItems;