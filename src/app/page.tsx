import React from 'react';
import { HomePageProps } from '@/Datatypes/interfaces/interface';
import Blogs from '@/tabs/Tab1/Blogs';

import { Container } from '@mui/material';
import Tab1 from '@/tabs/Tab1';

const HomePage: React.FC<HomePageProps> = () => {

  return (
     <Container className="container">
     <Tab1/>
     </Container>
  );
};

export default HomePage;
