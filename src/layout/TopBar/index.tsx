import { useContext, useState } from "react";

// @mui
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  // IconButton,
  useTheme,
  // Typography,
} from "@mui/material";

// import app
import { ColorModeContext, getColors } from "../Theme/themes";
// const NAV_WIDTH = 280;
import "./style.css"

import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { MenuRounded } from "@mui/icons-material";
import InstallPWA from "@/PWA/InstallPwa";
import { useSound } from "@/context/SoundContext";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Nav from "./Nav";
import {motion} from "framer-motion"
interface HeaderProps {
  setIsSidebarOpen: () => void;
  APP_BAR: string
  setShowOutlet: (showOutlet: boolean) => void;
  showOutlet: boolean

}

const Header: React.FC<HeaderProps> = ({ setShowOutlet }) => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme()
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate()
  const { isPlaying, togglePlay } = useSound();

  if (!colorMode) {
    // Handle the case where colorMode is undefined (e.g., context not yet initialized)
    return null; // or render a loading state or default content
  }
  const toggleSwitch = () => {
    colorMode.toggleColorMode()
    setIsOn(!isOn);
  }

  return (
    <AppBar elevation={0} color="transparent" className="absolute" >
      <Toolbar>

        <Box
          onClick={() => { navigate("/"); setShowOutlet(true) }}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={`/logo.png`} alt="logo" className="w-8 h-8 ml-4" />
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Stack
          sx={{
            mt: 1
          }}
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <InstallPWA />

          <button onClick={togglePlay}>
            {isPlaying ? <PauseCircleFilledIcon/> : <PlayCircleFilledWhiteIcon/>}
          </button>

          <div className="switch" data-ison={isOn} onClick={toggleSwitch} style={{
            background: theme.palette.grey[900],
            border: "2px solid",
            borderColor: theme.palette.grey[100],
          }}>
            <motion.div className="handle" layout transition={spring} style={{
              background: theme.palette.grey[100],
            }} />
          </div>
      

        </Stack>
      </Toolbar>

    
    
    </AppBar>
  );
}
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

// const StyledMenu = styled((props: any) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right",
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     backgroundColor: getColors().primary[900],
//     borderRadius: "8px",
//     marginTop: theme.spacing(1),
//     padding: "16px",
//     minWidth: 240,
//     border: "1px"
//   },
// }));

// const StyledMenuItem = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   cursor: "pointer",
//   "&:hover": {
//     backgroundColor: "rgba(72, 92, 165, 0.5)",
//     borderRadius: "8px",
//   },
//   "& .MuiAvatar-root": {
//     width: "24px",
//     height: "26px",
//     marginRight: theme.spacing(1),
//     color: getColors().primary[100],
//   },
//   "& .MuiTypography-root": {
//     color: getColors().primary[300],
//   },
// }));


export default Header;