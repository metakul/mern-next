import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import ProfilePage from "./(routes)/profile/page";
import { Pages } from "./Datatypes/enums";
// import ShopPage from "./(routes)/shopping/page";
import DashboardLayout from "./layout/layout";
import RegisterPage from "./(routes)/register/page";
import Tab1 from "./tabs/Tab1";
import InstaBot from "./(routes)/InstaBot/page";



const Router: React.FC = () => {


  const routes = useRoutes([

    {
      path: "",
      element: <DashboardLayout/>,
      children: [
        {
          path: Pages.HOME,
          element: <RegisterPage />,
        },
        {
          path: Pages.PROFILE,
          element:  <ProfilePage />,
        },
        {
          path: Pages.INSTA_BOT,
          element:  <InstaBot />,
        },
      
      ],
    },
    { path: "*", element: <Navigate to={Pages.HOME} /> },
  ]);

  return routes;
};

export default Router;