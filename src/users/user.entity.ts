import { CommentEntity } from "src/comments/entities/comment.entity";
import { MovieEntity } from "src/movie/entities/movie.entity";
import { RatingEntity } from "src/rating/entities/rating.entity";
import { RolesEntity } from "src/roles/roles.entity";
import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: 'user'})
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: true})
	name: string

	@Column({unique: true})
	email: string;

	@Column()
	password: string

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@ManyToMany(() => RolesEntity, rolesEntity => rolesEntity.users, {eager: true})
	@JoinTable()
    role: RolesEntity[]

	@ManyToMany(() => MovieEntity, movieEntity => movieEntity.user, {eager: true})
	@JoinTable()
	favorites: MovieEntity[]

	@OneToMany(()=>RatingEntity, ratingEntity => ratingEntity.user)
	rating: RatingEntity[]

	@OneToMany(() => CommentEntity, commentEntity => commentEntity.user)
    comment: CommentEntity[]
}
