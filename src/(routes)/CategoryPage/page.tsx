import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { fetchDropShipItemsByCategoryApi } from "@/lib/slices/DropShip/DropShipAPI";
import { selectDropShipItemsByCategory } from "@/lib/slices/DropShip/DropShipSlice";
import DropShipItems from "@/components/Cards/DropShipItems";
import { Typography, Box } from "@mui/material";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Fetch items based on the category name from URL
  const categoryItems = useSelector(selectDropShipItemsByCategory(categoryName || ""));

  useEffect(() => {
    if (categoryName) {
      // Fetch items for the specific category when the URL changes
      dispatch(
        fetchDropShipItemsByCategoryApi({
          pageSize: 10,
          page: 1,
          category: categoryName,
        })
      );
    }
  }, [categoryName, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Typography variant="h3" sx={{ mb: 4 }} className="text-center">
        {categoryName?.toUpperCase()} Products
      </Typography>

      {categoryItems?.length > 0 ? (
        <DropShipItems dropShipItems={categoryItems} categoryType={categoryName || "unknown"} />
      ) : (
        <Typography variant="h6">No items available for this category.</Typography>
      )}
    </Box>
  );
};

export default CategoryPage;
