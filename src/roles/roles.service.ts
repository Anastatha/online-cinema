import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesEntity } from './roles.entity';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(RolesEntity) private roleRepo: Repository<RolesEntity>,) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepo.create(dto)
        return this.roleRepo.save(role)
    }

    async getRoleByValu(value: string) {
        const role = await this.roleRepo.findOne({where: {value}})
        if(role) {
            return role
        }
        throw new NotFoundException(`Role not found`);
    }
}
 
