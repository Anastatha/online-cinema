import { Module, forwardRef } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { ActorEntity } from './entities/actor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity, MovieEntity]), forwardRef(() => AuthModule)],
  controllers: [ActorController],
  providers: [ActorService],
  exports: [ActorService]
})
export class ActorModule {}
