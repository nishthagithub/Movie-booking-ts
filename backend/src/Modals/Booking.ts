import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { SlotData } from "./SlotData";
import { Seat } from "./Seat";
import { Cities } from "./City";
import { Movies } from "./Movies";

@Entity("Booking")
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;
  @Column()
  userId: number;
  

  @ManyToOne(() => SlotData, (slotData) => slotData.bookings)
  @JoinColumn({ name: "slotId" })
  slotData: SlotData;

  @ManyToOne(() => Movies, (movie) => movie.bookings)
  @JoinColumn({ name: "movieId" })
  movie: Movies;
  @ManyToMany(() => Seat, (seat) => seat.bookings, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: "booking_seats",
    joinColumn: { name: "bookingId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "seatId", referencedColumnName: "id" },
  })
  seats: Seat[];
  @Column("text", { array: true })
  selectedSeats: string[];
  @Column({ nullable: true })
  bookingId: string;

  @Column()
  payment_status: Boolean;

  @CreateDateColumn()
  createdAt: Date;
}