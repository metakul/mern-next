import React, { memo, ReactNode } from "react";
import { StyledRootScrollbar } from "./style";

interface ScrollbarProps {
  children: ReactNode;
  sx?: React.CSSProperties;
}

const Scrollbar: React.FC<ScrollbarProps> = ({ children, sx, ...other }) => {
  return (
    <StyledRootScrollbar
      sx={{
        height: "calc(100% - 20px)", // Adjust the height as needed
        overflowY: "auto",
        ...sx,
      }}
      {...other}
    >
      {children}
    </StyledRootScrollbar>
  );
}



export default memo(Scrollbar);