import { IsString } from "class-validator"
export class UpdateMovieDto {

    title: string

    description:string
    
    poster:string

    video:string
    
    coundOpened: number

    yers:number

    duration: number
    
    country: string

    //actorIds: number []
    
    //genreIds: number []
}
