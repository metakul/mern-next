import { Pages } from "@/Datatypes/enums";
import {
  HomeOutlined,

  PieChartOutlined,
  // Checkroom
} from "@mui/icons-material";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import GavelIcon from '@mui/icons-material/Gavel';
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
  // {
  //   text: "Metaverse",
  //   icon: null,
  //   to: "",
  // },
  // {
  //   text: "AI",
  //   icon:null,
  //   to: "",
  // },
  {
    text: "AI",
    icon:<SmartToyIcon/>,
    to: Pages.CHAT_GPT
  },
  {
    text: "Terms and Conditions",
    icon:<GavelIcon/>,
    to: Pages.TERMS_AND_CONDITIONS
  },
];

export default navConfig;