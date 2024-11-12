import { Pages } from "@/Datatypes/enums";
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
import SchoolIcon from '@mui/icons-material/School';
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
    to: Pages.MINT
  },
  // {
  //   text: "Explore",
  //   icon: <ShoppingCartOutlined />,
  //   to: "metakul",
  // },
  {
    text: "Earn With Nft",
    icon: <PieChartOutlined />,
    to: Pages.EARN,
  },
  {
    text: "Profile",
    icon: <PieChartOutlined />,
    to: Pages.PROFILE
  },
  // {
  //   text: "Shopping",
  //   icon: <ShoppingCartOutlined />,
  //   to: "/shopping",
  // },
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
    to: Pages.CREATE_NFT
  },
  // {
  //   text: "Buy Nft Own NFT",
  //   icon: <PublicOutlined />,
  //   to: Pages.MARKETPLACE
  // },
  // {
  //   text: "Sell Your NFT",
  //   icon: <PublicOutlined />,
  //   to: Pages.SELL,
  // },
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
    to: Pages.CHAT_GPT
  },
  {
    text: "InstaBot",
    icon:<SmartToyIcon/>,
    to: Pages.INSTA_BOT
  },
  // {
  //   text: "LAUNDRY",
  //   icon:<Checkroom/>,
  //   to: "/laundry",
  // },
  {
    text: "Learn",
    icon:null,
    to: "",
  },
  {
    text: "Gurukul",
    icon:<SchoolIcon/>,
    to: Pages.GURUKUL
  },
];

export default navConfig;