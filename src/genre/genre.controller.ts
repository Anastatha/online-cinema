import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Query } from '@nestjs/common/decorators';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.createGenre(createGenreDto);
  }

  @Get()
  getAll() {
    return this.genreService.getAll()
  }

  @Get('/search')
  findAll(@Query('searchTerm') searchTerm?: string) {
    return this.genreService.findAll(searchTerm);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.genreService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.genreService.removeGenre(+id);
  }
}
