import { useContext, useState } from "react";

// @mui
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
// import app
import { ColorModeContext, getColors } from "../Theme/themes";
import { motion } from "framer-motion";
// const NAV_WIDTH = 280;
import "./style.css"
import Link from "next/link";

import {
  Button,
  Paper,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  styled,
  Container,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import FlexBetween from "./FlexBetween";
import React from "react";
import { toast } from "react-toastify";
import copy from "clipboard-copy";
import { EditNotifications } from "@mui/icons-material";
import Image from "next/image";


interface HeaderProps {
  setIsSidebarOpen: () => void;
  APP_BAR: string
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, APP_BAR }) => {
  const colorMode = useContext(ColorModeContext);
  const address = useAddress()
  const theme = useTheme()
  const [isOn, setIsOn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isIconClicked, setIsIconClicked] = useState(false);

  if (!colorMode) {
    // Handle the case where colorMode is undefined (e.g., context not yet initialized)
    return null; // or render a loading state or default content
  }
  const toggleSwitch = () => {
    colorMode.toggleColorMode()
    setIsOn(!isOn);
  }

  const open = Boolean(anchorEl);
  const iconClickedStyle = {
    transform: isIconClicked ? 'scale(0.8)' : 'scale(1)',
    transition: 'transform 0.3s',
    ml: 2
  };

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopySmartWalletAddress = () => {
    if (address) {
      setIsIconClicked(true);
      copy(address)
        .then(() => {
          toast.success("Copied");
        })
        .catch(() => {
          toast.error("Copy failed");
        });
      // Reset the animation after a brief delay
      setTimeout(() => {
        setIsIconClicked(false);
      }, 200);
    }
  };

  return (
    <AppBar sx={{
      backgroundColor: getColors().blueAccent[900],
      height: APP_BAR
    }} >
      <Toolbar>
        <IconButton
          onClick={() => setIsSidebarOpen()}
          sx={{
            color: getColors().blueAccent[100]
          }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          href={"/"}>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/logo.svg`} alt="logo" className="w-8 h-8 ml-4" />
        </Link>

        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <ConnectWallet />
          <div className="switch" data-ison={isOn} onClick={toggleSwitch} style={{
            background: theme.palette.grey[900],
            border: "2px solid",
            borderColor: theme.palette.grey[100],
          }}>
            <motion.div className="handle" layout transition={spring} style={{
              background: theme.palette.grey[100],
            }} />
          </div>
          {address ? (
            <>
              <FlexBetween>
                <div className="flex justify-between items-center mt-2 sm:mt-2 md:mt-0 lg:mt-0 mx-2 ">
                  <Button
                     className=""
                     id="demo-customized-button"
                     aria-controls={open ? 'menu-list' : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? 'true' : undefined}
                     disableElevation
                    onClick={(event: any) => handleClick(event)}
                    sx={{
                      "&:hover": {
                        background: "none",
                      },
                    }}
                  >
                    <Avatar>
                      <Image src="/img/21.png" alt="img"
                        width={50}
                        height={50}
                        style={{
                          display: "block",
                          objectFit: "cover",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }} />
                    </Avatar>
                  </Button>

                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <div className="text-gray font-black text-sm tracking-wide pb-9">
                      Hi WEB3 User!
                    </div>
                    <Typography
                      sx={{
                        position: "relative",
                        left: "10%",
                        display: "flex",
                        alignItems: "center",
                      }}
                      variant="body2"
                      color="textSecondary"
                    >
                      {address && address.slice(0, 3) + "..." + address.slice(-4)}
                      <ContentCopyOutlinedIcon
                        onClick={handleCopySmartWalletAddress}
                        sx={iconClickedStyle}
                      />
                    </Typography>

                    <Paper>
                      <StyledMenuItem>
                        <Avatar>
                          <Person4OutlinedIcon />
                        </Avatar>
                        <Typography >
                          <Link href={"/profile"}>

                            Profile</Link></Typography>
                      </StyledMenuItem>
                    </Paper>
                    {/* <Paper>

                      <StyledMenuItem >
                        <Avatar>
                          <RedeemTwoToneIcon />
                        </Avatar>
                      </StyledMenuItem>

                    </Paper> */}

                    {/* <Paper>
                      <StyledMenuItem >
                        <Avatar>
                          <LogoutOutlinedIcon />
                        </Avatar>
                        <Typography>Log Out</Typography>
                      </StyledMenuItem>
                    </Paper> */}
                  </StyledMenu>
                </div>
              </FlexBetween>
            </>
          ) : null}
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

const StyledMenu = styled((props: any) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: getColors().primary[900],
    borderRadius: "8px",
    marginTop: theme.spacing(1),
    padding: "16px",
    minWidth: 240,
    border:"1px"
  },
}));

const StyledMenuItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(72, 92, 165, 0.5)",
    borderRadius: "8px",
  },
  "& .MuiAvatar-root": {
    width: "24px",
    height: "26px",
    marginRight: theme.spacing(1),
    color: getColors().primary[100],
  },
  "& .MuiTypography-root": {
    color: getColors().primary[300],
  },
}));

const Menus = styled(MenuItem)`
  padding-left: 0px !important;
  padding-top: 20px !important;
`;

export default Header;