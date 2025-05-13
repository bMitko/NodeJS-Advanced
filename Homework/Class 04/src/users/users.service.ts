import { Injectable, BadRequestException, NotFoundException, Inject, forwardRef } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto, UserDto} from "./dto/user.dto";
import { UserRole } from "src/types/user-role.enum";
import { PostsService } from "src/posts/posts.service";
import { PostDto } from "src/posts/dto/post.dto";

@Injectable()
export class UsersService {
    constructor(
        @Inject(forwardRef(() => PostsService))
        private readonly postsService: PostsService
    ) {}

    private users: UserDto[] = [
        {
            id: 1,
            name: 'John',
            email: 'john@mail.com',
            role: UserRole.Moderator
        },
        {
            id: 2,
            name: 'Jane',
            email: 'jane@mail.com',
            role: UserRole.Editor
        }
    ];

    getUsers(): UserDto[] {
        return this.users
    }

    getUserById(id: number): UserDto {
        const user = this.users.find((user) => user.id === id)

        if(!user) {
            throw new NotFoundException (`User with ID: ${id} doesn't exist`)
        }
         
        return user
    }

    getUsersPosts(id: number): PostDto[] {
        const user = this.users.find((user) => user.id === id)

        if(!user) {
            throw new NotFoundException (`User with ID: ${id} doesn't exist`)
        }

        const posts: PostDto[] = this.postsService.getPosts()

        const postsByUser = posts.filter((post) => post.authorId === user.id)

        if(postsByUser.length === 0) {
            throw new BadRequestException (`This user has't posted yet.`)
        }

        return postsByUser;
    }

    createUser(body: CreateUserDto): UserDto {
        const email = this.users.filter((user) => user.email === body.email)

        if(email.length === 1){
            throw new BadRequestException (`User with this email (${body.email}) already exists.`)
        }

        const newUser = {
            id: (this.users[this.users.length - 1].id) + 1,
            ...body
        } satisfies UserDto

        this.users.push(newUser)

        return newUser;
    }

    updateUser(id: number, body: UpdateUserDto): UserDto {
        const userIndex = this.users.findIndex((user) => user.id === id)

        if(userIndex < 0) {
            throw new NotFoundException (`User with ID: ${id} doesn't exist`)
        }

        const email = this.users.filter((user) => user.email === body.email)

        if(this.users[userIndex].email === body.email) {
            throw new BadRequestException (`You can't update your email with your previous email`)
        } 
        else if(email.length === 1){
            throw new BadRequestException (`User with this email (${body.email}) already exists.`)
        }
        
        
        const updatedUser = {
            id,
            ...body,
            name: body.name ?? this.users[userIndex].name,
            email: body.email ?? this.users[userIndex].email,
            role: body.role ?? this.users[userIndex].role,
        } satisfies UserDto;

        this.users[userIndex] = updatedUser;

        return updatedUser;
    }

    deleteUser(id: number): void {
        const userIndex = this.users.findIndex((user) => user.id === id)

        if(userIndex < 0) {
            throw new BadRequestException(`You can't delete user that doesn't exist`)
        }
        
        this.users = this.users.filter((user) => user.id !== id)

    }
}
