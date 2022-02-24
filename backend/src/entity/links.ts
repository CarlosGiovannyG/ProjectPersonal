import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsNotEmpty, IsUrl } from "class-validator";
import User from "./User";

@Entity()
@Unique(["title", "url"])
class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: "title is Required" })
  title: string;

  @Column()
  @IsUrl()
  @IsNotEmpty({ message: "Url is Required" })
  url: string;

  @Column()
  @IsNotEmpty({ message: "Description is Required" })
  description: string;

  @Column()
  @CreateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.links)
  @JoinColumn({ name: "user_id" })
  user: User;
}

export default Link;
