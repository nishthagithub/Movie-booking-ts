import { DataSource } from "typeorm";
import dotenv from "./dotenv";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: dotenv.DB_HOST,
  port: Number(dotenv.DB_PORT),
  username: dotenv.DB_USER,
  password: dotenv.DB_PASSWORD,
  database: dotenv.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['./src/Modals/*{.ts,.js}*'],
  subscribers: [],
  migrations: [],
});