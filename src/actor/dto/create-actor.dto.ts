import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateActorDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string
    
    @IsString()
    @IsNotEmpty()
    poster: string

    @IsNotEmpty()
    dataBirth: Date

    @IsString()
    @IsNotEmpty()
    placeBirth: string
}
