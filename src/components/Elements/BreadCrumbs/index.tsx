import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href: string;
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function generateBreadcrumbItems(currentPath: string): BreadcrumbItem[] {
  const paths = currentPath.split('/').filter(Boolean);
  let accumulatedPath = '';

  return paths.map((path) => {
    accumulatedPath += `/${path}`;
    return {
      label: path.toUpperCase(), // Convert label to uppercase
      href: accumulatedPath,
    };
  });
}

interface BasicBreadcrumbsProps {
  currentPath: string;
}

export default function BreadCrumbs({ currentPath }: BasicBreadcrumbsProps) {
  const breadcrumbItems = generateBreadcrumbItems(currentPath);
  const navigate = useNavigate(); 

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* Home link */}
        <Typography
          color="inherit"
          sx={{ cursor: 'pointer' }} // Make it clickable
          onClick={() => handleNavigate('/')}
        >
          HOME
        </Typography>
        
        {/* Dynamic breadcrumb items */}
        {breadcrumbItems.map((item, index) => (
          <Typography
            key={index}
            color="inherit"
            sx={{ cursor: 'pointer' }} // Make it clickable
            onClick={() => handleNavigate(item.href)}
          >
            {item.label}
          </Typography>
        ))}
      </Breadcrumbs>
    </div>
  );
}
