import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cities } from "./City";
import { SlotData } from "./SlotData";
import { Day } from "./day";
@Entity("Theater")
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  theater_name: string;
  @Column()
  theater_type: string;
  @Column()
  theater_address: string;
  @OneToMany(() => SlotData, (slotData) => slotData.theater)
  slots: SlotData[];
  @ManyToOne(() => Cities, (city) => city.theaters)
  city: Cities;
  @ManyToOne(() => Day, (day) => day.theaters)
  day: Day;
}