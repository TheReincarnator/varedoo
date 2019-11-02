import * as express from 'express';
import { initialize } from 'express-openapi';
import * as swaggerUi from 'swagger-ui-express';
import * as apiDoc from 'varedoo-api/lib/api.json';
import { getUsers } from './controller/userController';

const app = express();
const port = 3000;

initialize({
	app,
	apiDoc: '../api/src/api.json',
	dependencies: {
		log: console.log,
	},
	operations: {
		getUsers: async (request, response) => {
			response.json(await getUsers());
		},
	},
});

app.use('/', swaggerUi.serve, swaggerUi.setup(apiDoc));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
