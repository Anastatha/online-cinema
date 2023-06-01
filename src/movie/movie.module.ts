import { Module, forwardRef } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieEntity } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { GenreModule } from 'src/genre/genre.module';
import { ActorModule } from 'src/actor/actor.module';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';
import { RatingModule } from 'src/rating/rating.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, GenreEntity, ActorEntity]), GenreModule, FileModule, ActorModule, AuthModule, forwardRef(() => RatingModule)],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}
