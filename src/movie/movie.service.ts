import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorService } from 'src/actor/actor.service';
import { GenreService } from 'src/genre/genre.service';
import { RatingService } from 'src/rating/rating.service';
import { Connection, DataSource, ILike, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { FileService } from 'src/file/file.service';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(MovieEntity) private movieRepo: Repository<MovieEntity>,
    private genresServer: GenreService,
    private actorServer: ActorService,
    @Inject(forwardRef(()=> RatingService))
    private ratingServer: RatingService ,
    private readonly connection: Connection,
    private FileService: FileService,
    @Inject(forwardRef(()=> CommentsService))
    private movieService: CommentsService,
    private dataSource: DataSource
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepo.create(createMovieDto)

    movie.actor = []
    if(createMovieDto.actorIds) {
      for(let i = 0; i < createMovieDto.actorIds.length; i++) {
        let newActor = await this.actorServer.findOne(createMovieDto.actorIds[i])
        if(newActor) {
          movie.actor.push(newActor)
        } 
      }
    }

    if(createMovieDto.genreIds) {
      movie.genre = []
      for(let i = 0; i < createMovieDto.genreIds.length; i++) {
        let newGenre = await this.genresServer.findOne(createMovieDto.genreIds[i])
        if (newGenre) {
          movie.genre.push(newGenre)
        }
      }
    }

    await this.movieRepo.save(movie)
    await this.ratingServer.create(movie.id, 0) 
    return movie;
  }

//transaction 
  // async transactionCreateMovie(createMovieDto: CreateMovieDto) {
  //   const queryRunner = this.dataSource.createQueryRunner()
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     const movie = await this.movieRepo.create(createMovieDto)
  //     movie.actor = []
  //     if(createMovieDto.actorIds) {
  //       for(let i = 0; i < createMovieDto.actorIds.length; i++) {
  //         let act = await this.actorServer.findOne(createMovieDto.actorIds[i])
  //         if(act) {
  //           movie.actor.push(act)
  //         } 
  //       }
  //     }

  //     if(createMovieDto.genreIds) {
  //       movie.genre = []
  //       for(let i = 0; i < createMovieDto.genreIds.length; i++) {
  //         let gen = await this.genresServer.findOne(createMovieDto.genreIds[i])
  //         if (gen) {
  //           movie.genre.push(gen)
  //         }
  //       }
  //     }

  //     await queryRunner.manager.save(movie)
  //     await this.ratingServer.create(movie.id, 0) 
  //     await queryRunner.commitTransaction();
  //     return movie;
  //   } catch(err) {
  //     await queryRunner.rollbackTransaction();
  //     const error: any = {
  //       status: false,
  //       error: err.message,
  //     };
  //     return error
  //   } finally {
  //     await queryRunner.release()
  //     return {ok: true}
  //   }
  // }

  async findAll() {
    const movies = await this.movieRepo.find({relations: ['actor', 'genre']})
    return movies;
  }

  async findOne(id: number) {
    const movie = await this.movieRepo.findOne({where: {id}, relations: ['actor', 'genre']})
    if(movie){
      return movie
    }
    throw new NotFoundException(`Movie with ${id} not found`);
  } 

  async getAll(searchTerm?: string) {
    const loadedMovie = await this.movieRepo.findBy({
      title: ILike(`${searchTerm}%`)
    })
    return loadedMovie
  }

  async findByActor(actorId: number){
    const movies = this.movieRepo.find({
      relations: {actor: true}, 
      where: {actor: {id: actorId}}
    })
    return movies
  }

  async findByGenre(genreId: number) {
    const movie = this.movieRepo.find({
      relations: {genre: true},
      where: {genre: {id: genreId}}
    })
    return movie
  }
  
  async findByOpened() {
    const movie = await this.movieRepo.find({
      take: 5,
      order: {coundOpened: "DESC"}
    })
    return movie
  }

	async updateCountOpened(id: number) {
		const movie = await this.findOne(id)
    movie.coundOpened += 1
    return this.movieRepo.save(movie) 
	}

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id)

    if(!movie) {
      throw new NotFoundException(`Movie with ${id} not found`)
    }

    Object.assign(movie, updateMovieDto)
    return this.movieRepo.save(movie)
  }

  async updateRating(id: number, newRating: number) {
    const movie = await this.findOne(id)
    movie.ratings = newRating
    return await this.movieRepo.save(movie)
  }

  async remove(id: number) {
    const movie = await this.findOne(id)
    return this.movieRepo.remove(movie);
  }

  async totalCoundOpened() {
    const movieOpened = await this.movieRepo.find({
      select: {id: true, title: true, coundOpened: true},
    })
    return movieOpened
  }

  async movieRatingByGenre(genreId: number) {
    const movie = await this.movieRepo.find({
      relations: {
        genre: true
      },
      select: {title: true, ratings: true, genre: {name: true}},
      where: {genre: {id: genreId}},
    })
    return movie
  }

  async newMovie() {
    let now = new Date();
    const movie = await this.movieRepo.find({
      where: {yers: now.getFullYear()}
    })
    return movie
  }
}
