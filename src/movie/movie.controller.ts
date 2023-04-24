import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// import { Controller, Get, Post, UseInterceptors, UploadedFiles, Body, Param, Res } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
// import { AppService } from './app.service';
import { diskStorage } from 'multer';
import path = require('path');
import { Observable, of } from 'rxjs';
import { join } from 'path';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  // @Get("pdf/download")
  // async downloadPDF(@Res() res): Promise<void> {
  //   const buffer = await this.movieService.generarPDF();

  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'attachment; filename=example.pdf',
  //     'Content-Length': buffer.length,
  //   })
  //   res.end(buffer);
  // }

  @Get('/othetOne')
  totalCoundOpened() {
    return this.movieService.totalCoundOpened()
  }

  @Post('/tran')
  tran(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.transactionCreateMovie(createMovieDto)
  }

  @Get('/opened')
  findByOpened() {
    return this.movieService.findByOpened()
  }

  @Get('/search')
  getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Get('/othetTwo/:genreId')
  movieRatingByGenre(@Param('genreId') genreId: number) {
    return this.movieService.movieRatingByGenre(genreId)
  }

  @Post('updateCountOpened/:id')
  updateCountOpened(@Param('id') id: number) {
    return this.movieService.updateCountOpened(id)
  }

  @Get('/byActor/:actorId')
  async byActor(@Param('actorId') actorId: number) {
    return this.movieService.findByActor(actorId)
  }

  @Get('/byGenre/:genreId')
  async findByGenre(@Param('genreId') genreId: number) {
    return this.movieService.findByGenre(genreId)
  }

  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
