import * as express from 'express';
import { getUsers } from './service/userService';

const app = express();
const port = 3000;

app.get('/users', async (request, response) => {
	response.json(await getUsers());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
