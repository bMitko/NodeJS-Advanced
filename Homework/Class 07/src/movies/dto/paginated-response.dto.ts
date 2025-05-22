import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({
    type: Array<T>,
  })
  payload: T[];

  @ApiProperty({
    type: Number,
    description: 'Total number of movies',
    example: 100,
  })
  total: number;
}