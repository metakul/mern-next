import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BlogDetailsProps } from '@/Datatypes/interfaces/interface';
import { selectedBlogs } from '@/lib/slices/Blogs/BlogSlice';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { renderCustomStyles } from '@/scripts/handleBlogCss';

const BlogDescription = ({ _id,userType }: BlogDetailsProps) => {

  const {blogs:blogsData} = useSelector(selectedBlogs);
  const selectedBlog = blogsData.find((blog) => blog.blogId === _id);
  const [timeToRead,setTimeToRead]=useState<number>()
  const navigate = useNavigate(); 

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  const parseHTML = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return Array.from(tempDiv.childNodes);
  };

  const calculateReadingTime = (description: string) => {
    // Assuming an average reading speed of 200 words per minute
    const wordsPerMinute = 120;
    const words = description.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  useEffect(() => {
    if (selectedBlog && selectedBlog.description) {
      setTimeToRead(calculateReadingTime(selectedBlog.description));
    }
  }, [selectedBlog])
  
  let truncatedDescription
  if(userType===""){
    truncatedDescription= selectedBlog?.description ? selectedBlog.description.split(' ').slice(0, 80).join(' ') + ' .....' : '';
  }
  else{
    truncatedDescription=selectedBlog?.description
  }
  

  return (
    <div className='px-8 mt-4'>
      {truncatedDescription &&  (
        <>
          <div>
            <div className="flex flex-wrap justify-between items-center space-x-2 text-md mb-2 text-jacarta-400">
              {}
              <span>•  {timeToRead} min read</span>
              <Button variant='contained' sx={{
              }}>
                
                <Typography  onClick={() => selectedBlog && handleNavigate(`/blogdetails/${selectedBlog.title}/${_id}`)}>
                Read All
                </Typography> </Button>
            </div>

            {parseHTML(truncatedDescription).map((node, index) => renderCustomStyles(node, index))} 

            
          </div>
        </>
      )}
                 
    </div>
  );
};

export default BlogDescription;
