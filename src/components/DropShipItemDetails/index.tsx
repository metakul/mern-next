import React from 'react';

// icons
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BlogInfoTab from './BlogInfoComp';
import BlogDescription from '../WYSWYGEditor/BlogDescription';
import SocialProfiles from '../SocialProfile/index';
import { useSelector } from 'react-redux';
import { selectUserType } from '@/lib/slices/authSlice';
import AddToCart from '../AddToCart';

export interface SingleBlogInfoProps{
    // $todo change interface to have all details of blogs and send the deatils from blogpage
    price?:number
    _dropShipItemId:string
    isDropShipItemInfoOpen: boolean
    name:string
    image:string
  }
  const DropShipItemDetails: React.FC<SingleBlogInfoProps> = ({_dropShipItemId,image,price,name, isDropShipItemInfoOpen}) => {
  const userType = useSelector(selectUserType);

  const tabs = [
    { value: <OtherHousesOutlinedIcon />, content: <BlogDescription userType={userType} _id={_dropShipItemId}/>, label: "Read More" },
    { value: <OtherHousesOutlinedIcon />, content: <AddToCart name={name} price={price} _id={_dropShipItemId} image={image}/>, label: "Price" },
    // { value: <StoreOutlinedIcon />, content: <CryptoInfoPage _id={_blogId} cryptoSymbol={cryptoSymbol}/>, label: "Information" },
    { value: <CategoryOutlinedIcon />, content:<SocialProfiles/>, label: "Socials" },
  ];

  return (
      <BlogInfoTab openedTab={isDropShipItemInfoOpen} tabs={tabs} />
  );
};

export default DropShipItemDetails;
