import { Body, ConflictException, Controller, Get, NotFoundException, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Cars } from './entity/car.entity';
import { Rental } from './entity/rentals.enity';
import { faker } from '@faker-js/faker';
import CarDto from './dto/car.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @Post('/seed')
  async seed(){
    const rentalRepo = this.dataSource.getRepository(Rental);
    for (let index = 0; index < 15; index++) {
      const rental = new Rental();
      rental.car_id = index;
      rental.end_date = faker.date.soon(30);
      rental.start_date = faker.date.recent(10);
      await rentalRepo.save(rental);
    }
  }
  @Get('/api/cars')
  async GetCars(){
    const carsRepo = this.dataSource.getRepository(Cars)
    return carsRepo.find();
  }
  @Post('/api/cars')
  async CreateNewCar(@Body()CarDto:CarDto){
    const carsRepo = this.dataSource.getRepository(Cars)
    const car = new Cars();
    car.license_plate_number = CarDto.license_plate_number;
    car.brand = CarDto.brand;
    car.daily_cost = CarDto.daily_cost;
    car.model = CarDto.model;
    car.created_at = new Date();
    return await carsRepo.save(car);
  }
  @Post('/api/cars/:id/rent')
  async RentCar(@Param('id')id:number){
  const rentalRepo = this.dataSource.getRepository(Rental)
  const carsRepo = this.dataSource.getRepository(Cars)
  const rentalExisting = await rentalRepo.findOneBy({car_id:id})
  if(rentalExisting){
    throw new ConflictException
  }
  const carExisting = await carsRepo.findOneBy({id:id})
  if(!carExisting){
    throw new NotFoundException
  }
  const rental = new Rental();
  rental.car_id = id;
  const now = new Date;
  rental.start_date = now;
  now.setDate(now.getDate()+7)
  rental.end_date = now;
  return await rentalRepo.save(rental);
  }
}
