import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { fetchSingleDropShipItemApi } from "@/lib/slices/DropShip/DropShipAPI"; // Update the import path
import { AppDispatch } from "@/lib/store";
import { isAuthenticated } from "@/lib/slices/authSlice";

interface CartItem {
  id: string;
  quantity: number;
  price?: number;
  name?: string;
  image?: string;
}

interface CartItemsProps {
  parsedNotes: CartItem[];
}

const CartItems: React.FC<CartItemsProps> = ({ parsedNotes }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [itemDetails, setItemDetails] = useState<Record<string, CartItem>>({});
  const [visibleCount, setVisibleCount] = useState(2); // Number of items to display initially
const isUserAuthenticated = useSelector(isAuthenticated);
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
  }, [parsedNotes, dispatch, itemDetails,isUserAuthenticated]);

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
          <Box key={index} className="bg-gray-100 rounded-md p-2 mt-2">
            <Typography variant="body2">Id: {details.id || "N/A"}</Typography>
            <Typography variant="body2">Name: {details.name || "Loading..."}</Typography>
            <Typography variant="body2">
              Quantity: {details.quantity || "N/A"}
            </Typography>
            <Typography variant="body2">
              Price: ₹{details.price ? details.price.toFixed(2) : "Loading..."}
            </Typography>
            {details.image && (
              <Box className="mt-2">
                <img
                  src={`data:image/png;base64,${details.image}`}
                  alt={`Slide ${index + 1}`}
                  className="border border-xl h-40 object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125"
                />
              </Box>
            )}
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
