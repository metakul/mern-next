"use client";
import { useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";

import Header from "./layout/TopBar";

import { Tabs } from "@/Datatypes/enums";
import MobileTabNavigation from "@/components/MobileTabNav/mobileVIew";

//redux
import StoreProvider from "./StoreProvider";

import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ContactEmergencyOutlinedIcon from "@mui/icons-material/ContactEmergencyOutlined";

import "./globals.css";
import MiniDrawer from "./layout/Navigation";
import navConfig from "./layout/navConfig";

// home page tabs
import MetakulCollection from "@/tabs/Tab2/MetakulCollection";
import Tab3 from "@/tabs/Tab3/temp";
import Tab4 from "@/tabs/Tab3/temp";

//provider:
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
//theme
import { ColorModeContext, getColors, useMode } from "./layout/Theme/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Head from "next/head";

const NEXT_PUBLIC_THIRDWEB_SMART_WALLET=process.env.NEXT_PUBLIC_THIRDWEB_SMART_WALLET
const smartWalletOptions = {
  factoryAddress: NEXT_PUBLIC_THIRDWEB_SMART_WALLET,
  gasless: true,
};

const NEXT_THIRDWEB_CLIENT_ID = process.env.NEXT_THIRDWEB_CLIENT_ID;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, colorMode] = useMode();
  const isNonMobile = useMediaQuery("(min-width: 766px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOutlet, setShowOutlet] = useState<boolean>(false);
  const APP_BAR = "64px";
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
      content: <div>{children}</div>,
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
        <ContactEmergencyOutlinedIcon
          sx={{
            color: "white",
          }}
        />
      ),
      content: <Tab4 />,
      label: Tabs.tabTitle4,
    },
  ];

  return (
    <StoreProvider>
      <html lang="en">
        <Head>
          <title>Metakul</title>
          
          <meta name="robots" content="all" />
          {/* Googlebot tag */}
          <meta name="googlebot" content="noindex,nofollow" />
        </Head>
        <body>
          {/* <canvas className="webgl"></canvas> */}
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {/* <Box sx={{ background: getColors().backgroundUrl }}> */}
              <ThirdwebProvider
                activeChain="polygon"
                clientId={"ea8fb2ecfe653862c19dfa15f23c54d4"}
                supportedWallets={[
                  smartWallet(metamaskWallet(), smartWalletOptions),
                  smartWallet(
                    coinbaseWallet({ recommended: true }),
                    smartWalletOptions
                  ),
                  smartWallet(walletConnect(), smartWalletOptions),
                  smartWallet(localWallet(), smartWalletOptions),
                  smartWallet(
                    embeddedWallet({
                      auth: {
                        options: [
                          "email",
                          "google",
                          "apple",
                          "facebook",
                          "email",
                          "phone",
                        ],
                      },
                    }),
                    smartWalletOptions
                  ),
                ]}
              >
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
                    mt: 12,
                    mr: "auto",
                  }}
                >
                  <MobileTabNavigation showOutlet={showOutlet} tabs={tabs} />
                </Container>
                <Analytics />
                <SpeedInsights />
              </ThirdwebProvider>
              {/* </Box> */}
            </ThemeProvider>
          </ColorModeContext.Provider>
        </body>
      </html>
    </StoreProvider>
  );
}
