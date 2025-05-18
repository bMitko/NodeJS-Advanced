import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Genre } from 'src/types/genre.enum';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: 'Taken'
    })
    title? : string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: 'Former CIA agent rescuing his kidnapped daughter.'
    })
    description?: string;

    @IsNumber()
    @Type(() => Number)
    @IsPositive()
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        example: 2008
    })
    releaseYear?: number;

    @IsEnum(Genre)
    @IsOptional()
    @ApiPropertyOptional({
        enum: Genre,
        example: 'Action'
    })
    genre?: Genre;

    @IsNumber()
    @Type(() => Number)
    @IsPositive()
    @ApiPropertyOptional({
        type: Number,
        example: 90
    })
    duration?: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @ApiPropertyOptional({
        type: Number,
        example: 8
    })
    rating?: number;
}
