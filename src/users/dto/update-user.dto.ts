import { IsEmail, IsNotEmpty} from "class-validator";

export class UpdateUserUserDto {

    email?: string;

    password?: string
    
    value?: string

    name?: string
}