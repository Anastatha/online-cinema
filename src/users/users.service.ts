import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from 'src/movie/movie.service';
import { RolesService } from 'src/roles/roles.service';
import { DataSource, Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/creat-user.dto';
import { UpdateUserUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private roleService: RolesService,
        private movieService: MovieService
    ) {}

    async creatUser(dto: CreateUserDto) {
        const user = await this.userRepo.create(dto)
        const role = await this.roleService.getRoleByValu("USER")
        user.role = [role]
        return this.userRepo.save(user)
    }   

    async findAll() {
        const users = await this.userRepo.find({relations: ['role', 'favorites']})
        return users
    }

    async findOne(id: number) {
        const user = await this.userRepo.findOne({where: {id}, relations: ['role','favorites']})
        if(user) {
            return user
        }
        throw new NotFoundException(`User with ${id} not found`);
    } 

    async findUserByEmail(email: string) {
        const user = this.userRepo.findOne({where: {email}, relations: ['role', 'favorites']})
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.findOne(dto.userId)
        const role = await this.roleService.getRoleByValu(dto.value)
        if(role && user) {
            user.role.push(role)
            return this.userRepo.save(user)
        }
        throw new NotFoundException(`Element not found`);
    }

    async updateUser(id: number, dto: UpdateUserUserDto) {
        const user = await this.findOne(id)
        if(dto.email) {
            const email = dto.email
            const isSameUser = await this.userRepo.findOne({where: {email}})
            if(isSameUser && id !== isSameUser.id) {
                throw new BadRequestException('Email busy')
            }
            user.email = dto.email 
        }

        if(dto.password){
            const hashPassword = await bcrypt.hash(dto.password, 5)
            user.password = hashPassword
        }

        if(dto.name)
            user.name = dto.name
        
        await this.userRepo.save(user)
        return user
    }

    async toggleFavorite(id: number, movieId: number) {
        const user = await this.findOne(id)
        const movie = await this.movieService.findOne(movieId)

        if(!user.favorites.some(e =>  e.id == movie.id)) {
            user.favorites.push(movie)
        } else {
            user.favorites = user.favorites.filter((e => e.id != movie.id))
        }
        return this.userRepo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        return this.userRepo.remove(user)
    }

    async othetThree() {
        const user = await this.userRepo.findAndCount({
            relations: {role: true},
            where: {
                role: {
                    value: "PRIVILEGE"
                }
            }
        })
        return user
    }
}

