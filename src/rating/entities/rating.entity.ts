import { MovieEntity } from "src/movie/entities/movie.entity";
import { UserEntity } from "src/users/user.entity";
import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'rating'})
export class RatingEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	value: number;

    @ManyToOne(() => UserEntity, userEntity => userEntity.rating)
    user: UserEntity

    @ManyToOne(() => MovieEntity, movieEntity => movieEntity.rating)
    movie: MovieEntity
}