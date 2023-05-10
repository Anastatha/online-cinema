import {IsNotEmpty, IsString} from "class-validator";

export class AddRoleDto {
    @IsNotEmpty()
    @IsString()
    value: string;

    @IsNotEmpty()
    userId: number;
}