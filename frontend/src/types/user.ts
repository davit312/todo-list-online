export type FullUser = {
  id: number;
  email: string;
  fullname: string;
  password: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type User = Partial<FullUser>;

export type LoginResponse = {
  user: User & { sub: number };
  access_token: string;
};

export type UserWithToken = {
  user: User;
  access_token: string;
};
