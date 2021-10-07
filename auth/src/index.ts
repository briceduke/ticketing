import 'express-async-errors';

import cookieSession from 'cookie-session';
import express from 'express';
import mongoose from 'mongoose';

import { NotFoundError } from './errors';
import { errorHandler } from './middlewares/error-handler.middleware';
import { currentUserRouter } from './routes/currentuser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

const app = express();

const port = 3000;

app.set('trust proxy', true);
app.use(express.json());
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
);

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(signInRouter);

app.get('*', async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
	} catch (err) {
		console.error(err);
	}
};

app.listen(port, () => {
	console.log(`Running on http://localhost:${port}`);
});

start();
