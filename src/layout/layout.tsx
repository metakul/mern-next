
import { useEffect, useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";

import Header from "./TopBar";

import { Tabs } from "@/Datatypes/enums";
import MobileTabNavigation from "@/components/MobileTabNav/mobileVIew";

//redux

import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
// import ContactEmergencyOutlinedIcon from "@mui/icons-material/ContactEmergencyOutlined";

import "./global.css";
import MiniDrawer from "./Navigation";
import navConfig from "./navConfig";

// home page tabs
import MetakulCollection from "@/tabs/Tab2/MetakulCollection";
import Tab3 from "@/tabs/Tab3/temp";
// import Tab4 from "@/tabs/Tab3/temp";
import { Outlet } from "react-router-dom";
import { useSwipeable } from "react-swipeable";


import { CssBaseline, ThemeProvider } from "@mui/material";
//theme
import { ColorModeContext, useMode } from "./Theme/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "@/(routes)/profile/page";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function DashboardLayout() {
  const [theme, colorMode] = useMode();
  const isNonMobile = useMediaQuery("(min-width: 766px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOutlet, setShowOutlet] = useState<boolean>(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const APP_BAR = "64px";

  // Show "Swipe Right" hint for 3 seconds on mobile
  useEffect(() => {
    if (!isNonMobile) {
      setTimeout(() => {
        setShowSwipeHint(false);
      }, 3000);
    }
  }, [isNonMobile]);

  const handleSideBarState = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Detect left-to-right swipe (for opening the sidebar)
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      if (!isNonMobile) setIsSidebarOpen(true); // Open drawer on swipe
    },
    onSwipedLeft: () => {
      if (!isNonMobile) setIsSidebarOpen(false); // Close drawer on swipe left
    },
    trackTouch: true,
    trackMouse: false,
  });

  const tabs = [
    {
      value: (
        <OtherHousesOutlinedIcon
          sx={{
            color: "white",
          }}
        />
      ),
      content: <Container><Outlet /></Container>,
      label: Tabs.tabTitle1,
    },
    {
      value: (
        <StoreOutlinedIcon
          sx={{
            color: "white",
          }}
        />
      ),
      content: <MetakulCollection />,
      label: Tabs.tabTitle2,
    },
    {
      value: (
        <CategoryOutlinedIcon
          sx={{
            color: "white",
          }}
        />
      ),
      content: <Tab3 />,
      label: Tabs.tabTitle3,
    },
    {
      value: (
        <AccountBoxIcon
          sx={{
            color: "white",
          }}
        />
      ),
      content: <ProfilePage/>,
      label: Tabs.tabTitle4,
    },
  ];

  return (
    <Box {...swipeHandlers} sx={{ overflow: "hidden", position: "relative" }}>
      {/* <canvas className="webgl"></canvas> */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}  >
          <CssBaseline />
          {/* <Box sx={{ background: getColors().backgroundUrl }}> */}
       
            {/* Swipe Right Hint */}
            {showSwipeHint && (
              <Box
                sx={{
                  position: "absolute",
                  top: "350px",
                  left: "10px",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  opacity: 0.9,
                  animation: "swipeAnimation 1s ease-in-out infinite alternate, fadeOut 4s ease-in-out",
                }}
              >
                👉 Swipe right
              </Box>
            )}
            <ToastContainer />
            <Header
            isNonMobile={isNonMobile}
              APP_BAR={APP_BAR}
              setIsSidebarOpen={handleSideBarState}
            />
            <MiniDrawer
              APP_BAR={APP_BAR}
              setShowOutlet={setShowOutlet}
              isNonMobile={isNonMobile}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={handleSideBarState}
              navConfig={navConfig}
            />
            <Container
              component="main"
              sx={{
                flexGrow: 1,
                mt: 10,
              }}
            >
              <MobileTabNavigation
                showOutlet={showOutlet}
                tabs={tabs}
                setIsSidebarOpen={handleSideBarState}
              />
            </Container>
          {/* </Box> */}
        </ThemeProvider>
            {/* CSS Keyframes for Animation */}
            <style>
              {`
          @keyframes swipeAnimation {
            0% { transform: translateY(-50%) translateX(0px); }
            100% { transform: translateY(-50%) translateX(20px); }
          }
          
          @keyframes fadeOut {
            0% { opacity: 1; }
            90% { opacity: 0.5; }
            100% { opacity: 0; }
          }
        `}
            </style>
      </ColorModeContext.Provider>
    </Box>
  );
}
