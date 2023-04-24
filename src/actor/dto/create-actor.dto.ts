import { IsNotEmpty } from "class-validator"

export class CreateActorDto {
    @IsNotEmpty()
    name: string

    description?: string
    
    poster?: string
}
