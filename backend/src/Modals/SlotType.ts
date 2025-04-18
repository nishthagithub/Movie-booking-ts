import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SlotData } from "./SlotData";

@Entity("SlotType")
export class SlotType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type_name: string;

  @Column({ type: "float" })
  price: number;
  

  @OneToMany(() => SlotData, (slotData) => slotData.slotType)
  slots: SlotData[];
}