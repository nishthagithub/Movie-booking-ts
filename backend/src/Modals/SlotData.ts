import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Theater } from "./Theater";
import { SlotType } from "./SlotType";
import { Day } from "./day";
import { Movies } from "./Movies";
import { Seat } from "./Seat";
import { Booking } from "./Booking";
@Entity("SlotData")
export class SlotData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slot_time: string;
  @ManyToOne(() => SlotType, (slotType) => slotType.slots, { eager: true })
  slotType: SlotType;

  @ManyToOne(() => Theater, (theater) => theater.slots)
  theater: Theater;
  @ManyToOne(() => Day, (day) => day.slots)
  day: Day;
  @ManyToOne(() => Movies, (movie) => movie.slots)
  movie: Movies;

  @OneToMany(() => Seat, (seat) => seat.slot)
  seats: Seat[]; 
  @OneToMany(()=>Booking,(booking)=>booking.slotData)
  bookings:Booking[];
}