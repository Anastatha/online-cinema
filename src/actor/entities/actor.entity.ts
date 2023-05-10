import { MovieEntity } from "src/movie/entities/movie.entity";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany,} from "typeorm";

@Entity({name: 'actor'})
export class ActorEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

    @Column()
    poster: string

	@Column()
	dataBirth: Date

	@Column()
	placeBirth: string
    
	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@ManyToMany(() => MovieEntity, movieEntity => movieEntity.actor, {eager: true})
    movie: MovieEntity[]
}

