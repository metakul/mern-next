import "./style.css";
// import { motion } from "framer-motion";
import { ShareRounded } from "@mui/icons-material";
import { handleShare } from "@/scripts/handleBlogCss";

export default function ShareButton({link}:any) {
  return (
    
      <ShareRounded onClick={()=>handleShare(link)}  />
  );
}