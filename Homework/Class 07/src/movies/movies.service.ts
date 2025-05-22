import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieQueryDto } from './dto/query-movie.dto';
import { Sort, Order } from 'src/types/sort-and-order.enum';
import { PaginatedResponseDto } from './dto/paginated-response.dto';


@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) { }

  async search({
    genre,
    minRating,
    maxDuration,
    title,
    sortBy,
    orderBy,
    page = 1,
    pageSize = 5
  }: MovieQueryDto): Promise<PaginatedResponseDto<Movie>> {
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

    const skip = (page - 1) * pageSize;

    query.skip(skip).take(pageSize);

    const [movies, total] = await query.getManyAndCount();

    if (movies.length === 0) {
      let pageNumber = total / pageSize
      if (pageNumber % 1 !== 0) {
        pageNumber = Math.floor(pageNumber) + 1
      }

      throw new BadRequestException(`If you want to display ${pageSize} movies per page, there are only ${pageNumber} pages `)
    }

    return {
      payload: movies,
      total
    };
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
      throw new BadRequestException(`Error happened: ${error}`)
    }
  }

  async update(id: string, body: UpdateMovieDto): Promise<Movie> {
    await this.movieRepository
      .createQueryBuilder()
      .update(Movie)
      .set(body)
      .where('id = :id', { id })
      .execute();

    const movie = await this.movieRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    if (!movie) {
      throw new NotFoundException(`You can't update movie that doesn't exist.`,)
    };

    return movie;
  }

  async delete(id: string): Promise<void> {
    const movie = await this.movieRepository.findOneBy({
      id,
    });

    if (!movie) {
      throw new NotFoundException(`You can't delete non existing movie`)
    }
    await this.movieRepository.delete(id)
  }
}
