import React, { useState } from "react";
import "./style.css";
import { Box, Button, Typography, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Grid, Dialog, DialogContent, Container } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IDropShipItem } from "@/Datatypes/interfaces/interface";
import CustomSwiper from "../Swiper";

interface CartItem {
  id: string;
  quantity: number;
  price?: number;
  name?: string;
  image?: string;
}

const SizePicker = ({ onSelect }: { onSelect: (size: string) => void }) => {
  const sizes = ["S", "M", "L", "XL"];
  return (
    <Box className="size-picker">
      <Typography>Select a size:</Typography>
      <Box>
        {sizes.map((size) => (
          <Button key={size} variant="outlined" onClick={() => onSelect(size)} className="size-button">
            {size}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

interface ProductCard1Props {
  cartItems: IDropShipItem[];
}

const ProductCard1: React.FC<ProductCard1Props> = ({ cartItems }) => {
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<{ [key: string]: string | null }>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);

  const handleAddToCart = (id: string) => {
    if (!selectedSize[id]) {
      setCurrentItemId(id);
      setOpenDialog(true);
      return;
    }
    setAddedItems([...addedItems, id]);
  };

  const handleSizeSelect = (id: string, size: string) => {
    setSelectedSize((prev) => ({ ...prev, [id]: size }));
    setAddedItems((prev) => [...prev, id]);
    setOpenDialog(false);
  };

  const resetCart = (id: string) => {
    setAddedItems((prev) => prev.filter((item) => item !== id));
    setSelectedSize((prev) => ({ ...prev, [id]: null }));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
    <Grid container className="">
      {cartItems.map((item) => (
        <Grid xs={6} md={4} key={item.id} className="p-4 ">
          <Box key={item.id} className=" shadow-md overflow-hidden">
            <Box className="relative border  rounded-xl">
              <CustomSwiper images={[`data:image/png;base64,${item.image}`, `data:image/png;base64,${item.image}`]} />
            </Box>
            <Box className="p-6">
              {!addedItems.includes(item.id ?? '') ? (
                <Box className="flex justify-between items-center">
                  <Box>
                    <Typography variant="h6" className="text-md ">{item.name || item.title}</Typography>
                    <Typography variant="body1" className="text-gray-600">£{item.price}</Typography>
                  </Box>
                  <IconButton className="text-green-500" onClick={() => item.id && handleAddToCart(item.id)}>
                    <AddShoppingCartIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center">
                    <DoneIcon className="text-green-500" />
                    <Box className="ml-2">
                      <Typography variant="h5" className="text-lg font-semibold">{item.name}</Typography>
                      <Typography variant="body1" className="text-gray-600">Added to your cart</Typography>
                    </Box>
                  </Box>
                  <IconButton className="text-red-500" onClick={() => item.id && resetCart(item.id)}>
                    <ClearIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      ))}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {currentItemId && <SizePicker onSelect={(size) => handleSizeSelect(currentItemId, size)} />}
        </DialogContent>
      </Dialog>
    </Grid>
    </Container>
  );
};

export default ProductCard1;