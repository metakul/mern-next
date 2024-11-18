
import { useState } from "react";
import { Badge, Container, useMediaQuery } from "@mui/material";

import Header from "./TopBar";

import { Tabs } from "@/Datatypes/enums";
import MobileTabNavigation from "@/components/MobileTabNav/mobileVIew";

//redux

import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";

import "./global.css";
import MiniDrawer from "./Navigation";
import navConfig from "./navConfig";

// home page tabs
import Tab3 from "@/tabs/Tab3/temp";
import { Outlet } from "react-router-dom";


import { CssBaseline, ThemeProvider } from "@mui/material";
//theme
import { ColorModeContext, useMode } from "./Theme/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Metaship from "@/tabs/Tab2";
import CartPage from "@/tabs/Tab4";
import { useSelector } from "react-redux";
import { selectTotalQuantityAndPrice } from "@/lib/slices/DropShip/AddToCartSlice";



export default function DashboardLayout() {
  const [theme, colorMode] = useMode();
  const isNonMobile = useMediaQuery("(min-width: 766px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOutlet, setShowOutlet] = useState<boolean>(false);
  const APP_BAR = "64px";
  const { totalQuantity } = useSelector(selectTotalQuantityAndPrice);

  const handleSideBarState = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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
      content: <Metaship />,
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
        <Badge
        badgeContent={totalQuantity > 0 ? totalQuantity : 0}
        color="error"
        invisible={totalQuantity === 0}
        sx={{
          "& .MuiBadge-badge": {
            top: "8px",
            right: "-8px",
          },
        }}
      >
        <ShoppingCartIcon
          sx={{
            color: "white",
          }}
        />
      </Badge>
      ),
      content: <CartPage />,
      label: Tabs.tabTitle4,
    },
  ];

  return (
    <>
      {/* <canvas className="webgl"></canvas> */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Box sx={{ background: getColors().backgroundUrl }}> */}
          <ToastContainer />
          <Header
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
              mr: "auto",
            }}
          >
            <MobileTabNavigation
              showOutlet={showOutlet}
              tabs={tabs}
            />
          </Container>
          <Analytics />
          <SpeedInsights />
          {/* </Box> */}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>


  );
}
