import { getRepository, createConnections } from 'typeorm';
import { User } from '../entity/user';

export async function getUsers() {
	await createConnections();
	const userRepository = getRepository(User);

	return await userRepository.find();
}
