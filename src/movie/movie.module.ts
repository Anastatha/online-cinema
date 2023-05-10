import { forwardRef, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieEntity } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { GenreModule } from 'src/genre/genre.module';
import { ActorModule } from 'src/actor/actor.module';
import { RatingEntity } from 'src/rating/entities/rating.entity';
import { RatingModule } from 'src/rating/rating.module';
import { FileModule } from 'src/file/file.module';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommentsModule } from 'src/comments/comments.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, UserEntity, GenreEntity, ActorEntity, RatingEntity, CommentEntity]), GenreModule, FileModule, ActorModule,  forwardRef(() => RatingModule), forwardRef(()=> CommentsModule), forwardRef(() => AuthModule)],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}
