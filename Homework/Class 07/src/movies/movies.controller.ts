import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Movie } from './movie.entity';
import { MovieQueryDto } from './dto/query-movie.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({
    summary: 'Search movies'
  })
  async search(@Query() query: MovieQueryDto): Promise<Movie[]> {
    return await this.moviesService.search(query)
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get movie by ID'
  })
  async findOne(@Param('id') id: string): Promise<Movie> {
    return await this.moviesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new movie'
  })
  @ApiCreatedResponse({
    description: 'You successfully added new movie.',
    type: Movie
  })
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.moviesService.create(createMovieDto);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update movie'
  })
  async update(@Param('id') id: string, @Body() body: UpdateMovieDto): Promise<Movie> {
    await this.moviesService.update(id, body);

    return this.moviesService.findOne(id)
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete movie'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.moviesService.delete(id)
  }
}
