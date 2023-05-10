import { MovieEntity } from "src/movie/entities/movie.entity";
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'genre'})
export class GenreEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToMany(() => MovieEntity, movieEntity => movieEntity.genre)
    movies: MovieEntity[]
}