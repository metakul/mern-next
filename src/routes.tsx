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
      
      ],
    },
    { path: "*", element: <Navigate to={Pages.HOME} /> },
  ]);

  return routes;
};

export default Router;