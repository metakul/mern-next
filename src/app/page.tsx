"use client"
import React, { useEffect } from 'react';
import { HomePageProps } from '@/Datatypes/interfaces/interface';
import Blogs from '@/tabs/Tab1/Blogs';

import { Container } from '@mui/material';
import Tab1 from '@/tabs/Tab1';
import { useSelector } from 'react-redux';
import { isAuthenticated,  } from '@/lib/slices/authSlice';
import AdminHomePage from './(routes)/admin/home/page';
import { useRouter } from 'next/navigation';




const HomePage: React.FC<HomePageProps> = () => {

  const isUserAuthenticated = useSelector(isAuthenticated);
  const router = useRouter()
 

  useEffect(() => {
    if (isUserAuthenticated) {
      router.push('/admin/home')
    } else {
      console.log("User is not authenticated");
    }
  }, [isUserAuthenticated]);
  
  return (
     <Container className="container">
   <Tab1/>
     </Container>
  );
};

export default HomePage;
