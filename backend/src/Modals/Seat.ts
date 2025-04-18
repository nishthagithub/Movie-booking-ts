import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SlotData } from "./SlotData";
import { Booking } from "./Booking";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number; // ✅ Primary Key should be a number for indexing efficiency

  @Column()
  seat_number: string; 

  @Column({ default: false })
  isBooked: boolean;

  @ManyToOne(() => SlotData, (slot) => slot.seats)
  @JoinColumn({ name: "slot_id" })
  slot: SlotData;
  @ManyToMany(()=>Booking,(booking)=>booking.seats)
  bookings: Booking[];
}
