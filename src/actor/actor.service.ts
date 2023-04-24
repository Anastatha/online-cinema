import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorEntity } from './entities/actor.entity';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(@InjectRepository(ActorEntity) private actorRepo: Repository<ActorEntity>) {}
  
  async createActor(createActorDto: CreateActorDto) {
    const actor = await this.actorRepo.create(createActorDto)
    return this.actorRepo.save(actor);
  }

  async findAll() {
    const actors = await this.actorRepo.find({relations: ['movie']})    
    return actors;
  }

  async findOne(id: number) {
    const actor = await this.actorRepo.findOne({where: {id}, relations: ['movie']})
    if(actor){
      return actor
    }
    throw new NotFoundException(`Actor with ${id} not found`);
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    const actor = await this.findOne(id)

    if(!actor) {
      throw new NotFoundException(`Actor with ${id} not found`)
    }

    return this.actorRepo.save({...actor, ...updateActorDto})
  } 

  async remove(id: number) {
    const actor = await this.findOne(id)
    return this.actorRepo.remove(actor);
  }
}
