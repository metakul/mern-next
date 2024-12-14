import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import ProfilePage from "./(routes)/profile/page";
import { Pages } from "./Datatypes/enums";
// import ShopPage from "./(routes)/shopping/page";
import DashboardLayout from "./layout/layout";
import InstaBot from "./(routes)/InstaBot/page";
import MintPage from "./(routes)/mint/page";
import HomePage from "./(routes)/Home/HomePage";
import ProtectedPage from "./(routes)/admin/home/page";
import SingleBlogDetails from "./(routes)/blogdetails/[blogId]/page";
import EarnPage from "./(routes)/earn/page";
import CreateNft from "./(routes)/create_nft/page";
import ShopPage from "./(routes)/shopping/page";
import AddBlogPage from "./(routes)/addBlog/page";
import ChatGpt from "./Projects/ChatGpt/ChatGpt";
import MarketPlace from "./(routes)/Marketplace/page";
import SaleInfo from "./components/SaleInfo";
import Sell from "./(routes)/Marketplace/SellPage";
import Gurukul from "./(routes)/Learning/Gurukul";
import DEXPage from "./(routes)/dex/page";
import Swap from "./(routes)/swap/page";
import ApiPage from "./(routes)/apiPage/page";
import AddCoursePage from "./(routes)/AddCourse/page";

const Router: React.FC = () => {


  const routes = useRoutes([

    {
      path: "",
      element: <DashboardLayout/>,
      children: [
        {
          path: Pages.HOME,
          element: <HomePage pageTitle="HomePage" pageDescription=""/>,
        },
        {
          path: Pages.PROFILE,
          element:  <ProfilePage />,
        },
        {
          path: Pages.INSTA_BOT,
          element:  <InstaBot />,
        },
        {
          path: Pages.MINT,
          element:  <MintPage />,
        },
        {
          path: Pages.DASHBOARD,
          element:  <ProtectedPage pageTitle="Admin Dashboard" pageDescription="" />,
        },
        {
          path: Pages.SINGLE_BLOG,
          element:  <SingleBlogDetails/>,
        },
        {
          path: Pages.EARN,
          element:  <EarnPage/>,
        },
        {
          path: Pages.CREATE_NFT,
          element:  <CreateNft/>,
        },
        {
          path: Pages.SHOPPING,
          element:  <ShopPage/>,
        },
        {
          path: Pages.ADD_BLOG,
          element:  <AddBlogPage/>,
        },
        {
          path: Pages.CHAT_GPT,
          element:  <ChatGpt/>,
        },
        {
          path: Pages.DEX_PAGE,
          element:  <DEXPage/>,
        },
        {
          path: Pages.SWAP_PAGE,
          element:  <Swap/>,
        },
        {
          path: Pages.API_PAGE,
          element:  <ApiPage/>,
        },
          { 
          path: Pages.GURUKUL,
          element:  <Gurukul/>,
        },
          { 
          path: Pages.ADD_COURSE,
          element:  <AddCoursePage/>,
        },
        // {
        //   path: Pages.MARKETPLACE,
        //   element:  <MarketPlace/>,
        // },
        // {
        //   path: Pages.SELL,
        //   element:  <Sell/>,
        // },
      
      ],
    },
    { path: "*", element: <Navigate to={Pages.HOME} /> },
  ]);

  return routes;
};

export default Router;