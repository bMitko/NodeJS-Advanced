import { Controller, Get, Param, Body, Patch, Post, Delete, ParseIntPipe} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto, UserDto } from "./dto/user.dto";
import { PostDto } from "src/posts/dto/post.dto";

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}

    @Get()
    getUsers(): UserDto[] {
        return this.usersService.getUsers()
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number): UserDto {
        return this.usersService.getUserById(id)
    }

    @Get('/:id/posts')
    getUsersPosts(@Param('id', ParseIntPipe) id: number): PostDto[] {
        return this.usersService.getUsersPosts(id)
    }

    @Post()
    createUser(@Body() body: CreateUserDto): UserDto {
        return this.usersService.createUser(body)
    }

    @Patch('/:id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): UserDto {
        return this.usersService.updateUser(id, body)
    }

    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number): void {
        return this.usersService.deleteUser(id)
    }
}