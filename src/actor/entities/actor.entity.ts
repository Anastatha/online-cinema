import { MovieEntity } from "src/movie/entities/movie.entity";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany,} from "typeorm";

@Entity({name: 'actor'})
export class ActorEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({name: 'name'})
	name: string;

	@Column({name: 'description', nullable: true})
	description: string;

    @Column({name: 'poster', nullable: true})
    poster: string

	@Column({name: "dataBirth", nullable: true})
	dataBirth: Date

	@Column({name: "placeBirth", nullable: true})
	placeBirth: string
    
	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@ManyToMany(() => MovieEntity, movieEntity => movieEntity.actor, {eager: true})
    movie: MovieEntity[]
}

