import React from 'react';

const isBase64 = (str: string) => {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};

const BlogImage = ({ blog, handleOpenBlogs }:any) => {
  const imageSrc = isBase64(blog.image) ? `data:image/png;base64,${blog.image}` : blog.image;

  return (
    <img
      src={imageSrc}
      alt={"Post image"}
      className="w-[80%] lg:w-[70%] sm:h-[20em] object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125"
      onClick={() => handleOpenBlogs(blog.blogId)}
    />
  );
};

export default BlogImage;