import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserEntity } from './user.entity';
import { RolesEntity } from 'src/roles/roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { RatingEntity } from 'src/rating/entities/rating.entity';
import { RatingModule } from 'src/rating/rating.module';
import { MovieModule } from 'src/movie/movie.module';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity, MovieEntity, RatingEntity, CommentEntity]), RolesModule, forwardRef(()=> MovieModule), forwardRef(() => AuthModule), forwardRef(()=>RatingModule), forwardRef(() => CommentsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
