import { Optional } from 'sequelize';

export type UserStatus = 'active' | 'inactive' | 'banned' | 'pending';
export type UserRole = 'admin' | 'user' | 'guest';

export interface IUserProps {
  id: number;
  salt: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
  status: UserStatus;
  confirmed_at?: Date;
  was_confirmed: boolean;
  email_unconfirmed: string
  confirmation_token?: string;
}

export interface IUserCreationProps extends Optional<IUserProps, 'id'> {}