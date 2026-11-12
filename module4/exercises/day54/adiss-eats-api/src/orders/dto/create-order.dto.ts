import {
    IsIn,
    IsInt,
    IsOptional,
    IsString,
    Matches,
    Min,
    MinLength,
} from 'class-validator';

import type { Area } from '../../modules/orders/order.types';

export class CreateOrderDto {
    @IsString()
    @MinLength(2)
    customerName!: string;

    @IsIn(['Bole', 'Kazanchis', 'Piassa', 'Gerji'])
    area!: Area;

    @IsInt()
    @Min(0)
    totalSantim!: number;

    @IsOptional()
    @IsString()
    @Matches(/^(\+251|0)9\d{8}$/, {
        message: 'teleBirrPhone must be a valid Ethiopian mobile number',
    })
    teleBirrPhone?: string;
}