export enum UserRole {
  ADMIN = 'ADMIN',
  REGION_OPERATOR = 'REGION_OPERATOR',
  CENTER_OPERATOR = 'CENTER_OPERATOR',
  USER = 'USER'
}

export interface IUserLogin {
  login: string;
  password: string;
}

export interface IUser {
  id?: number;
  fullName: string;
  login: string;
  password: string;
}
