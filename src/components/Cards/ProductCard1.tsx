import React from "react";
import "./style.css";
import { Box, Typography, IconButton, Grid, Container } from "@mui/material";
import { IDropShipItem } from "@/Datatypes/interfaces/interface";
import CustomSwiper from "../Swiper";
import AddToCart from "../AddToCart";

interface ProductCard1Props {
  cartItems: IDropShipItem[];
}

const ProductCard1: React.FC<ProductCard1Props> = ({ cartItems }) => {

  return (
    <Container>
      <Grid container className="">
        {cartItems.map((item) => (
          <Grid xs={6} md={4} key={item.id} className="p-4 ">
            <Box key={item.id} className="shadow-md overflow-hidden">
              <Box className="relative border rounded-xl">
                <CustomSwiper images={[`data:image/png;base64,${item.image}`, `data:image/png;base64,${item.image}`]} />
              </Box>
              <Box className="p-6">
                <Box className="flex justify-between items-center">
                  <Box>
                    <Typography variant="h6" className="text-md ">{item.name || item.title}</Typography>
                    <Typography variant="body1" className="text-gray-600">£{item.price}</Typography>
                  </Box>
                  {item.id &&
                    <IconButton className="text-green-500">
                      <AddToCart _id={item.id} />
                    </IconButton>
                  }
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductCard1;