import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RatingService } from 'src/rating/rating.service';
import { CreateRatingDto } from 'src/rating/dto/create-rating.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService,
    private readonly ratingService: RatingService
    ) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/rating')
  createRating(@Request() req, @Param('id') id: number, @Body() dto: CreateRatingDto) {
    const userId = req.user.id
    return this.ratingService.create(dto, id, userId)
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

  @Patch('/addActor/:id')
  addActor(@Param('id') id: number, @Body('actorId') actorId: number) {
    return this.movieService.addActor(id, actorId)
  }

  @Patch('/addGenre/:id')
  addGenre(@Param('id') id: number, @Body("genreId") genreId: number) {
    return this.movieService.addGenre(id, genreId)
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
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
