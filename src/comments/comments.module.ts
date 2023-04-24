import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UserEntity } from 'src/users/user.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MovieModule } from 'src/movie/movie.module';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MovieEntity, CommentEntity]),  forwardRef(()=> UsersModule), forwardRef(()=> MovieModule)],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}