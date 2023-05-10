import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/creat-user.dto';
import { UpdateUserUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UserInterceptors } from 'src/interceptors/user.interceptor';

@Controller('users')
@UseInterceptors(UserInterceptors)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.creatUser(userDto)
    }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get('/othetTree')
    othetThree() {
        return this.usersService.othetThree()
    }

    @Put('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.findOne(id)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id:number) {
        return this.usersService.remove(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/profile/:id')
    updateUser(@Param('id') id: number, @Body() updateDto: UpdateUserUserDto) {
        return this.usersService.updateUser(id, updateDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/favorite/:id/:movieId')
    toggleFavorite(@Param('id') id: number, @Param('movieId') movieId: number) {
        return this.usersService.toggleFavorite(id, movieId)
    }
}
