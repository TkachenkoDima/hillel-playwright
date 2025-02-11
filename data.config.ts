import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseURL: `${process.env.BASE_URL}`,
  login: process.env.LOGIN!,
  password: process.env.PASSWORD!,
  baseUrl: process.env.BASE_URL!,

  userEmail: process.env.USER_EMAIL!,
  userPassword: process.env.USER_PASSWORD!,
};
