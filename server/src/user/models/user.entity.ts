import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @Column({ type: 'timestamp' })
  createdAt: string;

  @Column({ type: 'timestamp' })
  updatedAt: string;
}