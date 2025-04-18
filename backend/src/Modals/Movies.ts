import { Column, Entity,  ManyToMany,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Day } from "./day";
import { Cities } from "./City";
import { SlotData } from "./SlotData";
import { Booking } from "./Booking";
@Entity("Movies")
export class Movies {
  @PrimaryGeneratedColumn()
  movie_id: number;
  @Column({ unique: true })
  movie_title: string;

  @Column()
  movie_duration: string;

  @Column()
  movie_genere: string;

  @Column()
  movie_poster: string;

  @Column()
  movie_director: string;

  @Column()
  movie_rating: string;
  @OneToMany(() => Day, (day) => day.movie)
  days: Day[];
  @ManyToMany(() => Cities, (city) => city.movies)
  cities: Cities[];
  @OneToMany(() => SlotData, (slot) => slot.movie)
  slots: SlotData[];
  @OneToMany(()=>Booking,(book)=>book.movie)
  bookings:Booking[];
}
