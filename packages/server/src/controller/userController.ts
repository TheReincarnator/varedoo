import { getUsersFromDb } from '../service/userService';

export async function getUsers(): Promise<Definitions.User[]> {
	const users = await getUsersFromDb();
	return users.map(u => ({
		id: u.id,
		firstName: u.firstName,
		lastName: u.lastName,
		userName: u.userName,
	}));
}
