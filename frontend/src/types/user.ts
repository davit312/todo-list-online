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
