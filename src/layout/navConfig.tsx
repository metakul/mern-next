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
    text: "Profile",
    icon: <PieChartOutlined />,
    to: Pages.PROFILE
  },
  {
    text: "Metaverse",
    icon: null,
    to: "",
  },
  {
    text: "AI",
    icon:null,
    to: "",
  },
  {
    text: "ChatGpt",
    icon:<SmartToyIcon/>,
    to: Pages.CHAT_GPT
  },
];

export default navConfig;