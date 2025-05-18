import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieQueryDto } from './dto/query-movie.dto';
import { Sort, Order } from 'src/types/sort-and-order.enum';


@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) { }

  search({
    genre,
    minRating,
    maxDuration,
    title,
    sortBy,
    orderBy
  }: MovieQueryDto): Promise<Movie[]> {
    let query = this.movieRepository.createQueryBuilder('movie')

    if (genre) {
      query.andWhere('movie.genre = :genre', { genre });
    }

    if (minRating) {
      query.andWhere('movie.rating >= :minRating', { minRating })
    }

    if (maxDuration) {
      query.andWhere('movie.duration <= :maxDuration', { maxDuration })
    }

    if (title) {
      query.andWhere('movie.title ILIKE :title', { title: `%${title}%` });
    }

    const sort = sortBy || Sort.ReleaseYear;
    const order = orderBy || Order.DESC;

    query.orderBy(`movie.${sort}`, order)


    return query.getMany()
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({
      id,
    });

    if (!movie) {
      throw new NotFoundException(`Movie with this ID: (${id}) doesn't exist.`)
    }

    return movie;
  }

  async create(body: CreateMovieDto): Promise<Movie> {
    try {
      const movie = this.movieRepository.create(body)
      return await this.movieRepository.save(movie)
    }
    catch (error: any) {
      // throw new BadRequestException(error.detail);
      throw new BadRequestException(`Error happened: ${error}`)
    }
  }

  async update(id: string, body: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id)

    const updatedMovie = {
      ...movie,
      ...body
    }

    return this.movieRepository.save(updatedMovie)
  }

  async delete(id: string): Promise<void> {
    await this.movieRepository.softDelete(id)
  }
}
