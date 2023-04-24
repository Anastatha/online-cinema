import { MovieEntity } from "src/movie/entities/movie.entity";
import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: 'genre'})
export class GenreEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({name: 'name'})
	name: string;

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@ManyToMany(() => MovieEntity, movieEntity => movieEntity.genre)
    movies: MovieEntity[]
}