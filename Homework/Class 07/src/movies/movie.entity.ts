import { ApiProperty } from "@nestjs/swagger";
import { Genre } from "src/types/genre.enum";
import { Check, Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id: string;

    @ApiProperty({
        type: String,
        example: 'Titanic'
    })
    @Column({
        type: 'varchar',
        length: 30,
        unique: true // за да не се внесе ист филм два пати во база
    })
    title: string;

    @ApiProperty({
        type: String,
        example: 'A tragic romance aboard the doomed RMS Titanic.'
    })
    @Column({
        type: 'text'
    })
    description: string;

    @ApiProperty({
        type: Number,
        example: 1997
    })
    @Column({
        type: 'integer',
        name: 'release_year'
    })
    @Check('LENGTH(CAST(release_year AS TEXT)) = 4')
    releaseYear: number;

    @ApiProperty({
        enum: Genre,
        example: 'Romance'
    })
    @Column({
        type: 'enum',
        enum: Genre
    })
    genre: Genre;

    @ApiProperty({
        type: Number,
        example: 194
    })
    @Column({
        type: 'integer'
    })
    duration: number;

    @ApiProperty({
        type: Number,
        example: 8,
    })
    @Column({
        type: 'integer'
    })
    rating: number;

    @ApiProperty({
        type: String,
        example: 'https://cdn.posteritati.com/posters/000/000/049/967/titanic-md-web.jpg',
        nullable: true
    })
    @Column({
        type: 'varchar',
        name: 'poster_url',
        nullable: true
    })
    posterUrl: string | null;

    @ApiProperty({
        type: String,
        example: '2025-01-20T15:00:00Z'
    })
    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @ApiProperty({
        type: String,
        example: '2025-01-20T15:00:00Z'
    })
    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}

