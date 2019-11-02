import { getRepository, createConnections } from 'typeorm';
import { User } from '../entity/user';

const connectionsPromise = createConnections();

export async function getUsersFromDb() {
	await connectionsPromise;
	const userRepository = getRepository(User);

	return await userRepository.find();
}
