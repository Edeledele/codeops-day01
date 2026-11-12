import {
    IsInt,
    IsString,
    Min,
    MinLength,
} from 'class-validator';

export class CreateDishDto {
    @IsString()
    @MinLength(1)
    name!: string;

    @IsInt()
    @Min(1)
    priceSantim!: number;

    @IsInt()
    @Min(1)
    restaurantId!: number;
}
