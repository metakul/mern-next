
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Skeleton, Typography } from '@mui/material';

import { DropShipStatusInfo, Pages, UserCategory } from '@/Datatypes/enums';

//theme
import { getColors } from '@/layout/Theme/themes';
//redux
import { AppDispatch } from '@/lib/store';
import { selectUserType } from '@/lib/slices/authSlice';
import { Helmet } from "react-helmet";
import {  useNavigate, useParams } from 'react-router-dom';
import AddDropShipItemForm from '@/components/Forms/AddDropShipItemForm';
import { useSelectedDropShipItem } from '@/lib/slices/DropShip/DropShipSlice';
import { fetchSingleDropShipItemApi, updateDropShipItemStatus } from '@/lib/slices/DropShip/DropShipAPI';
import { parseHTML, renderCustomStyles } from '@/scripts/handleBlogCss';


const SingleDropShipItemDetails = () => {

  const { dropShipItemTitle, id: dropShipItemId } = useParams<{ dropShipItemTitle: string; id: string }>();

  const selectedDropShipItem = useSelector(useSelectedDropShipItem(dropShipItemId));
  const dispatch = useDispatch()
  const navigate=useNavigate();
  // const location = useLocation();

  const [isUpdating,setIsUpdating]=useState(false);

  // const currentDomain = location.pathname; // Get the current pathname


  // const dropShipItemLink = `${currentDomain}/dropShipItemDetails/${dropShipItemId}`;


  const userType = useSelector(selectUserType);

  const handleLoadDropShipItems = () => {

    if (dropShipItemId) {
      (dispatch as AppDispatch)(fetchSingleDropShipItemApi({
        itemId: 
          dropShipItemId
      }));
    }
  }

  const navigateToHome = () => {
    navigate(Pages.HOME)
  }

  useEffect(() => {
    // Load dropShipItems when the component mounts
    handleLoadDropShipItems();
  }, [userType, dropShipItemId]);


  // Perform null checks before accessing properties
  const truncatedDescription = selectedDropShipItem?.description ?? '';
  const image = selectedDropShipItem?.image ?? '';
  const title = selectedDropShipItem?.title ?? '';
  const author = selectedDropShipItem?.author ?? '';
  const categories = selectedDropShipItem?.categories ?? [];

  const approveDropShipItem = () => {
    (dispatch as AppDispatch)(updateDropShipItemStatus({
      itemId: dropShipItemId,
      setIsUpdating,
      status: DropShipStatusInfo.APPROVED
    }));
  }
  const pauseDropShipItem = () => {
    (dispatch as AppDispatch)(updateDropShipItemStatus({
      setIsUpdating,
      itemId: dropShipItemId,
      status: DropShipStatusInfo.PENDING
    }));
  }

  return (
    <div className='px-4 mt-4 ml-2 mr-2'>

      {truncatedDescription ? (
        <>
          {/* <BreadCrumbs currentPath={`/`} /> */}
          <div>

            {userType === UserCategory.SUPER_ADMIN ? (
              <div className="flex mt-6 flex-wrap justify-between items-center space-x-2 text-md mb-2 text-jacarta-400">

                {userType === UserCategory.SUPER_ADMIN && 
                  <Button variant='contained' disabled={isUpdating} sx={{
                    background: getColors().blueAccent[800],
                    color: getColors().blueAccent[100]
                  }} onClick={selectedDropShipItem?.status == DropShipStatusInfo.PENDING ? approveDropShipItem : pauseDropShipItem}>

                    {selectedDropShipItem?.status == DropShipStatusInfo.PENDING ? 'Approve' : 'Pause'}
                  </Button>
                }
                <AddDropShipItemForm formEvent={"EDIT"} itemInfo={{
                  dropShipItemsId: dropShipItemId,
                  title,
                  description: truncatedDescription,
                  image: image,
                  author: author,
                  categories: categories,
                }} userType={userType} />
              </div>
            ) : (
              <Box >
                <Button variant='contained' sx={{
                  background: getColors().blueAccent[800],
                  color: getColors().blueAccent[100],
                }}
                onClick={navigateToHome}
                >
                  
                    Home
                </Button>
                {/* <Button
                  variant='contained'
                  sx={{
                    background: getColors().blueAccent[800],
                    color: getColors().blueAccent[100]
                  }}
                  onClick={() => handleShare(dropShipItemLink)}
                >
                  Share
                </Button> */}

                <Typography variant='h3' sx={{
                  mb: 1,
                  mt: 6
                }}>
                  {dropShipItemTitle}
                </Typography>
              
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 4
                }}>
                  <img
                    src={`data:image/png;base64,${image}`}
                    alt={"Post image"}
                    className=" w-[80%] lg:w-[70%] sm:h-3/4 object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125"
                  />
                </Box>
                <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                  {categories.map((category, index) => (
                    <h5 key={index} >
                      {category}
                    </h5>
                  ))}
                </span>
                
                {parseHTML(truncatedDescription).map((node, index) => renderCustomStyles(node, index))}
                <Typography variant='h5' >
                  Author: {author}
                </Typography>
              </Box>
            )}
          </div>
        </>
      ) : (
        <>
           <Typography variant='h3' sx={{
                  mb: 1,
                  mt: 6
                }}>
                  {dropShipItemTitle}
                </Typography>
          <Skeleton variant="rounded" sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px"
          }} width={"50%"} height={"400px"} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={"40px"} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={"40px"} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={"400px"} />
        </>
      )}

    </div>
  );
};

export default SingleDropShipItemDetails;
