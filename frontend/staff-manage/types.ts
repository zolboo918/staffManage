export type InputPropsType = {
  value: string;
  iconName: string;
  label: string;
  onChange?: (value: string) => void;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  isAdmin?: boolean;
  birthday?: Date;
  gender?: string;
  password?: string;
};

export type UserListItemProps = {
  user: User;
};

export type UserUpdateInput = {
  name: string;
  email: string;
  phone: string;
  address?: string;
  birthday?: Date;
  gender?: string;
  isAdmin?: boolean;
  password?: string;
};
