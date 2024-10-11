"use client";
import React, { useEffect } from "react";
import { ProtectedPageProps } from "@/Datatypes/interfaces/interface";
import { useSelector } from "react-redux";
// import { useDispatch } from 'react-redux';
import {
  isAuthenticated, /*, logout , selectUserType*/
  selectUserType,
} from "@/lib/slices/authSlice";
// import { AppDispatch } from '@/lib/store.js';
// import Userpage from '../../Components/LoginPagesComp/Three.js/index.tsx';
// import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
// import { LogoutRounded } from '@mui/icons-material';
import { Container } from "@mui/material";
import BlogsPage from "@/components/LoginPagesComp/Blogs"; // Regular import for BlogsPage
import { useNavigate } from "react-router-dom";
import { UserCategory } from "@/Datatypes/enums";

const ProtectedPage: React.FC<ProtectedPageProps> = () =>
  // props
  {
    // const userType = useSelector(selectUserType);
    // const dispatch = useDispatch();

    // const handleLogout = async (event: React.FormEvent) => {
    //   event.preventDefault();
    //   try {
    //     // Dispatch the login action with the correct action type
    //     (dispatch as AppDispatch)(logout());
    //   } catch (error) {
    //     console.error('Error Calling logout Dispatch', error);
    //   }
    // };

    // const renderPageBasedOnUserType = () => {
    //   console.log(userType)
    //   switch (userType) {
    //     // TODO create /root admin
    //     case UserCategory.SUPER_ADMIN :
    //       return <BlogsPage />;
    //     default:
    //       return <BlogsPage />;
    //   }
    // };

    // const tabs = [
    //   { value: <OtherHousesOutlinedIcon />, content: renderPageBasedOnUserType(), label: "Add Blog" },
    //   {
    //     value: <LogoutRounded />, content: <div >
    //       <h2>{props.pageTitle}</h2>
    //       <h2>{props.pageDescription}</h2>
    //       <button onClick={handleLogout}>Logout</button>
    //     </div>, label: "Add Blog"
    //   },

    // ];

    const isUserAuthenticated = useSelector(isAuthenticated);
    const selectedUserType = useSelector(selectUserType);
    const navigation = useNavigate(); 

    useEffect(() => {
      if (!isUserAuthenticated && selectedUserType!==UserCategory.SUPER_ADMIN) {
        navigation("/"); 
      }
    }, [isUserAuthenticated, history]);

    return (
      <Container>
        <BlogsPage />
      </Container>
    );
  };

export default ProtectedPage;
