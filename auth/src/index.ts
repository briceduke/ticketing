import 'express-async-errors';

import express from 'express';

import { NotFoundError } from './errors';
import { errorHandler } from './middlewares/error-handler.middleware';
import { currentUserRouter } from './routes/currentuser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

const app = express();

const port = 3000;

app.use(express.json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(signInRouter);

app.get('*', async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Running on http://localhost:${port}`);
});
