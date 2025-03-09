import { Pages } from "@/Datatypes/enums";
import {
  HomeOutlined,
  // ShoppingCartOutlined,
  PublicOutlined,
  TodayOutlined,
  // AdminPanelSettingsOutlined,
  PieChartOutlined,
  ReceiptLongOutlined,
  CalendarMonthOutlined,
  ToysOutlined,
  // Checkroom
} from "@mui/icons-material";
// import SmartToyIcon from '@mui/icons-material/SmartToy';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ApiIcon from '@mui/icons-material/Api';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

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
  // {
  //   text: "Profile",
  //   icon: <AccountBoxIcon />,
  //   to: Pages.PROFILE
  // },
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
  //   text: "Extras",
  //   icon:null,
  //   to: "",
  // },
  {
    text: "Create Own NFT",
    icon: <PublicOutlined />,
    to: Pages.CREATE_NFT
  },
  {
    text: "Buy Nft",
    icon: <PublicOutlined />,
    to: Pages.MARKETPLACE
  },
  {
    text: "Sell Your NFT",
    icon: <PublicOutlined />,
    to: Pages.SELL,
  },
  {
    text: "Exchange",
    icon: < SwapHorizontalCircleIcon/>,
    to: Pages.DEX_PAGE,
  },
  {
    text: "Quick Swap",
    icon: < CurrencyExchangeIcon/>,
    to: Pages.SWAP_PAGE,
  },
    
  {
    text: "Metakul utilities",
    icon:null,
    to: "",
  },
  {
    text: "ChatGpt",
    icon:<PsychologyAltIcon/>,
    to: Pages.CHAT_GPT
  },
  // {
  //   text: "InstaBot",
  //   icon:<ToysOutlined/>,
  //   to: Pages.INSTA_BOT
  // },
  {
    text: "MetaKul Learning",
    icon:<ApiIcon/>,
    to: `/learning/675dddec2166d8d6e14fcb19/675dddec53986d28c87fadf3`
  },
  // {
  //   text: "LAUNDRY",
  //   icon:<Checkroom/>,
  //   to: "/laundry",
  // },
  {
    text: "API",
    icon:null,
    to: "",
  },
  {
    text: "MetaKul API",
    icon:<ApiIcon/>,
    to: Pages.API_PAGE
  },
];

export default navConfig;