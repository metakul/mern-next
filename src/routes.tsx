import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import ProfilePage from "./(routes)/profile/page";
import { Pages } from "./Datatypes/enums";
// import ShopPage from "./(routes)/shopping/page";
import DashboardLayout from "./layout/layout";
import HomePage from "./(routes)/Home/HomePage";
import ProtectedPage from "./(routes)/admin/home/page";
import SingleBlogDetails from "./(routes)/itemDetails/[itemId]/page";
import AddBlogPage from "./(routes)/addBlog/page";
import ChatGpt from "./Projects/ChatGpt/ChatGpt";
import TermsAndConditions from "./(routes)/termAndCondition/page";
import CategoryPage from "./(routes)/CategoryPage/page";
import MiscPage from "./(routes)/common/misc";

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
          path: Pages.DASHBOARD,
          element:  <ProtectedPage pageTitle="Admin Dashboard" pageDescription="" />,
        },
        {
          path: Pages.SINGLE_DROPSHIP_ITEM,
          element:  <SingleBlogDetails/>,
        },
        {
          path: Pages.ADD_DROPSHIP_ITEM,
          element:  <AddBlogPage/>,
        },
        {
          path: Pages.CHAT_GPT,
          element:  <ChatGpt/>,
        },
        {
          path: Pages.TERMS_AND_CONDITIONS,
          element:  <TermsAndConditions/>,
        },
        {
          path: Pages.CATEGORY_PAGE,
          element:  <CategoryPage/>,
        },
        {
          path: Pages.ABOUT_US ,
          element:  <MiscPage/>,
        },
        {
          path: Pages.CONTACT_US,
          element:  <MiscPage/>,
        },
        {
          path:Pages.OUR_STORE ,
          element:  <MiscPage/>,
        },
      ],
    },
    { path: "*", element: <Navigate to={Pages.HOME} /> },
  ]);

  return routes;
};

export default Router;