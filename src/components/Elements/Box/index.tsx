import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';

interface CustomBoxProps extends BoxProps {
  children: ReactNode;
}

const CustomBox: React.FC<CustomBoxProps> = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

export default CustomBox;
