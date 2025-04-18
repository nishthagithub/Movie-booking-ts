import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  date: string;

  @Column()
  image: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  paragraph1: string;

  @Column({ type: "text" })
  paragraph2: string;

  @Column({ type: "text" })
  paragraph3: string;

//   @Column()
//   keywords: string;
}
