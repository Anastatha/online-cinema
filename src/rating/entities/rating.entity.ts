import { MovieEntity } from "src/movie/entities/movie.entity";
import { UserEntity } from "src/users/user.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'rating'})
export class RatingEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	value: number;

    @Column({nullable: true})
    userId: number

    @Column()
    movieId: number

    @ManyToOne(()=>UserEntity, userEntity=>userEntity.rating, {onUpdate: 'CASCADE'})
    user: UserEntity
}