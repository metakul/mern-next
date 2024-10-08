export interface TopbarProps {
  isSidebarOpen: boolean;
  isNonMobile: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  drawerWidth: string;
  onSearch: () => void;
}

export interface NavbarProps extends TopbarProps {
  navConfig: Array<NavItem>;
}

export interface NavItem {
  text: string;
  icon: JSX.Element | null;
  to: string;
}
