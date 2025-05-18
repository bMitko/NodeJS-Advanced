import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, Max } from "class-validator";
import { Genre } from "src/types/genre.enum";

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Titanic'
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'A tragic romance aboard the doomed RMS Titanic.'
    })
    description: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        example: 1997
    })
    releaseYear: number;

    @IsEnum(Genre)
    @ApiProperty({
        enum: Genre,
        example: Genre.Romance
    })
    genre: Genre;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        example: 194
    })
    duration: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(10)
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        example: 8
    })
    rating: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: 'https://cdn.posteritati.com/posters/000/000/049/967/titanic-md-web.jpg',
        default: null
    })
    posterUrl: string | null;
}
