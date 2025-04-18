import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./Booking";


@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, type: "bigint" })
  phnnumber!: number;

  @Column()
  password!: string;

  @Column()
  confirmpassword!: string;
  @Column({ nullable: true })
  profilePicture?: string; // This will hold the file path or default avatar indicator

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
