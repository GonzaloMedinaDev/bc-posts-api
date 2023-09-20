import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.API_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(`${process.env.PORT}`),
};

export default config;
