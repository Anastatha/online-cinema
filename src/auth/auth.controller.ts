import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/creat-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServer: AuthService){}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authServer.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authServer.registration(userDto)
    }
}
