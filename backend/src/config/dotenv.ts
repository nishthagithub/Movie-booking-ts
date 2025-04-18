import dotenv from "dotenv";
dotenv.config();

export default {
  DB_HOST: process.env.DB_HOST || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_DATABASE: process.env.DB_DATABASE || "",
  DB_PORT: process.env.DB_PORT || "",
  PORT: process.env.PORT || '',
};
