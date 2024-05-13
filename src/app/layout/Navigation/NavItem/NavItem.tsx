import React from "react";
import { ListItemText, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import Link from 'next/link'
 
interface NavItemProps {
    item: {
        text: string;
        icon: React.ReactNode | null;
        to: string;
    };
    isSidebarOpen: boolean;
    isNonMobile:boolean;
    setShowOutlet: (showOutlet: boolean) => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isSidebarOpen,setShowOutlet }) => {
    const { text, icon, to } = item;
    const handleClick = () => {
        setShowOutlet(true); 
    };
    return (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <Link href={to}>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    minHeight: 48,
                    justifyContent: isSidebarOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
            >
                {icon && (
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: isSidebarOpen ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                )}
                <ListItemText primary={text} sx={{ opacity: isSidebarOpen ? 1 : 0 }} />
            </ListItemButton>
            </Link>

        </ListItem>
    );
};

export default NavItem;
