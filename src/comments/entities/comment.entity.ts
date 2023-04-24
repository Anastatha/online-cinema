import { MovieEntity } from "src/movie/entities/movie.entity";
import { UserEntity } from "src/users/user.entity";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne,} from "typeorm";

@Entity({name: 'comment'})
export class CommentEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({name: "value"})
	value: string;

	@Column()
    userId: number

    @Column()
    movieId: number

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@ManyToOne(()=>UserEntity, userEntity=>userEntity.comment)
	user: UserEntity

    @ManyToOne(()=>MovieEntity, movieEntity=>movieEntity.comment)
    movie: MovieEntity
}