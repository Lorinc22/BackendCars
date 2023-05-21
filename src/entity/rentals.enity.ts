// rentals.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  car_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}
