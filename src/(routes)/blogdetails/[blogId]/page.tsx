
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Skeleton, Typography } from '@mui/material';

import BreadCrumbs from '@/components/Elements/BreadCrumbs';

import AddBlogForm from '@/components/Forms/AddBlogForm';

import { IFetchBlogData } from '@/Datatypes/interfaces/interface';
import { BlogsStatusInfo, UserCategory } from '@/Datatypes/enums';
import { handleShare, parseHTML, renderCustomStyles } from '@/scripts/handleBlogCss';

//theme
import { getColors } from '@/layout/Theme/themes';
//redux
import { AppDispatch } from '@/lib/store';
import { selectedBlogs } from '@/lib/slices/Blogs/BlogSlice';
import { selectUserType } from '@/lib/slices/authSlice';
import { fetchSingleBlogApiSlice, updateBlogSlice } from '@/lib/slices/Blogs/BlogApiSlice';
import { Helmet } from "react-helmet";
import { useLocation, useParams } from 'react-router-dom';


const SingleBlogDetails = () => {

  const { id:blogId } = useParams<{ id: string }>();

  const dispatch = useDispatch()
  const location = useLocation();

  const currentDomain = location.pathname; // Get the current pathname


  const blogLink = `${currentDomain}/blogDetails/${blogId}`;


  const userType = useSelector(selectUserType);

  const handleLoadBlogs = () => {

    const loadForUser: IFetchBlogData = {
      userType: userType,
    };
    if (blogId) {
      (dispatch as AppDispatch)(fetchSingleBlogApiSlice({fetchBlogData:{
        fetchBlogData: loadForUser,
        blogId
      }}));
    }
  }


  useEffect(() => {
    // Load blogs when the component mounts
    handleLoadBlogs();
  }, [userType, blogId]);


  const blogsData = useSelector(selectedBlogs).blogs;
  const selectedBlog = blogsData.find((blog) => blog.blogId === blogId);

  console.log(blogsData);
  

  // Perform null checks before accessing properties
  const truncatedDescription = selectedBlog?.description ?? '';
  const image = selectedBlog?.image ?? '';
  const title = selectedBlog?.title ?? '';
  const author = selectedBlog?.author ?? '';
  const cryptoSymbol = selectedBlog?.cryptoSymbol ?? '';
  const status = selectedBlog?.status ?? '';
  const categories = selectedBlog?.categories ?? [];
  console.log(userType);

  const approveBlog = () => {
    (dispatch as AppDispatch)(updateBlogSlice({
      userType,
      blogId: blogId,
      status: BlogsStatusInfo.APPROVED
    }));
  }

  return (
    <div className='px-4 mt-4 ml-2 mr-2'>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="https://metakul.live/" />
        <meta name="description" content={truncatedDescription} />

      </Helmet>
      {truncatedDescription ? (
        <>
          <BreadCrumbs currentPath={`/blogdetails/${blogId}`} />
          <div>
            <div className="flex mt-6 flex-wrap justify-between items-center space-x-2 text-md mb-2 text-jacarta-400">

              {userType === UserCategory.SUPER_ADMIN ? (
                <>
                  <AddBlogForm formEvent={"EDIT"} blogInfo={{
                    blogId: blogId,
                    title,
                    description: truncatedDescription,
                    image: image,
                    author: author,
                    categories: categories,
                    cryptoSymbol: cryptoSymbol,
                  }} userType={userType} blogType="edit" />

                </>
              ) : (

                <Button variant='contained' sx={{
                  position: "fixed",
                  background: getColors().blueAccent[800],
                  color: getColors().blueAccent[100]
                }} >
                  <a href="/">

                    Home
                  </a>
                </Button>
              )
              }
              <Box sx={{
                position: "fixed",
                right: "40px",
              }}>

                <Button
                  variant='contained'
                  sx={{
                    background: getColors().blueAccent[800],
                    color: getColors().blueAccent[100]
                  }}
                  onClick={() => handleShare(blogLink)}
                >
                  Share
                </Button>

                {status == BlogsStatusInfo.PENDING && userType === UserCategory.SUPER_ADMIN &&
                  <Button variant='contained' sx={{
                    background: getColors().blueAccent[800],
                    color: getColors().blueAccent[100]
                  }} onClick={approveBlog}>
                    Approve
                  </Button>
                }
              </Box>

            </div>
            <Typography variant='h3' sx={{
              mb: 1,
              mt: 6
            }}>
              {title}
            </Typography>
            <Typography variant='h5' >
              Author: {author}
            </Typography>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4
            }}>
              <img
                src={`data:image/png;base64,${image}`}
                alt={"Post image"}
                className=" w-80 sm:h-3/4 object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-105"
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


          </div>
        </>
      ) : (
        <>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
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
