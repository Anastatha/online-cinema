import { IsNumber} from 'class-validator'

export class SetRatingDto {
	@IsNumber()
	movieId: number

	@IsNumber()
	value: number
}
