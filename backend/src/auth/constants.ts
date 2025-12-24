import { Request } from 'express';
import { User } from 'generated/prisma/client';
import { config as envConfig } from 'dotenv';

envConfig();
export const jwtConstants = {
  secret: process.env.AUTH_SECRET,
};

export type RequestWithUser = Request & { loggedInUser: User };
