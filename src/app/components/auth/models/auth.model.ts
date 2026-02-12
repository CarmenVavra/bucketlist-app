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
}

export interface LoginUser {
  id?: number;
  nickname?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface Address {
  id?: number;
  street?: string;
  zip?: string;
  place?: string;
}

export const AUTH_DATA = 'auth_data';