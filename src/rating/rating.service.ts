import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { MovieService } from 'src/movie/movie.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RatingService { 
  constructor(@InjectRepository(RatingEntity) private ratingRepo: Repository<RatingEntity>, 
    private movieService: MovieService,
    private userServer: UsersService
  ){}

  async create(dto: CreateRatingDto, movieId: number, userId: number) {
    let rating = await this.ratingRepo.findOne({
      where: { user: {id: userId}, movie: {id: movieId} }
    });

    if(rating) {
      rating.value = dto.value
    } else {
      rating = await this.ratingRepo.create(dto)
      rating.user = await this.userServer.findOne(userId) 
      rating.movie = await this.movieService.findOne(movieId)
    }

    await this.ratingRepo.save(rating)

    const averageRating = await this.averageRatingbyMovie(movieId)
    await this.movieService.updateRating(movieId, averageRating)

    return rating
  } 

  async averageRatingbyMovie(movieId: number) {
    const rating = await this.ratingRepo.find({where: {movie: {id: movieId}}})
    const newRating = Math.round(rating.reduce((acc, item) => acc + item.value, 0) / rating.length)
    return newRating
  }
}
