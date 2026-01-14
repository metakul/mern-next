import { Box } from "@mui/material";
import "./style.css";
// import { motion } from "framer-motion";
import { ShareRounded } from "@mui/icons-material";
import { handleShare } from "@/scripts/handleBlogCss";

export default function ShareButton({link}:any) {
  return (
    <Box className='flex justify-center items-center '>
      <ShareRounded onClick={()=>handleShare(link)} fontSize="large" />
    </Box>
  );
}