import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movies } from "./Movies";
import { Theater } from "./Theater";
import { Day } from "./day";
import { Booking } from "./Booking";
@Entity("City")
export class Cities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  city_name: string;
  @OneToMany(() => Theater, (theater) => theater.city)
  theaters: Theater[];
  @ManyToMany(() => Movies, (movie) => movie.cities)
  @OneToMany(() => Day, (day) => day.city) // ✅ Added days relation
  days: Day[];
  
  @JoinTable({
    name: "movie_city",
    joinColumn: { name: "city_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "movie_id", referencedColumnName: "movie_id" },
  })
  movies: Movies[];
}