import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import NavItem from './NavItem/NavItem';
//css
import { CustomDrawer, DrawerHeader } from './style.css';
import { SwipeableDrawer } from '@mui/material';
import {
    Menu as MenuIcon,
  } from "@mui/icons-material";

export interface MiniDrawerProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: () => void;
    setShowOutlet: (showOutlet: boolean) => void;
    isNonMobile: boolean;
    navConfig: {
        text: string;
        icon: React.ReactNode | null;
        to: string;
    }[];
    APP_BAR:string
}


const MiniDrawer: React.FC<MiniDrawerProps> = ({ setIsSidebarOpen, isNonMobile, isSidebarOpen, navConfig, setShowOutlet }) => {
    const theme = useTheme();

    return (
        <>
           
                <SwipeableDrawer
                        variant="persistent"
                        open={isSidebarOpen} onClose={function (event: React.SyntheticEvent<{}, Event>): void {
                            isSidebarOpen
                            
                        } } onOpen={function (event: React.SyntheticEvent<{}, Event>): void {
                            isSidebarOpen

                        } }                >
                    <DrawerHeader>
                    <IconButton onClick={() => setIsSidebarOpen()} >
                            <MenuIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List >
                        {navConfig.map((item, index) => (
                            <NavItem isNonMobile={isNonMobile} item={item} key={index} isSidebarOpen={isSidebarOpen} setShowOutlet={setShowOutlet} />
                        ))}
                    </List>
                    <Divider />
                    <DrawerHeader>
                        <IconButton onClick={() => setIsSidebarOpen()} >
                            <ChevronLeftIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                </SwipeableDrawer>
        </>


    );
}
export default MiniDrawer;