import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseURL: `https://${process.env.LOGIN}:${process.env.PASSWORD}@${process.env.BASE_URL}`,
  login: process.env.LOGIN,
  password: process.env.PASSWORD,
  baseUrl: process.env.BASE_URL,
};
