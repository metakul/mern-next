
import { useState } from "react";
import { Badge, Box, } from "@mui/material";

import Header from "./TopBar";

import { Tabs } from "@/Datatypes/enums";
import MobileTabNavigation from "@/components/MobileTabNav/mobileVIew";

//redux

import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import "./global.css";
// import MiniDrawer from "./Navigation";
// import navConfig from "./navConfig";

// home page tabs
import Tab3 from "@/tabs/Tab3/temp";
import { Outlet } from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CssBaseline, ThemeProvider } from "@mui/material";
//theme
import { ColorModeContext, useMode } from "./Theme/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import Metaship from "@/tabs/Tab2";
import CartPage from "@/tabs/Tab4";
import { useSelector } from "react-redux";
import { selectTotalQuantityAndPrice } from "@/lib/slices/DropShip/AddToCartSlice";
import Footer from "./Footer/Footer";
import ProfilePage from "@/(routes)/profile/page";
import { useShowOutlet } from "@/context/showOutletContext";
import QuickAdd from "@/components/QuickAdd";
import Context from "@/context/Context";
import QuickView from "@/components/QuickView";

export default function DashboardLayout() {
  const [theme, colorMode] = useMode();
  // const isNonMobile = useMediaQuery("(min-width: 766px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { showOutlet, setShowOutlet } = useShowOutlet();

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
      content: <div>
      <Outlet />
      <QuickAdd />
      <QuickView />
      </div>,
      label: Tabs.tabTitle1,
    },
    {
      value: (
        <AccountCircleIcon
          sx={{
            color: "white",
          }}
        />
      ),
      content: <ProfilePage />,
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
      content: <CartPage setShowOutlet={setShowOutlet} />,
      label: Tabs.tabTitle4,
    },
  ];

  return (
    <>
      {/* <canvas className="webgl"></canvas> */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Context>

          {/* <Box sx={{ background: getColors().backgroundUrl }}> */}
          <ToastContainer />
          <Box
          component="main"
          >

          <Header
            APP_BAR={APP_BAR}
            setIsSidebarOpen={handleSideBarState}
            setShowOutlet={setShowOutlet}
            showOutlet={showOutlet}
          />
          {/* <MiniDrawer
            APP_BAR={APP_BAR}
            setShowOutlet={setShowOutlet}
            isNonMobile={isNonMobile}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={handleSideBarState}
            navConfig={navConfig}
          /> */}
          <Box
            sx={{
            }}
          >
            <MobileTabNavigation
              showOutlet={showOutlet}
              setShowOutlet={setShowOutlet}
              tabs={tabs}
            />
          <Footer/>
          </Box>
          </Box>
          </Context>

          <Analytics />
          <SpeedInsights />
          {/* </Box> */}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>


  );
}
