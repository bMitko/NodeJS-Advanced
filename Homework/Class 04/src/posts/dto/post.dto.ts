import { IsDefined, IsNumber, IsOptional, IsString, Length, Min, IsPositive} from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsDefined()
    @Length(2, 50)
    title: string;

    @IsString()
    @IsDefined()
    @Length(5, 100)
    content: string;

    @IsNumber()
    @IsDefined()
    @Min(1)
    authorId: number;
}

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    @Length(2, 50)
    title: string;

    @IsString()
    @IsOptional()
    @Length(5, 100)
    content: string;

    @IsNumber()
    @IsOptional()
    @Min(1)
    authorId: number;
}

export class PostDto extends CreatePostDto {
    @IsNumber()
    @IsPositive()
    @IsDefined()
    id: number;
}