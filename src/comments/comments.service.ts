import { Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>
    ) {}
  async createComment(createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepo.create(createCommentDto)
    return this.commentRepo.save(comment)
  }

  async findAll() {
    const comment = await this.commentRepo.find({relations: ["movie", "user"]})
      return comment
  }

  async findOne(id: number) {
    const comment = await this.commentRepo.findOne({where: {id}, relations: ["movie", "user"]})
    if(comment) {
      return comment
    }
    throw new NotFoundException(`Comment with ${id} not found`);
  }

  async findByMovie(movieId: number) {
    const comment = await this.commentRepo.find({where: {movieId}, relations: ["user"]})
    if(comment) {
      return comment
    }
    throw new NotFoundException(`Comments with movieId ${movieId} not found`)
  }

  async findByUser(userId: number) {
    const comment = await this.commentRepo.find({where: {userId}})
    if(comment) {
      return comment
    }
    throw new NotFoundException(`Commentd with user ${userId} not found`)
  }

  async remove(id: number) {
    const comment = await this.findOne(id)
    return this.commentRepo.remove(comment);
  }
}
