import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from '@mui/material';

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

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link key={-1} color="inherit" href="/">
          HOME
        </Link>
        {breadcrumbItems.map((item, index) => (
          <Link
            key={index}
            color="inherit"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
