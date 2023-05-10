import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreEntity } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(@InjectRepository(GenreEntity) private genreRepo: Repository<GenreEntity>) {}

  async createGenre(createGenreDto: CreateGenreDto) {
    const genre = await this.genreRepo.create(createGenreDto)
    return this.genreRepo.save(genre)
  }

  async getAll() {
    const genre = await this.genreRepo.find()
    return genre
  }

  async findOne(id: number) {
    const genre = await this.genreRepo.findOne({where: {id}})
    if(genre){
      return genre
    }
    throw new NotFoundException(`Genre with ${id} not found`);
  }

  async removeGenre(id: number) {
    const genre = await this.findOne(id)
    return this.genreRepo.remove(genre)
  }
}
