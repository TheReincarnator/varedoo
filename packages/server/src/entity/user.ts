import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column('json')
	contactInfo: { [key: string]: string };

	@Column()
	userName: string;

	@Column()
	passwordHash: string;
}
