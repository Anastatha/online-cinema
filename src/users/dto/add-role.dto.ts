import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @IsNotEmpty()
    @IsString({message: "Must be a string"})
    readonly value: string;

    @IsNotEmpty()
    readonly userId: number;
}