import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DropShipItemDetailsProps } from '@/Datatypes/interfaces/interface';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { renderCustomStyles } from '@/scripts/handleBlogCss';
import { selectedDropShipItems } from '@/lib/slices/DropShip/DropShipSlice';
import { Pages } from '@/Datatypes/enums';

const DropShipItemDescription = ({ _id, userType }: DropShipItemDetailsProps) => {

  const { dropShipItems: dropShipItemsData } = useSelector(selectedDropShipItems);
  const selectedDropShipItem = dropShipItemsData.find((dropShipItem) => dropShipItem.id === _id);
  const [timeToRead, setTimeToRead] = useState<number>()
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  const parseHTML = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Convert child nodes to an array while also preserving text nodes.
    return Array.from(tempDiv.childNodes).map((node) => {
      return {
        nodeType: node.nodeType,
        nodeName: node.nodeName,
        textContent: node.textContent,
        childNodes: Array.from(node.childNodes),
      };
    });
  };


  const calculateReadingTime = (description: string) => {
    // Assuming an average reading speed of 200 words per minute
    const wordsPerMinute = 120;
    const words = description.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  useEffect(() => {
    if (selectedDropShipItem && selectedDropShipItem.description) {
      setTimeToRead(calculateReadingTime(selectedDropShipItem.description));
    }
  }, [selectedDropShipItem])

  let truncatedDescription
  if (userType === "") {
    truncatedDescription = selectedDropShipItem?.description ? selectedDropShipItem.description.split(' ').slice(0, 80).join(' ') + ' .....' : '';
  }
  else {
    truncatedDescription = selectedDropShipItem?.description
  }


  return (
    <div className='px-8 mt-4'>
      {truncatedDescription && (
        <>
          <div>
            <div className="flex flex-wrap justify-between items-center space-x-2 text-md mb-2 text-jacarta-400">
              { }
              <span>•  {timeToRead} min read</span>
              <Button variant='contained' sx={{
              }}>

                <Typography onClick={() => selectedDropShipItem && handleNavigate(`${Pages.SINGLE_BLOG.replace(':dropShipItemTitle', selectedDropShipItem.title).replace(':id', _id)}`)}>
                  Read All
                </Typography>
              </Button>
            </div>

            {parseHTML(truncatedDescription).map((node, index) => renderCustomStyles(node, index))}


          </div>
        </>
      )}

    </div>
  );
};

export default DropShipItemDescription;
