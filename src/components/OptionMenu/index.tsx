import React from 'react';
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface Option {
  label: string;
  value: string;
  icon?: SvgIconComponent;
}

interface Props {
  openMenu: HTMLElement | null;
  setOpenMenu: (menu: HTMLElement | null) => void;
  options: Option[];
  selectedRowId: string | null;
  onClick: (rowId: string | null, status: string) => void;
}

const UserOptionsMenu: React.FC<Props> = ({ openMenu, setOpenMenu, options, selectedRowId, onClick }) => {
  return (
    <Menu
      open={Boolean(openMenu)}
      anchorEl={openMenu}
      onClose={() => setOpenMenu(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} onClick={() => onClick(selectedRowId, option.value)}>
          {option.icon && (
            <ListItemIcon>
              <option.icon />
            </ListItemIcon>
          )}
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserOptionsMenu;