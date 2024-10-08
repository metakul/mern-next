"use client"
import React, { useEffect } from 'react';
import { HomePageProps } from '@/Datatypes/interfaces/interface';

import { Container } from '@mui/material';
import Tab1 from '@/tabs/Tab1';
import { useSelector } from 'react-redux';
import { isAuthenticated, selectUserType,  } from '@/lib/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@/Datatypes/enums';




const HomePage: React.FC<HomePageProps> = () => {

  const isUserAuthenticated = useSelector(isAuthenticated);
  const userType = useSelector(selectUserType);
  const navigation = useNavigate()
 

  useEffect(() => {
    if (isUserAuthenticated && userType == "SUPER_ADMIN") {
        navigation(Pages.DASHBOARD)
    } else {
      console.error("User is not authenticated");
    }
  }, [isUserAuthenticated]);
  
  return (
     <Container className="container">
        <Tab1/>
     </Container>
  );
};

export default HomePage;