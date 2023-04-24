import { Controller, Get, Post, Body, Patch, Param} from '@nestjs/common';
import { RatingService } from './rating.service';
import { SetRatingDto } from './dto/set-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() movieId: number, value: number) {
    return this.ratingService.create(movieId, value)
  }

  @Post('/:userId')
  async setRating(@Param('userId') userId: number, @Body() setRatingDto: SetRatingDto) {
    return this.ratingService.setRating(userId, setRatingDto)
  }

  @Get('/:userId/:movieId')
  async getMovieRatingByUser(@Param('movieId') movieId: number, @Param('userId') userId: number) {
    return this.ratingService.getMovieRatingByUser(movieId, userId)
  }
}
