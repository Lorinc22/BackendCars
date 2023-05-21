import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export default class CarDto {
    @IsNotEmpty()
    @IsString()
    license_plate_number: string;
    @IsNotEmpty()
    @IsString()
    brand: string;
    @IsNotEmpty()
    @IsString()
    model: string;
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    daily_cost: number;
}