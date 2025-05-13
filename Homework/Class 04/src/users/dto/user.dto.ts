import {
    IsDefined,
    IsEmail,
    IsEnum,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Length,
} from 'class-validator'
import { UserRole } from 'src/types/user-role.enum';

export class CreateUserDto {
    @IsString()
    @IsDefined()
    @Length(2, 50)
    name: string;

    @IsString()
    @IsDefined()
    @IsEmail()
    email: string;

    @IsString()
    @IsDefined()
    @IsEnum(UserRole)
    role: UserRole;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @Length(2, 50)
    name: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole;
}

export class UserDto extends CreateUserDto {
    @IsNumber()
    @IsPositive()
    @IsDefined()
    id: number;
}