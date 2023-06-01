import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorService } from 'src/actor/actor.service';
import { GenreService } from 'src/genre/genre.service';
import { ILike, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(MovieEntity) private movieRepo: Repository<MovieEntity>,
    private genresServer: GenreService,
    private actorServer: ActorService
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepo.create(createMovieDto)

    movie.actor = []
    if (createMovieDto.actorIds) {
      for (let i = 0; i < createMovieDto.actorIds.length; i++) {
        let newActor = await this.actorServer.findOne(createMovieDto.actorIds[i])
        if (newActor) {
          movie.actor.push(newActor)
        }
      }
    }

    if (createMovieDto.genreIds) {
      movie.genre = []
      for (let i = 0; i < createMovieDto.genreIds.length; i++) {
        let newGenre = await this.genresServer.findOne(createMovieDto.genreIds[i])
        if (newGenre) {
          movie.genre.push(newGenre)
        }
      }
    }

    await this.movieRepo.save(movie)
    return movie;
  }

  async findAll() {
    const movies = await this.movieRepo.find({ relations: ['actor', 'genre'] })
    return movies;
  }

  async findOne(id: number) {
    const movie = await this.movieRepo.findOne({ where: { id }, relations: ['actor', 'genre'] })
    if (movie) {
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

  async findByActor(actorId: number) {
    const movies = this.movieRepo.find({
      relations: { actor: true },
      where: { actor: { id: actorId } }
    })
    return movies
  }

  async addActor(id: number, actorId: number) {
    const movie = await this.findOne(id)
    const actor = await this.actorServer.findOne(actorId)

    if(!movie.actor.some(e => e.id == actor.id)) {
      movie.actor.push(actor)
    } else {
      movie.actor = movie.actor.filter(e => e.id != actor.id)
    }
    return this.movieRepo.save(movie)
  }

  async addGenre(id: number, genreId: number) {
    const movie = await this.findOne(id)
    const genre = await this.genresServer.findOne(genreId)
    if(!movie.genre.some(e =>  e.id == genre.id)){
      movie.genre.push(genre)
    } else {
      movie.genre = movie.genre.filter(e => e.id != genre.id)
    }
    return this.movieRepo.save(movie)
  }

  async findByGenre(genreId: number) {
    const movie = this.movieRepo.find({
      relations: { genre: true },
      where: { genre: { id: genreId } }
    })
    return movie
  }

  async findByOpened() {
    const movie = await this.movieRepo.find({
      take: 5,
      order: { coundOpened: "DESC" }
    })
    return movie
  }

  async updateCountOpened(id: number) {
    const movie = await this.findOne(id)
    movie.coundOpened += 1
    return this.movieRepo.save(movie)
  }

  async updateRating(id: number, general_rating: number) {
    const movie = await this.findOne(id)
    movie.general_rating = general_rating
    this.movieRepo.save(movie)
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id)

    if (!movie) {
      throw new NotFoundException(`Movie with ${id} not found`)
    }

    Object.assign(movie, updateMovieDto)
    return this.movieRepo.save(movie)
  }

  async remove(id: number) {
    const movie = await this.findOne(id)
    return this.movieRepo.remove(movie);
  }

  async totalCoundOpened() {
    const movieOpened = await this.movieRepo.find({
      select: { id: true, title: true, coundOpened: true },
    })
    return movieOpened
  }

  async newMovie() {
    let now = new Date();
    const movie = await this.movieRepo.find({
      where: { yers: now.getFullYear() }
    })
    return movie
  }
}
