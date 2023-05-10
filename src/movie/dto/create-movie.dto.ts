import {IsNumber, IsString } from "class-validator"

export class CreateMovieDto {
    @IsString()
    title: string

    @IsString()
    description:string
    
    @IsString()
    poster:string

    video:string
    
    coundOpened: number
    
    @IsNumber()
    yers:number
    
    @IsNumber()
    duration: number
    
    @IsString()
    country: string

    actorIds: number []

    genreIds: number []
}
