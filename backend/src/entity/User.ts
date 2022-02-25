import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  IsNull,
  OneToMany,
} from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import * as bcrypt from "bcryptjs";
import Link from "./links";

@Entity()
@Unique(["username"])
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(6)
  @IsEmail()
  @IsNotEmpty({ message: "Username is Required" })
  username: string;

  @Column()
  @MinLength(6)
  @IsNotEmpty({ message: "password is Required" })
  password: string;

  @Column()
  @IsNotEmpty({ message: "Role is Required" })
  role: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  resetToken: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  refreshToken: string;

  @Column()
  @CreateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  hasPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];
}

export default User;
