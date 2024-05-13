import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BlogDetailsProps } from '@/Datatypes/interfaces/interface';
import { selectedBlogs } from '@/lib/slices/Blogs/BlogSlice';
import { Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const BlogDescription = ({ _id,userType }: BlogDetailsProps) => {

  
  const {blogs:blogsData} = useSelector(selectedBlogs);
  const selectedBlog = blogsData.find((blog) => blog.postId === _id);
  const [timeToRead,setTimeToRead]=useState<number>()
  const parseHTML = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return Array.from(tempDiv.childNodes);
  };
console.log(userType);

  const renderCustomStyles = (node: any, index: number) => {
    if (node.nodeType === 1) { // Node.ELEMENT_NODE
      switch (node.nodeName.toLowerCase()) {
        case 'b':
        case 'strong':
          return (
            <span key={index} className="font-bold underline" style={{ fontSize: '24px' }}>
            {Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}
          </span>
          );
        case 'a':
          return (
            <a key={index} className="font-bold underline" style={{ fontSize: '16px',color:"blue" }} href={node.getAttribute('href')} target="_blank" rel="noopener noreferrer">
              {Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}
            </a>
          );
        case 'img':
          return <Image key={index} src={node.getAttribute('src')} alt={node.getAttribute('alt')} className="max-w-full" />;
        case 'i':
        case 'em':
          return <em key={index}>{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</em>;
        case 'ul':
          return <ul key={index} className="list-disc list-inside">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</ul>;
        case 'li':
          return <li key={index} className="mb-2">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</li>;
        case 'p':
          return <p key={index} className="mb-4">{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</p>;
        // Add additional cases for other HTML elements as needed
        default:
          return <React.Fragment key={index}>{Array.from(node.childNodes).map((childNode, idx) => renderCustomStyles(childNode, idx))}</React.Fragment>;
      }
    } else if (node.nodeType === 3) { // Node.TEXT_NODE
      const textContent = node.textContent || '';
      if (textContent.trim() === '') return null; // Ignore empty text nodes
      return handleSpecialCharacters(textContent);
    }
    return null;
  };

  const handleSpecialCharacters = (text: string) => {
    // Add logic to handle special characters like italics, etc.
    // For example:
    return text.replace(/_/g, ''); // Remove underscores (assuming underscores indicate italics)
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
  console.log(truncatedDescription);
  

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
                
                <Link href={`/blogdetails/${_id}`}>
                Read All
                </Link> </Button>
            </div>

            {parseHTML(truncatedDescription).map((node, index) => renderCustomStyles(node, index))} 

            
          </div>
        </>
      )}
                 
    </div>
  );
};

export default BlogDescription;
