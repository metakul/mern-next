"use client";
import React, { useEffect } from "react";
import { ProtectedPageProps } from "@/Datatypes/interfaces/interface";
import { useSelector } from "react-redux";
// import { useDispatch } from 'react-redux';
import {
  isAuthenticated /*, logout , selectUserType*/,
} from "@/lib/slices/authSlice";
// import { AppDispatch } from '@/lib/store.js';
// import Userpage from '../../Components/LoginPagesComp/Three.js/index.tsx';
// import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
// import { LogoutRounded } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load BlogsPage to avoid server-side rendering issues
const BlogsPage = dynamic(() => import("@/components/LoginPagesComp/Blogs"), {
  ssr: false, // Disable server-side rendering for this component
});

const ProtectedPage = () =>
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
    //     case 'SYSTEM_ADMIN':
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
    const router = useRouter();
    useEffect(() => {
      if (!isUserAuthenticated) {
        router.push("/");
      } else {
        console.error("User is not authenticated");
      }
    }, [isUserAuthenticated]);

    return (
      <div>
        <BlogsPage />
      </div>
    );
  };

export default ProtectedPage;
