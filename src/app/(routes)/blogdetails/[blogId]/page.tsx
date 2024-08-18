'use client'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useParams, usePathname } from 'next/navigation'
 
import BreadCrumbs from '@/components/Elements/BreadCrumbs';

import AddBlogForm from '@/components/Forms/AddBlogForm';

import { IFetchBlogData } from '@/Datatypes/interfaces/interface';
import { BlogsStatusInfo } from '@/Datatypes/enums';
import { handleShare, parseHTML, renderCustomStyles } from '@/scripts/handleBlogCss';

//theme
import { getColors } from '@/app/layout/Theme/themes';
//redux
import { AppDispatch } from '@/lib/store';
import { selectedBlogs } from '@/lib/slices/Blogs/BlogSlice';
import { selectUserType } from '@/lib/slices/authSlice';
import { fetchSingleBlogApiSlice,updateBlogSlice } from '@/lib/slices/Blogs/BlogApiSlice';
import Link from 'next/link';
const SingleBlogDetails = () => {

  const { blogId } = useParams<{ blogId: string }>();
  
  const dispatch = useDispatch()
const pathName=usePathname()
  const currentDomain = pathName
  const postLink = `${currentDomain}/blogDetails/${blogId}`;


  const userType = useSelector(selectUserType);

  const handleLoadBlogs = () => {

    const loadForUser: IFetchBlogData = {
      userType: userType,
    };
    if (blogId) {
      (dispatch as AppDispatch)(fetchSingleBlogApiSlice({
        fetchBlogData: loadForUser,
        blogId
      }));
    }
  }


  useEffect(() => {
    // Load blogs when the component mounts
    handleLoadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, blogId]);


  const blogsData = useSelector(selectedBlogs).blogs;
  const selectedBlog = blogsData.find((blog) => blog.postId === blogId);

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

      {truncatedDescription ? (
        <>
          <BreadCrumbs currentPath={`/blogdetails/${blogId}`} />
          <div>
            <div className="flex mt-6 flex-wrap justify-between items-center space-x-2 text-md mb-2 text-jacarta-400">

              {userType === "SYSTEM_ADMIN" ? (
                <>
                  <AddBlogForm formEvent={"EDIT"} postInfo={{
                    postId: blogId,
                    title,
                    description: truncatedDescription,
                    image: image,
                    author: author,
                    categories: categories,
                    cryptoSymbol: cryptoSymbol,
                  }} userType={userType} postType="edit" />

                </>
              ) : (

                <Button variant='contained' sx={{
                  position: "fixed",
                  background: getColors().blueAccent[800],
                  color: getColors().blueAccent[100]
                }} >
                  <Link href="/">

                  Home
                  </Link>
                </Button>
              )
              }
              <Box  sx={{
                  position: "fixed",
                  right: "40px",
                }}>

              <Button
                variant='contained'
                sx={{
                  background: getColors().blueAccent[800],
                  color: getColors().blueAccent[100]
                }} 
                onClick={() => handleShare(postLink)}
              >
                Share
              </Button>

              {status == BlogsStatusInfo.PENDING && userType === "METAKUL_OWNER" &&
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
               { /* eslint-disable-next-line @next/next/no-img-element */}
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
      ):(
        <>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="rounded" sx={{
          marginLeft:"auto",
          marginRight:"auto",
          marginTop:"20px"
        }} width={"50%"} height={"400px"} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={"40px"}  />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={"40px"}  />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={"400px"}  />
        </>
      )}

    </div>
  );
};

export default SingleBlogDetails;
