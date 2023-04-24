import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RolesEntity } from './roles/roles.entity';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { FileModule } from './file/file.module';
import { RatingModule } from './rating/rating.module';
import { GenreEntity } from './genre/entities/genre.entity';
import { MovieEntity } from './movie/entities/movie.entity';
import { ActorEntity } from './actor/entities/actor.entity';
import { RatingEntity } from './rating/entities/rating.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/entities/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserEntity, RolesEntity, GenreEntity,MovieEntity,ActorEntity,RatingEntity,CommentEntity],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    GenreModule,
    MovieModule,
    ActorModule,
    FileModule,
    RatingModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
