import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty} from "class-validator";

export class CreateUserDto {
    // @IsEmail({},{message: "Invalid email"})
    @IsNotEmpty()
    @ApiProperty({ example: 'Lana@gmail.com' })
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;
}