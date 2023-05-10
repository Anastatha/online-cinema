import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/othetOne')
  totalCoundOpened() {
    return this.movieService.totalCoundOpened()
  }

  // @Post('/tran')
  // tran(@Body() createMovieDto: CreateMovieDto) {
  //   return this.movieService.transactionCreateMovie(createMovieDto)
  // }

  @Get('/opened')
  findByOpened() {
    return this.movieService.findByOpened()
  }

  @Get('/search')
  getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm);
  }

  @Get('/new')
  NewMovie() {
    return this.movieService.newMovie()
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

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
