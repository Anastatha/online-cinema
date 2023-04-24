import { UserEntity } from "src/users/user.entity";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany,} from "typeorm";

@Entity({name: 'roles'})
export class RolesEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({name: 'value', unique: true})
	value: string;

	@Column({name: 'description'})
	description: string;

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@ManyToMany(() => UserEntity, userEntity => userEntity.role)
	@JoinTable()
    users: UserEntity[]
}
