import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from 'src/movie/movie.service';
import { Repository } from 'typeorm';
import { SetRatingDto } from './dto/set-rating.dto';
import { RatingEntity } from './entities/rating.entity';

@Injectable()
export class RatingService { 
  constructor(@InjectRepository(RatingEntity) private ratingRepo: Repository<RatingEntity>,
    @Inject(forwardRef(()=>MovieService))
    private readonly movie: MovieService
  ){}

  async create(movieId: number, value: number) {
    const reting = await this.ratingRepo.create({movieId, value})
    return this.ratingRepo.save(reting)
  }
  
  async getMovieRatingByUser(movieId: number, userId: number) {
    return this.ratingRepo.findOne({
      select: {value:true}, 
      where: {movieId, userId}
    }).then((data)=> (data ? data.value : 0))
  }

  async setRating(userId: number, dto: SetRatingDto) {
    const {movieId, value} = dto

    const rating = await this.ratingRepo.findOne({where: {movieId}})
    if(rating) {
      if(!rating.userId) {
        rating.value = value
        rating.userId = userId
        await this.ratingRepo.save(rating)
      } else {
        const newRUser = await this.ratingRepo.create({userId: userId, movieId: movieId, value: value})
        await this.ratingRepo.save(newRUser)

        const averageRating = await this.averageRatingbyMovie(movieId)
        await this.movie.updateRating(movieId, averageRating)
      }
    }
    
    return rating
  }

  async averageRatingbyMovie(movieId: number) {
    const rating = await this.ratingRepo.find({where: {movieId}})
    const newRating = Math.round(rating.reduce((acc, item) => acc + item.value, 0) / rating.length)
    return newRating
  } 
}
