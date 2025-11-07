import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'helloworld' })
export class Helloworld {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date = new Date();

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
