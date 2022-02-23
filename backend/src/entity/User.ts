import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  IsNull,
} from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["username"])
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(6)
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @Column()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
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
}

export default User;
