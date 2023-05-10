import { IsEmpty, IsNumber, IsString } from "class-validator"

export class UpdateUserUserDto {
    email: string;

    password: string

    name: string
}