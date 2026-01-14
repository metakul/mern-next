import { Box } from "@mui/material";
import "./style.css";
// import { motion } from "framer-motion";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export default function LikeButton() {
  return (
    <Box className='flex justify-center items-center '>
      <FavoriteOutlinedIcon fontSize="large"/>
    </Box>
  );
}
