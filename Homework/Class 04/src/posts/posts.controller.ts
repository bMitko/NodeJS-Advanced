import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from "@nestjs/common"
import { CreatePostDto, PostDto, UpdatePostDto } from "./dto/post.dto"
import { PostsService } from "./posts.service"

@Controller('posts')
export class PostsController {
    constructor (private postsService: PostsService) {}

    @Get()
    getPosts(): PostDto[] {
        return this.postsService.getPosts()
    }

    @Get('/:id')
    getPostById(@Param('id', ParseIntPipe) id: number): PostDto {
        return this.postsService.getPostById(id)
    }

    @Post()
    createPost(@Body() body: CreatePostDto): PostDto {
        return this.postsService.createPost(body)
    }

    @Patch('/:id')
    updatePost(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePostDto): PostDto {
        return this.postsService.updatePost(id, body)
    }

    @Delete('/:id')
    deletePost(@Param('id', ParseIntPipe ) id: number): void {
        return this.postsService.deletePost(id)
    }
}