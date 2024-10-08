import React from 'react';

// icons
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import BlogInfoTab from './BlogInfoComp';
import CryptoInfoPage from '../CryptoInfo';
import BlogDescription from '../WYSWYGEditor/BlogDescription';
import SocialProfiles from './../SocialProfile/index';
import { useSelector } from 'react-redux';
import { selectUserType } from '@/lib/slices/authSlice';

export interface SingleBlogInfoProps{
    // $todo change interface to have all details of blogs and send the deatils from blogpage
    cryptoSymbol?:string
    _blogId:string
    isBlogInfoOpen: boolean
  }

  
  const BlogDetails: React.FC<SingleBlogInfoProps> = ({_blogId,cryptoSymbol, isBlogInfoOpen}) => {
  const userType = useSelector(selectUserType);

  const tabs = [
    { value: <OtherHousesOutlinedIcon />, content: <BlogDescription userType={userType} _id={_blogId}/>, label: "Read More" },
    { value: <StoreOutlinedIcon />, content: <CryptoInfoPage _id={_blogId} cryptoSymbol={cryptoSymbol}/>, label: "Information" },
    { value: <CategoryOutlinedIcon />, content:<SocialProfiles cryptoSymbol={cryptoSymbol}/>, label: "Socials" },
  ];

  return (
      <BlogInfoTab openedTab={isBlogInfoOpen} tabs={tabs} />
  );
};

export default BlogDetails;
