import { Injectable, BadRequestException, NotFoundException, Inject, forwardRef } from "@nestjs/common";
import { CreatePostDto, PostDto, UpdatePostDto } from "./dto/post.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PostsService {
    constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
    ) {}
    private posts: PostDto[] = [
        {
            id: 1,
            title: 'Fisrt post',
            content: 'This is my first post by user 1',
            authorId: 1
        },
        {
            id: 2,
            title: 'Fisrt post',
            content: 'This is my first post by user 2',
            authorId: 2
        }
    ];

    getPosts(): PostDto[] {
        return this.posts
    }

    getPostById(id: number): PostDto {
        const post = this.posts.find((post) => post.id === id)

        if(!post) {
            throw new NotFoundException (`Post with ID: ${id} doesn't exist`)
        }
        
        return post
    }

    createPost(body: CreatePostDto): PostDto {

        const author = this.usersService.getUserById(body.authorId)

        if(!author) {
            throw new NotFoundException (`User with ID: ${body.authorId} doens't exist.`)
        }

        const newPost = {
            id: (this.posts[this.posts.length - 1].id) + 1,
            ...body
        } satisfies PostDto

        this.posts.push(newPost)

        return newPost;
    }

    updatePost(id: number, body: UpdatePostDto): PostDto {
        const postIndex = this.posts.findIndex((post) => post.id === id)

        if(postIndex < 0) {
            throw new NotFoundException (`Post with ID: ${id} doesn't exist`)
        }

        const author = this.usersService.getUserById(body.authorId)

        if(!author) {
            throw new NotFoundException (`User with ID: ${body.authorId} doens't exist.`)
        }
        
        const updatedPost = {
            id,
            ...body,
            title: body.title ?? this.posts[postIndex].title,
            content: body.content ?? this.posts[postIndex].content,
            authorId: body.authorId ?? this.posts[postIndex].authorId,
        } satisfies PostDto;

        this.posts[postIndex] = updatedPost;

        return updatedPost;
    }

    deletePost(id: number): void {
        const postIndex = this.posts.findIndex((post) => post.id === id)

        if(postIndex < 0) {
            throw new BadRequestException(`You can't delete post that doesn't exist`)
        }
        
        this.posts = this.posts.filter((post) => post.id !== id)

    }
}