import {
  HomeOutlined,
  ShoppingCartOutlined,
  PublicOutlined,
  TodayOutlined,
  // AdminPanelSettingsOutlined,
  PieChartOutlined,
  // Checkroom
} from "@mui/icons-material";
import SmartToyIcon from '@mui/icons-material/SmartToy';

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
    to: "/mint",
  },
  // {
  //   text: "Explore",
  //   icon: <ShoppingCartOutlined />,
  //   to: "metakul",
  // },
  {
    text: "Earn With Nft",
    icon: <PieChartOutlined />,
    to: "/earn",
  },
  {
    text: "Shopping",
    icon: <ShoppingCartOutlined />,
    to: "/shopping",
  },
  {
    text: "Metaverse",
    icon: null,
    to: "",
  },
  // {
  //   text: "Learn Web3",
  //   icon: <ReceiptLongOutlined />,
  //   to: "blogs",
  // },


  // {
  //   text: "Extras",
  //   icon:null,
  //   to: "",
  // },
  // {
  //   text: "Profile",
  //   icon: <AdminPanelSettingsOutlined />,
  //   to: "/Profile",
  // },
  {
    text: "Create Own NFT",
    icon: <PublicOutlined />,
    to: "/create_nft",
  },
  // {
  //   text: "Career",
  //   icon: <CalendarMonthOutlined />,
  //   to: "/Career",
  // },
    
  {
    text: "Metakul utilities",
    icon:null,
    to: "",
  },
  {
    text: "ChatGpt",
    icon:<SmartToyIcon/>,
    to: "/ChatGpt",
  },
  {
    text: "InstaBot",
    icon:<SmartToyIcon/>,
    to: "/InstaBot",
  },
  // {
  //   text: "LAUNDRY",
  //   icon:<Checkroom/>,
  //   to: "/laundry",
  // },
];

export default navConfig;