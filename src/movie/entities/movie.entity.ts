import { ActorEntity } from "src/actor/entities/actor.entity";
import { CommentEntity } from "src/comments/entities/comment.entity";
import { GenreEntity } from "src/genre/entities/genre.entity";
import { RatingEntity } from "src/rating/entities/rating.entity";
import { UserEntity } from "src/users/user.entity";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne,} from "typeorm";

@Entity({name: 'movie'})
export class MovieEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

    @Column({default: 0})
    ratings: number

	@Column({nullable: true})
	description: string;

    @Column({nullable: true})
    poster: string

    @Column({nullable:true})
    video: string

    @Column({default: 0, nullable: true})
    coundOpened: number

    @Column({nullable: true})
    yers: number

    @Column({nullable: true})
    duration: number

    @Column({nullable: true})
    country: string
    
	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@ManyToMany(() => GenreEntity, genreEntity => genreEntity.movies)
    @JoinTable()
    genre: GenreEntity[]

    @ManyToMany(() => ActorEntity, actorEntity => actorEntity.movie)
    @JoinTable()
    actor: ActorEntity[]

    @ManyToMany(() => UserEntity, userEntity => userEntity.favorites)
    user: UserEntity[]

    @OneToOne(() => RatingEntity)
    rating: RatingEntity

	@OneToMany(() => CommentEntity, commentEntity => commentEntity.movie)
    comment: CommentEntity[]
}