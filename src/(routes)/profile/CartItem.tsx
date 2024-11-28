import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";
import { fetchSingleDropShipItemApi } from "@/lib/slices/DropShip/DropShipAPI"; // Update the import path
import { AppDispatch } from "@/lib/store";
import { isAuthenticated } from "@/lib/slices/authSlice";
import { Pages } from "@/Datatypes/enums";
import { useNavigate } from "react-router-dom";
import { useShowOutlet } from "@/context/showOutletContext";
import { CartItem } from "@/lib/slices/DropShip/AddToCartSlice";

interface CartItemsProps {
  parsedNotes: CartItem[];
}

const CartItems: React.FC<CartItemsProps> = ({ parsedNotes }) => {
  const {setShowOutlet} =useShowOutlet()
  const dispatch = useDispatch<AppDispatch>();
  const [itemDetails, setItemDetails] = useState<Record<string, CartItem>>({});
  const [visibleCount, setVisibleCount] = useState(2); // Number of items to display initially
  const isUserAuthenticated = useSelector(isAuthenticated);
  const navigate = useNavigate()

  useEffect(() => {
    parsedNotes.forEach((item) => {
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
    setShowOutlet(true)
    navigate(href);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2); // Increase the visible count by 2
  };

  return (
    <Box className="mt-4">
      <Typography variant="h6" className="text-gray-800">
        Cart Items:
      </Typography>
      {parsedNotes.slice(0, visibleCount).map((item, index) => {
        const details = itemDetails[item.id] || item; // Fallback to original item if details aren't loaded
        return (
          <Box key={index} className="bg-gray-100 rounded-md mt-2">

            <ListItem alignItems="flex-start"
              onClick={() => details && details.id && details.name && handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', details.name).replace(':id', details.id)}`)}

            >
              <img
                src={`data:image/png;base64,${details.image}`}
                alt="Item image"
                className="w-[12em] h-[10em] object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125 p-4"
              // onClick={() => handleOpenItem(item.id || '')}
              />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
              }}>

                <ListItemText
                  primary={details.name}
                  secondary={` Price: ₹ ${details?.price?.toFixed(2)}`}
                />
                <ListItemText
                  secondary={` Size: ${details?.size}`}
                />
                <ListItemText
                  secondary={` Quantity: ${details.quantity}`}
                />
              </Box>
            </ListItem>
          </Box>
        );
      })}
      {visibleCount < parsedNotes.length && (
        <Button onClick={loadMore} variant="contained" className="mt-4">
          Load More
        </Button>
      )}
    </Box>
  );
};

export default CartItems;
