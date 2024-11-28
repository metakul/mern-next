// import React from "react";
// import "./ProductCard2.style.css";
// import { Box, Typography, IconButton, Button } from "@mui/material";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import SearchIcon from "@mui/icons-material/Search";
// import PersonIcon from "@mui/icons-material/Person";
// import { getColors } from "@/layout/Theme/themes";

// const ProductCard2 = () => {
//   return (
//     <Box className="card " sx={{
//         background:getColors().grey[900]
//     }}>
//       {/* Left Section */}
//       <Box className="left">
//         <img
//           src="https://www.dropbox.com/s/e928cht0h5crcn4/shoe.png?raw=1"
//           alt="shoe"
//           className="product-image"
//         />
//         <IconButton className="arrow-icon">
//           <ArrowBackIosIcon />
//         </IconButton>
//         <IconButton className="arrow-icon">
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </Box>

//       {/* Right Section */}
//       <Box className="right">
//         <Box className="product-info">
//           {/* Product Name */}
//           <Box className="product-name">
//             <Typography variant="h4">Airmax</Typography>
//           </Box>

//           {/* Details */}
//           <Box className="details">
//             <Typography variant="h6">Winter Collection</Typography>
//             <Typography variant="h5">Men Black Sneakers</Typography>
//             <Typography variant="h4">
//               <span className="fa fa-dollar"></span>150
//             </Typography>
//             <Typography variant="h4" className="dis">
//               <span className="fa fa-dollar"></span>200
//             </Typography>
//           </Box>

//           {/* Size Options */}
//           <Box component="ul" className="size-options">
//             <Typography component="li">SIZE</Typography>
//             {[7, 8, 9, 10, 11].map((size) => (
//               <Typography component="li" key={size} className="bg">
//                 {size}
//               </Typography>
//             ))}
//           </Box>

//           {/* Color Options */}
//           <Box component="ul" className="color-options">
//             <Typography component="li">COLOR</Typography>
//             <Typography component="li" className="yellow" />
//             <Typography component="li" className="black" />
//             <Typography component="li" className="blue" />
//           </Box>

//           {/* Action Buttons */}
//           <Box className="actions">
//             <Button className="foot" startIcon={<ShoppingBagIcon />}>
//               Buy Now
//             </Button>
//             <Button className="foot" startIcon={<ShoppingCartIcon />}>
//               Add to Cart
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ProductCard2;
