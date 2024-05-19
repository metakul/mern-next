import {
  HomeOutlined,
  // ShoppingCartOutlined,
  ReceiptLongOutlined,
  PublicOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  // AdminPanelSettingsOutlined,
  PieChartOutlined,
  // Checkroom
} from "@mui/icons-material";

export const navConfig = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    to: "/",
  },
  {
    text: "Into the Metaverse",
    icon: null,
    to: "",

  },
  {
    text: "Claim NFT",
    icon: <TodayOutlined />,
    to: "mint",
  },
  // {
  //   text: "Explore",
  //   icon: <ShoppingCartOutlined />,
  //   to: "metakul",
  // },
  {
    text: "Earn With Nft",
    icon: <PieChartOutlined />,
    to: "earn",
  },
  // {
  //   text: "Metaverse",
  //   icon: null,
  //   to: "",
  // },
  // {
  //   text: "Learn Web3",
  //   icon: <ReceiptLongOutlined />,
  //   to: "blogs",
  // },

  // {
  //   text: "For GBPIET Student",
  //   icon:null,
  //   to: "",
  // },
  // {
  //   text: "LAUNDRY",
  //   icon:<Checkroom/>,
  //   to: "/laundry",
  // },
  {
    text: "Extras",
    icon:null,
    to: "",
  },
  // {
  //   text: "Profile",
  //   icon: <AdminPanelSettingsOutlined />,
  //   to: "Profile",
  // },
  // {
  //   text: "Create Own NFT",
  //   icon: <PublicOutlined />,
  //   to: "CREATE_NFT",
  // },
  // {
  //   text: "Career",
  //   icon: <CalendarMonthOutlined />,
  //   to: "Career",
  // },
  
];

export default navConfig;