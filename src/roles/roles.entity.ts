import { UserEntity } from "src/users/user.entity";
import {Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";

@Entity({name: 'roles'})
export class RolesEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({name: 'value', unique: true})
	value: string;

	@ManyToMany(() => UserEntity, userEntity => userEntity.role)
    users: UserEntity[]
}
