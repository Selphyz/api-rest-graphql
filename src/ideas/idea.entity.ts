import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('idea')
export class Idea {
  @PrimaryGeneratedColumn('uuid') id: string;
  @CreateDateColumn() created: Date;
  @Column() idea: string;
  @Column() description: string;
}
