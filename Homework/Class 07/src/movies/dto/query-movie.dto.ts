import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from "class-validator";
import { Genre } from "src/types/genre.enum";
import { Sort, Order } from "src/types/sort-and-order.enum";

export class MovieQueryDto {

    @IsEnum(Genre)
    @IsOptional()
    @ApiPropertyOptional({
        enum: Genre,
    })
    genre? : Genre

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        minimum: 1,
        maximum: 10,
    })
    minRating? : number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
    })
    maxDuration? : number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
    })
    title? : string;

    @IsEnum(Sort)
    @IsOptional()
    @ApiPropertyOptional({
        enum: Sort,
        default: Sort.ReleaseYear
    })
    sortBy? : Sort;

    @IsEnum(Order)
    @IsOptional()
    @ApiPropertyOptional({
        enum: Order,
        default: Order.DESC,
    })
    orderBy? : Order;
}