import { Column, Entity,  JoinColumn,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Movies } from "./Movies";
import { Theater } from "./Theater";
import { SlotData } from "./SlotData";
import { Cities } from "./City";
@Entity("Day")
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;
  @ManyToOne(() => Movies, (movie) => movie.days)
  movie: Movies;

  @OneToMany(() => Theater, (theater) => theater.day)
  @ManyToOne(() => Cities, (city) => city.days)
  city: Cities;
  @OneToMany(() => Theater, (theater) => theater.day)

  theaters: Theater[];
  @OneToMany(() => SlotData, (slot) => slot.day)
  slots: SlotData[];
}
