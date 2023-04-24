import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/creat-user.dto';
import { UpdateUserUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: UserEntity})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.creatUser(userDto)
    }

    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    // @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll()
    }

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

    @Delete(':id')
    remove(@Param('id') id:number) {
        return this.usersService.remove(id)
    }

    @Patch('/profile/:id')
    updateUser(@Param('id') id: number, @Body() updateDto: UpdateUserUserDto) {
        return this.usersService.updateUser(id, updateDto)
    }

    @Put('/favorite/:id/:movieId')
    toggleFavorite(@Param('id') id: number, @Param('movieId') movieId: number) {
        return this.usersService.toggleFavorite(id, movieId)
    }
}
