import { Controller, Get, Post, Body, Patch, Param, UseGuards, Delete, Request} from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  // @Get('/user/:id')
  // async getMovieRatingByUser(@Param('id') id: number) {
  //   return this.ratingService.getRatingByUser(id)
  // }

  // @Delete('/remove/:movieId')
  // async removeRatingMovie(@Param('movieId') movieId: number, @Body('userId') userId: number) {
  //   return this.ratingService.removeRatingMovie(movieId, userId)
  // }
}
