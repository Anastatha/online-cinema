import {IsString } from "class-validator"

export class CreateMovieDto {
    @IsString()
    title: string

    @IsString()
    description?:string
    
    poster?:string

    video?:string
    
    coundOpened?: number
    
    yers?:number
    
    duration?: number
    
    country?: string

    actorIds?: number []

    genreIds?: number []

    actorName?: string
    
    genreName?: string
}
