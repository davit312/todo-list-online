export type FullUser = {
  id: number;
  email: string;
  fullname: string;
  password: string;
};

export type User = Partial<FullUser>;
