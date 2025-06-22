export interface MenuItem {
  id: string;
  label: string;
  link?: string;
  icon?: string;
  children?: MenuItem[];
  permissions?: string[];
  isActive?: boolean;
  isLoading?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  permissions: string[];
}

export interface UserMenuItem {
  id: string;
  label: string;
  icon: string;
  action: string;
  permissions?: string[];
  divider?: boolean;
}
