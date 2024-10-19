
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Skeleton, Typography } from '@mui/material';

import BreadCrumbs from '@/components/Elements/BreadCrumbs';

import AddBlogForm from '@/components/Forms/AddBlogForm';

import { IFetchBlogData } from '@/Datatypes/interfaces/interface';
import { BlogsStatusInfo, Pages, UserCategory } from '@/Datatypes/enums';
import {  parseHTML, renderCustomStyles } from '@/scripts/handleBlogCss';

//theme
import { getColors } from '@/layout/Theme/themes';
//redux
import { AppDispatch } from '@/lib/store';
import { useSelectedBlog } from '@/lib/slices/Blogs/BlogSlice';
import { selectUserType } from '@/lib/slices/authSlice';
import { fetchSingleBlogApiSlice, updateBlogStatusSlice } from '@/lib/slices/Blogs/BlogApiSlice';
import { Helmet } from "react-helmet";
import {  useNavigate, useParams } from 'react-router-dom';


const SingleBlogDetails = () => {

  const { blogTitle, id: blogId } = useParams<{ blogTitle: string; id: string }>();

  const selectedBlog = useSelector(useSelectedBlog(blogId));
  const dispatch = useDispatch()
  const navigate=useNavigate();
  // const location = useLocation();

  const [isUpdating,setIsUpdating]=useState(false);

  // const currentDomain = location.pathname; // Get the current pathname


  // const blogLink = `${currentDomain}/blogDetails/${blogId}`;


  const userType = useSelector(selectUserType);

  const handleLoadBlogs = () => {

    const loadForUser: IFetchBlogData = {
      userType: userType,
    };
    if (blogId) {
      (dispatch as AppDispatch)(fetchSingleBlogApiSlice({
        fetchBlogData: {
          fetchBlogData: loadForUser,
          blogId
        }
      }));
    }
  }

  const navigateToHome = () => {
    navigate(Pages.HOME)
  }

  useEffect(() => {
    // Load blogs when the component mounts
    handleLoadBlogs();
  }, [userType, blogId]);


  // Perform null checks before accessing properties
  const truncatedDescription = selectedBlog?.description ?? '';
  const image = selectedBlog?.image ?? '';
  const title = selectedBlog?.title ?? '';
  const author = selectedBlog?.author ?? '';
  const cryptoSymbol = selectedBlog?.cryptoSymbol ?? '';
  const categories = selectedBlog?.categories ?? [];

  const approveBlog = () => {
    (dispatch as AppDispatch)(updateBlogStatusSlice({
      setIsUpdating,
      userType,
      blogId: blogId,
      status: BlogsStatusInfo.APPROVED
    }));
  }
  const pauseBlog = () => {
    (dispatch as AppDispatch)(updateBlogStatusSlice({
      setIsUpdating,
      userType,
      blogId: blogId,
      status: BlogsStatusInfo.PENDING
    }));
  }

  return (
    <div className='px-4 mt-4 ml-2 mr-2'>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="https://metakul.live/" />
        <meta name="description" content={truncatedDescription} />
        <meta name="keywords" content={categories.join(', ')} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={truncatedDescription} />
        <meta property="og:url" content="https://metakul.live/" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={truncatedDescription} />

      </Helmet>
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
                  }} onClick={selectedBlog?.status == BlogsStatusInfo.PENDING ? approveBlog : pauseBlog}>

                    {selectedBlog?.status == BlogsStatusInfo.PENDING ? 'Approve' : 'Pause'}
                  </Button>
                }
                <AddBlogForm formEvent={"EDIT"} blogInfo={{
                  blogId: blogId,
                  title,
                  description: truncatedDescription,
                  image: image,
                  author: author,
                  categories: categories,
                  cryptoSymbol: cryptoSymbol,
                }} userType={userType} blogType="edit" />
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
                  onClick={() => handleShare(blogLink)}
                >
                  Share
                </Button> */}

                <Typography variant='h3' sx={{
                  mb: 1,
                  mt: 6
                }}>
                  {blogTitle}
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
                  {blogTitle}
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

export default SingleBlogDetails;
