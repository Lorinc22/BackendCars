// car.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Cars {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:20})
  license_plate_number: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  daily_cost: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
