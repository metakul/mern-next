'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import "./index.css"
import { Box } from '@mui/material';
import { getColors } from '@/app/layout/Theme/themes';


interface MobileTabNavigationProps {
  tabs: { value: ReactNode; content: ReactNode; label: string }[];
  position?: string;
  showOutlet?: boolean;
}

const MobileTabNavigation: React.FC<MobileTabNavigationProps> = ({ tabs, position, showOutlet }) => {

  const [value, setValue] = useState(0)
  
  useEffect(() => {
    if (showOutlet) {
      setValue(0);
    }
  }, [showOutlet, tabs]);

  useEffect(() => {

    const menu = document.querySelector(".menu") as HTMLElement | null;

    if (!menu) {
      // Menu element not found, handle the case gracefully
      return;
    }
    const menuItems = menu.querySelectorAll(".menu__item");
    const menuBorder = menu.querySelector(".menu__border") as HTMLElement;
    let activeItem = menu.querySelector(".active") as HTMLElement;

    function clickItem(item: HTMLElement | null, index: number) {
      if (!menu) {
        // Menu element not found, handle the case gracefully
        return;
      }
      menu.style.removeProperty("--timeOut");

      if (activeItem == item) return;

      if (activeItem) {
        activeItem.classList.remove("active");
      }
      if (!item) {
        // Menu element not found, handle the case gracefully
        return;
      }
      item.classList.add("active");
      // body.style.backgroundColor = bgColorsBody[index];
      setValue(index)
      activeItem = item;
      offsetMenuBorder(activeItem, menuBorder);
    }

    function offsetMenuBorder(element: HTMLElement | null, menuBorder: HTMLElement | null) {
      if (!element || !menu || !menuBorder) {
        // Menu element not found, handle the case gracefully
        return;
      }
      const offsetActiveItem = element.getBoundingClientRect();
      const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth - offsetActiveItem.width) / 2) + "px";
      menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
    }

    offsetMenuBorder(activeItem, menuBorder);

    menuItems.forEach((item, index) => {
      item.addEventListener("click", () => clickItem(item as HTMLElement, index));
    });

    // window.addEventListener("resize", () => {
    //   offsetMenuBorder(activeItem, menuBorder);
    //   menu.style.setProperty("--timeOut", "none");
    // });

    // Clean-up function if needed
    return () => {
      // Remove event listeners or perform any necessary clean-up
      menuItems.forEach((item:any) => {
        item.removeEventListener("click", clickItem);
      });
      // window.removeEventListener("resize", offsetMenuBorder as any);
    };
  }, [showOutlet, tabs]); // empty dependency array means this effect will only run once after initial render

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box>
      <menu  className={` ${position === "top" ? " mt-2" : "fixed bottom-0 left-0"} w-full flex flex-row  z-20 menu`}>
        {tabs.map(({ value }, index) => (
          <div
            className={`menu__item ${index === 0 ? "active" :"" }`} 
            key={index}
            {...a11yProps(index)}
          >
            {value}
          </div>
        ))}
        <div className="menu__border"></div>

      </menu>
      {tabs.map(({ content }, index) => (
        
        <CustomTabPanel isNonMobile={true} key={index} value={value} position={position} index={index}>
          {content}
        </CustomTabPanel>
      ))}

      <div className="svg-container">
        <svg viewBox="0 0 202.9 45.5" >
          <clipPath id="menu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
            <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
          c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
          c9.2,3.6,17.6,4.2,23.3,4H6.7z"/>
          </clipPath>
        </svg>
      </div>
    </Box>
  )
}


interface CustomTabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
  isNonMobile: boolean;
  position?: string;
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ isNonMobile, children, value, index, position }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    style={{
      paddingBottom: "50px",
      marginBottom: "50px",
    }}
  >
    {value === index && <Box className={` ${position === "top" ? "pt-2" : ""}`} sx={{ }}>{children}</Box>}
  </div>
);

export default MobileTabNavigation;
