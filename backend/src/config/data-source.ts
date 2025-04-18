import { DataSource } from "typeorm";
import dotenv from "./dotenv";
import { User } from "../Modals/User";
import { Movies } from "../Modals/Movies";
import { Cities } from "../Modals/City";
import { Day } from "../Modals/day";
import { Theater } from "../Modals/Theater";
import { SlotData } from "../Modals/SlotData";
import { SlotType } from "../Modals/SlotType";

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