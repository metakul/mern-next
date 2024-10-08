

import { Button,  Stack, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectedBlogs } from '@/lib/slices/Blogs/BlogSlice';
import { AppDispatch } from '@/lib/store';
import { fetchBlogApiSlice } from '@/lib/slices/Blogs/BlogApiSlice';
import { Iblog } from '@/Datatypes/interfaces/interface';
// import { IFetchBlogData } from '@/Datatypes/interfaces/interface';
import { Grid } from '@mui/material';
import ShareButton from '@/components/Elements/Buttons/ShareButton';
import BlogDetails from '@/components/BlogInfoTabs';
import {  SetStateAction, useEffect, useState } from 'react';

// import LikeButton from '../Buttons/LikeButton';
// import { selectUserType } from '@/lib/slices/authSlice';
import { BlogsStatusInfo } from '@/Datatypes/enums';
import { getColors } from '@/layout/Theme/themes';
const Blogs = () => {
  // const theme = useTheme()
  const dispatch = useDispatch()
  const {blogs:blogsData,loading} = useSelector(selectedBlogs)
  const [blogPage, setBlogPage] = useState(1);
  const [pageSize,] = useState(3);
  const [openedBlogId, setOpenedBlogId] = useState<string | null>(null);
  // const userType = useSelector(selectUserType);
  const handleLoadBlogs = () => {

    // const loadForUser: IFetchBlogData = {
    //   userType: userType,
    // };
    (dispatch as AppDispatch)(fetchBlogApiSlice({
      // fetchBlogData: loadForUser,
      pageSize,
      blogPage,
      setBlogPage,
      status: BlogsStatusInfo.APPROVED
    }));
  }

  const [currentDomain, setCurrentDomain] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentDomain(window.location.origin);
    }
  }, []);

  const blogLink = currentDomain ? `${currentDomain}` : '';


  useEffect(() => {
    // Load blogs when the component mounts
    handleLoadBlogs();
  }, []);

  const handleOpenBlogs = (blogId: SetStateAction<string | null> = null) => {
    setOpenedBlogId(blogId === openedBlogId ? null : blogId);
  };


  return (

    <div className=" sm:w-full overflow-hidden mx-auto">

  

    {
      (blogsData as Iblog[])?.map((blog: Iblog, index: number) => (
        <section key={index} className="relative py-4">

          <div className="flex flex-col rounded-2.5xl border border-jacarta-300 transition-shadow shadow-lg justify-center">

            <div className="rounded-[1.25rem]  p-4 flex-row justify-center">
              <div className='mb-3 flex flex-wrap items-center space-x-1 text-xs flex-row justify-center'>

                <img
                  src={`data:image/png;base64,${blog.image}`}
                  alt={blog.title}
                  className="h-[240px] sm:h-[320px] sm:w-80 object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-105"
                  onClick={() => handleOpenBlogs(blog.blogId)}
                />
              </div>
              <Grid container className='mt-8'>

                <Grid item xs={8} md={8} lg={8}>

                  {/* <a
                      href="#"
                      className="font-display hover:text-accent"
                    >
                      {blog.author}
                    </a> */}
                  {/* <span >in</span> */}
                  <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                    {blog.categories.map((category, index) => (
                      <h5 key={index} >
                        {category}
                      </h5>
                    ))}
                  </span>



                </Grid>
                <Grid item xs={4} md={4} lg={4} className='mx-auto flex flex-end justify-end pr-8 pb-4'>
                  <ShareButton link={`${blogLink}`} />
                  {/* <LikeButton /> */}

                </Grid>
                <h2
                  className="mb-4 font-display text-md "
                  onClick={() => handleOpenBlogs(blog.blogId)}
                >
                  {blog.title
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                  {/* <Link target='_blank' to={`/singleBlog/${blog.id}`}>{blog.title}</Link> */}
                </h2>
                <BlogDetails isBlogInfoOpen={openedBlogId === blog.blogId} cryptoSymbol={blog.cryptoSymbol} _blogId={blog.blogId || ''} />

              </Grid>
            </div>

          </div>
        </section>
      ))
    }
        {loading &&
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <Stack key={index} spacing={1} className='relative py-4 mt-4'>
            <div className="flex flex-col rounded-2.5xl border border-jacarta-300 transition-shadow shadow-lg justify-center">
              <div className="rounded-[1.25rem] p-4 flex-row justify-center">
                <Skeleton variant="rounded" width={"100%"} height={"400px"} />
              </div>
            </div>
          </Stack>
        ))}
      </>
    }
    <div className="mx-auto flex flex-row justify-center">

    <Button variant='contained' sx={{backgroundColor:getColors().blueAccent[800]}} onClick={handleLoadBlogs} >
      Load More
    </Button>
    
    </div>
  </div>
  );
};

export default Blogs;