import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { response } from 'express';
import { UserRO } from './dto/user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @CreateDateColumn()
  created: Date;
  @Column({ type: 'text', unique: true })
  username: string;
  @Column('text')
  password: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, username, token } = this;
    let response: UserRO = { id, created, username, token };
    if (!showToken) {
      response = { id, created, username };
    }
    return response;
  }
  async comparePassword(password: string) {
    return await compare(password, this.password);
  }
  private get token() {
    const { id, username } = this;
    return sign({ id, username }, process.env.SECRET, { expiresIn: '7d' });
  }
}
