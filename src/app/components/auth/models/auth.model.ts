export interface RegisterUser {
  id?: number;
  nickname?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  password?: string | null;
  passwordRep?: string | null;
  address?: Address | null;
  birthdate?: string | null;
  phone?: string | null;
  roleId?: number;
}

export interface LoginUser {
  id?: number;
  nickname?: string | null;
  email?: string | null;
  password?: string | null;
  roleId?: number | null;
}

export interface Address {
  id?: number;
  street?: string;
  zip?: string;
  place?: string;
}

export enum USER_TYPE {
  ADMIN = 1,
  USER = 2,
}

export const AUTH_DATA = 'auth_data';
